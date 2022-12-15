import {
    API_URL_GET_POSTS,
    API_URL_DELETE_POST,
    API_URL_UPDATE_POST,
    API_URL_GET_POST
  } from "../constants/configUrl";
  import axiosClient from "./http-common";
  
  export const getAllPosts = () => {
    return axiosClient.get(API_URL_GET_POSTS);
  };
  
  export const deletePost = (id) => {
    return axiosClient.delete(API_URL_DELETE_POST + "/" + id);
  };
  
  export const updatePost = (id) => {
    return axiosClient.put(API_URL_UPDATE_POST + "/" + id);
  };
  
  export const getPost = (id) => {
    return axiosClient.get(API_URL_GET_POST + "/" + id);
  }