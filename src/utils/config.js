/**
 * config
 */

const config = {};

let BASE_API = "";
if (BUILD_ENV === "sit") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "uat") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "pr") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else if (BUILD_ENV === "prod") {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
} else {
  BASE_API = "http://api.shanghaim.net/mock/28/api/";
}

export { BASE_API };

export default config;
