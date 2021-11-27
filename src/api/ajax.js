import axios from "axios";
import { message } from "antd";
import Qs from "qs";
import storageUtils from '../utils/storageUtils';

export default function ajax(url, data={}, type='GET') {
  const token=storageUtils.getUser().token;
  return new Promise((resolve, reject) => {
    let promise
    switch(type){
      case 'GET':
        promise = axios.get(url, {
          params: data,
          headers:{"Authorization":token}
        });
        break;
      case 'POST':
        promise = axios.post(url,Qs.stringify(data),{
          headers:{"Authorization":token}
        });
        break;
      case 'PUT':
        promise = axios.put(url,Qs.stringify(data),{headers:{"Authorization":token}});
        break;
      default:
        promise = axios.delete(url, {params:data,headers:{"Authorization":token}});
        break;
    }

    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      message.error('请求出错了: ' + error.message)
    })
  })
}
