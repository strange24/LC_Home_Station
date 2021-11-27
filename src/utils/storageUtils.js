import store from 'store';
import { USER_KEY } from "./constants";

const storageUtils={
    //添加用户
    addUser:user=>store.set(USER_KEY,user),
    //获取用户
    getUser:()=>store.get(USER_KEY)||{},
    //删除用户
    removeUser:()=>store.remove(USER_KEY)
}

export default storageUtils;