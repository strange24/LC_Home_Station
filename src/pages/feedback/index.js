import React, { useEffect, useState } from 'react';
import {Card, message,Pagination } from 'antd';
import {reqGetFeedback} from '../../api';
import {ClockCircleOutlined } from '@ant-design/icons';
import dateFormat from '../../utils/dateFormat';
export default function Feedback() {
    const [feedbacks,setFeedbacks]=useState([]);
    const [pages,setPages]=useState(1);
    const [total,setTotal]=useState();
    const pageSize=6;
    const getFeedback=async (pageNum)=>{
        const result=await reqGetFeedback(pageNum);
        if(result.code===1){
            if(result.data){
                setFeedbacks(result.data.object);
                setTotal(result.data.pages*pageSize);
            }
        }else{
            message.error(result.msg);
        }
    }
    const onChange=(pageNumber)=> {
        setPages(pageNumber);
      };
    // useEffect(()=>{
    //     getFeedback(1);
    // },[]);
    useEffect(()=>{
        getFeedback(pages);
    },[pages]);
    return (
        <Card title="反馈信息" style={{border:'1px solid #eee',height:"100%"}}>
            {
                feedbacks.map(feedback=>{
                    const title=(
                        <span ><ClockCircleOutlined />{dateFormat(feedback.feedbackTime)}</span>
                    )
                    return (
                        <Card type="inner" title={title} style={{marginBottom:20}} key={feedback.feedbackid} >
                            {feedback.feedback}
                        </Card>
                    )   
                })
            }
            <Pagination defaultCurrent={1} total={total} showQuickJumper style={{float:'right'}} onChange={onChange}/>
         </Card>
    );
}