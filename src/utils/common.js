/**
 * common utils
 * 1. platform
 * 2. get value from url
 * 3. base64 to file
 */

/**
 * get platform
 */
export const getPlatform = () => {
  console.log("platform");
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf("micromessager") >= 0) {
    return "wechat";
  } else if (ua.indexOf("app") >= 0) {
    return "app";
  } else {
    return "h5";
  }
};

/**
 * get value from url
 */
export const getQueryValue = () => {
  console.log("value");
};

/**
 * base64 to file
 */
export const base64ToFile = () => {
  console.log("value");
};
