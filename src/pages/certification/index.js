import React,{useState,useEffect} from 'react';
import {Card,message,Table} from 'antd';
import LinkButton from "../../components/link-button";
import { CTF_PAGE_SIZE } from '../../utils/constants';
import {reqGetCtf,reqAgreeCtf,reqRefuseCtf} from '../../api';
import './index.less';

export default function Certification(){
    const [total_ctf, settotal_ctf] = useState([]);

    //初始化columns
    const columns = [
        {
          title: '用户名',
          dataIndex: 'username',
          align:'center'
        },
        {
          title: '真实姓名',
          dataIndex: 'nickname',
          align:'center',
          render:nickname=>nickname?nickname:'/'
        },
        {
          title: '年级',
          dataIndex: 'grade',
          align:'center',
          render:grade=>grade?grade:'/'
        },
        {
            title: '电话号码',
            dataIndex: 'phone',
            align:'center',
            render:phone=>phone?phone:'/'
        },
        {
            title: '操作',
            align:'center',
            dataIndex:'userid',
            render:(userid)=>(
                <div>
                    <LinkButton onClick={()=>{handleAccess(userid)}}>同意</LinkButton>
                    <LinkButton onClick={()=>{handleRefuse(userid)}}>拒绝</LinkButton>
                </div>
            )
        },
    ];

    //获取所有认证申请
    const getTotalCtf=async ()=>{
        const res=await reqGetCtf();
        if(res.code===1){
            settotal_ctf(res.data);
        }else{
            settotal_ctf([]);
        }
    }

    useEffect(()=>{
        getTotalCtf();
    },[]);


    //认证通过
    const handleAccess=async (userid)=>{
        //发请求通过认证
        const res=await reqAgreeCtf(userid);
        if(res.code===1){
            message.success('已通过');
            getTotalCtf();
        }
    }

    //拒绝认证
    const handleRefuse=async (userid)=>{
        //发请求拒绝认证
        const res=await reqRefuseCtf(userid);
        if(res.code===1){
            message.success('已拒绝');
            getTotalCtf();
        }
    }
      
    return (
        <div className='ctf_wrapper'>
            <Card title='认证处理'>
                <Table 
                dataSource={total_ctf} 
                columns={columns} 
                rowKey='username'
                pagination={{
                    pageSize:CTF_PAGE_SIZE,
                    total:total_ctf.length
                }}
                />
            </Card>
        </div>
    );
}