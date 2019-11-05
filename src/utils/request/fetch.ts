/* eslint-disable no-case-declarations */
/**
 * request
 */

import { BASE_API } from "../config";
import Toast from "@components/Toast";
import { Session as Storage } from "@utils/storage";

/**
 * request
 * @param {*} 请求配置
 */
export default async function({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" },
  loading = false,
  timeout = 2000
}) {
  // fetch promise
  const fetchPromise = new Promise(resolve => {
    let requestConfig = {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    // url
    url = BASE_API + url;

    //token
    if (Storage.get("token")) {
      requestConfig.headers.token = Storage.get("token");
    }

    // header
    if (Object.keys(headers).length !== 0) {
      Object.assign(requestConfig.headers, headers);
    }

    // method & data
    if (method.toLowerCase() === "post") {
      // form or json
      const contentType = requestConfig.headers["Content-Type"];
      if (contentType === "application/json") {
        Object.defineProperty(requestConfig, "body", {
          value: JSON.stringify(data)
        });
      } else if (contentType === "x-www-form-urlencoded") {
        // 表单文件上传
        const form = new FormData();
        Object.keys(data).forEach(key => {
          form.append(key, data[key]);
        });
      }
    } else if (method.toLowerCase() === "get") {
      const str = Object.entries(data)
        .reduce((acc, cur) => acc.concat(cur.join("=")), [])
        .join("&");
      url += "?" + str;
    }

    fetch(url, requestConfig)
      .then(response => {
        // 数据检验
        return response;
      })
      .then(response => {
        // 解析数据
        let responseData;
        switch (requestConfig.headers.Accept) {
          // json
          case "application/json":
            responseData = response.json();
            break;
          // 文本
          case "text/html":
            responseData = response.text();
            break;
          // 文件下载
          case "application/octet-stream":
            const blob = response.blob();
            responseData = {
              blob,
              filename: response.headers.get("Content-Disposition"),
              type: "file"
            };

            break;
        }
        return responseData;
      })
      .then(data => {
        resolve(data);
      });
  });

  // timeout promise
  const timeoutPromise = new Promise(function(resolve, reject) {
    const time = setTimeout(() => {
      clearTimeout(time);
      reject(new Error("请求超时"));
    }, timeout);
  });

  // 小菊花
  loading && Toast.loading("loading");

  try {
    const result = await Promise.race([fetchPromise, timeoutPromise]);
    Toast.hide();

    if (result.type === "file") {
      let { blob, filename } = result;
      blob.then(data => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
        });
        const ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
          ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
          ieEDGE = navigator.userAgent.match(/Edge/g),
          ieVer = ie ? ie[1] : ie11 ? 11 : ieEDGE ? 12 : -1;
        console.log("ie:" + ie);

        console.log("ieVer:" + ieVer);

        if (ie && ieVer < 10) {
          this.message.error("No blobs on IE<10");
          return;
        }
        if (ieVer > -1) {
          window.navigator.msSaveBlob(blob, filename.split("=")[1]);
        } else {
          const url = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.setAttribute("href", url);
          link.setAttribute("download", filename.split("=")[1]);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    } else {
      if (result.code !== 200) {
        // 业务逻辑code 200为成功
        Toast.fail(result.msg || result.errmsg);
        // 错误信息收集 发送到服务器
      } else {
        result.status = true;
      }
      return result;
    }
  } catch (error) {
    console.log("catch", error);
    Toast.fail(error.message);
    // 错误信息收集 发送到服务器
  }
}
