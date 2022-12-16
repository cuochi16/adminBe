import {
    API_URL_GET_SUPPORTS,
    API_URL_DELETE_SUPPORT,
    API_URL_UPDATE_SUPPORT,
    API_URL_GET_SUPPORT
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllSupports = () => {
    return axiosClient.get(API_URL_GET_SUPPORTS);
  };
  
  export const deleteSupport = (id) => {
    return axiosClient.delete(API_URL_DELETE_SUPPORT + "/" + id);
  };

  export const updateSupport = (id) => {
    return axiosClient.update(API_URL_UPDATE_SUPPORT + "/" + id);
  };
  
  export const getSupport = (id) => {
    return axiosClient.get(API_URL_GET_SUPPORT + "/" + id);
  }