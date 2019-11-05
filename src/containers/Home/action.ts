/**
 *
 */
import Request from "@utils/request";
import API from "@utils/api";

export const GET_LIST = "GET_LIST";
export const PAGE_LIST = "PAGE_LIST";
export const SEARCH = "SERACH";

export const getListAction = ({ page, pageSize, keyword = "" }) => async dispatch => {
  let data = await Request({
    url: API.musicList,
    method: "get",
    data: {
      page,
      pageSize
    }
  });

  dispatch({
    type: GET_LIST,
    data: {
      list: data.content,
      total: data.totalElements,
      page,
      pageSize,
      keyword
    }
  });
};

export const pageAction = ({ page, pageSize, keyword = "" }) => dispatch => {
  const data2 = keyword != "" ? data.filter(item => item.name === keyword) : data;
  dispatch({
    type: PAGE_LIST,
    data: {
      list: data2.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
      page,
      pageSize
    }
  });
};
