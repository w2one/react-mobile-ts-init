# download file

~~~
// const a = document.createElement("a");
// const fileurl = window.URL.createObjectURL(blob); // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
// const filename = response.headers.get("Content-Disposition");
// a.href = fileurl;
// a.download = filename;
// a.click();
// window.URL.revokeObjectURL(fileurl);
~~~


~~~
method:"post",
hdaders:{
    Accept:"application/octet/stream"
},
data:{}
~~~