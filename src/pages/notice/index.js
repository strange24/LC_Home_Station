import React, { useEffect, useState } from 'react';
import {Card, message,Button,Pagination,Modal} from 'antd';
import {ClockCircleOutlined ,DeleteOutlined,EditOutlined} from '@ant-design/icons';
import dateFormat from '../../utils/dateFormat';
import {reqGetNotices,reqDeleteNotice} from '../../api';
import { useHistory } from 'react-router-dom'

export default function Notice() {
    const [notices,setNotices]=useState([]);
    const [pages,setPages]=useState(1);
    const [Num,setNum]=useState(0);
    const pageSize=6;
    const getNotice=async (pageNum)=>{
        const result=await reqGetNotices(pageNum);
        if(result.code===1){
            if(result.data){
                setNotices(result.data.object);
                setNum(result.data.pages);
            }
        }else{
            message.error(result.message);
        }
    }
    const showModal=(notice)=>{
        Modal.confirm({
          content:'确认删除吗？',
          okText:'确定',
          cancelText:'取消',
          onOk:()=>{
            deleteNotice(notice);
          }
        })
      }
    const deleteNotice=async(notice)=>{
        const result=await reqDeleteNotice(notice.noticeid);
        if(result.code===1){
            message.success('删除成功');
            getNotice(pages);
        }else{
            message.error(result.msg);
        }
    }
    const onChange=(pageNumber)=> {
        setPages(pageNumber);
      };
    // useEffect(()=>{
    //     getNotice(1);
    // },[])
    useEffect(()=>{
        getNotice(pages);
    },[pages])

    let history = useHistory();
    const extra=(
        <Button type='primary' style={{borderRadius:"5%"}} onClick={()=>history.push('/manage/notice/add')}><EditOutlined /> 添加公告</Button>
    )
    return (
        <Card title="公告" style={{border:'1px solid #eee',height:"100%"}} headStyle={{fontSize:24}} extra={extra}>
            {
                notices.map(notice=>{
                    const title=(
                        <>
                        <span  style={{float:'left'}}>{notice.noticeTitle}</span>
                        <span  style={{float:'right'}}>
                            <ClockCircleOutlined />
                            {dateFormat(notice.noticeTime)} <DeleteOutlined style={{color:'red',fontSize:20}} onClick={()=>showModal(notice)} />
                        </span>
                        </>
                    )
                    return (
                        <Card type="inner" title={title} style={{marginBottom:20}} key={notice.noticeid} headStyle={{backgroundColor:"#eee",fontSize:16}}>
                            
                            <div dangerouslySetInnerHTML={{__html:notice.noticeContent}}></div>
                            
                        </Card>
                    )   
                })
            }
             <Pagination defaultCurrent={1} total={Num*pageSize} showQuickJumper style={{float:'right'}} onChange={onChange}/>
         </Card>
    );
}