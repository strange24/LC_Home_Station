import React,{useEffect,useState,useImperativeHandle} from 'react';
import { reqBillTotal } from "../../../api";
import {message} from 'antd';

const FooterCon=React.forwardRef((props,ref)=>{
    const [data, setdata] = useState({});

    const initBill=async ()=>{
        const res=await reqBillTotal();
        if(res.code===1){
            setdata(res.data);
            
        }else{
            message.error(res.msg);
        }
    }

    useEffect(()=>{
        initBill();
    },[]);

    //供父组件调用，添加账单完成后重新获取余额
    useImperativeHandle(ref,()=>({
        initBill
    }));

    const {income,expend}=data;

    return (
        <p className='card_item_title'>
            <span>总收入:{income}元</span>
            <span>总支出:{expend}元</span>
            <span>团费余额:{income-expend}元</span>
        </p>
    );
})

export default FooterCon;