import {
    API_URL_GET_ORDERS,
    API_URL_DELETE_ORDER,
    API_URL_UPDATE_ORDER,
    API_URL_GET_ORDER
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllOrders = () => {
    return axiosClient.get(API_URL_GET_ORDERS);
  };
  
  export const deleteOrder = (id) => {
    return axiosClient.delete(API_URL_DELETE_ORDER + "/" + id);
  };
  
  export const updateOrder = (id) => {
    return axiosClient.put(API_URL_UPDATE_ORDER + "/" + id);
  };
  
  export const getOrder = (id) => {
    return axiosClient.get(API_URL_GET_ORDER + "/" + id);
  }