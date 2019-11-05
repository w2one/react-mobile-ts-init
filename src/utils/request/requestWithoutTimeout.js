/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/**
 * request
 */

import { BASE_API } from "../config";
import Toast from "Components/Toast";

export default async ({
  url,
  method = "get",
  data = {},
  headers = { "Content-Type": "application/json" },
  loading = false,
  timeout = 0
}) => {
  let requestConfig = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  // url
  url = BASE_API + url;

  // method & data
  if (method.toLowerCase() === "post") {
    Object.defineProperty(requestConfig, "body", {
      value: JSON.stringify(data)
    });
  } else if (method.toLowerCase() === "get") {
    const str = Object.entries(data)
      .reduce((acc, cur) => acc.concat(cur.join("=")), [])
      .join("&");
    url += "?" + str;
  }

  // header
  if (Object.keys(headers).length !== 0) {
    Object.assign(requestConfig.headers, headers);
  }
  // console.log(requestConfig);
  try {
    console.log("request start...");
    loading && Toast.loading("loading");
    let response = await fetch(url, requestConfig);
    loading && Toast.hide();
    console.log("request end...");

    if (response.status === 200) {
      let responseData;
      switch (requestConfig.headers.Accept) {
        case "application/json":
          responseData = await response.json();
          // 业务逻辑code 200为成功
          if (responseData.code !== 200) {
            Toast.fail(responseData.errmsg);
          }
          break;
        case "text/html":
          responseData = response.text();
          break;
        // 文件下载
        case "application/octet-stream":
          const blob = await response.blob();
          const a = document.createElement("a");
          const fileurl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
          const filename = response.headers.get("Content-Disposition");
          a.href = fileurl;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(fileurl);
          break;
      }
      return responseData;
    } else {
      Toast.fail(response.statusText);
    }
  } catch (error) {
    Toast.fail(error);
  }
};
