import React,{useEffect,useState,useCallback} from 'react';
import { Pagination } from "antd";
import moment from "moment";
import {reqGetNotice} from '../../api';
import './index.less';

export default function HistoryNews(props){
    const [arr, setarr] = useState([]);//每页所有数据
    const [total, settotal] = useState();//总条数
    const [curpage, setcurpage] = useState(1);//当前页
    const [pageSize, setpageSize] = useState(10);
    
    //分页获取notice
    const getNews=useCallback(async (pageSize,pageNum)=>{
        const res=await reqGetNotice({pageSize,pageNum});
        if(res.code===1){
            if(res.data){
                setarr(res.data.object);
                settotal(pageSize*res.data.pages);
            }else{
                settotal(0);
                setarr([]);
                setcurpage(1);
            }
        }
    },[]);


    useEffect(()=>{
        getNews(pageSize,1);
    },[getNews,pageSize]);

    //换页
    const handleChange=(value,size)=>{
        setcurpage(value);
        setpageSize(size);
        getNews(size,value);
    }

    return (
        <div className='history_news_wrapper'>
            <p onClick={()=>{props.history.goBack()}}>&lt;返回</p>
            <div className='history_news_con'>
            {
                arr.length?(
                    <ul>
                    {
                        arr.map(item=>(
                            <li key={item.noticeid}>
                                <h2>{item.noticeTitle}</h2>
                                <p className='news_time'>
                                    {moment(item.noticeTime).format('YYYY年MM月DD日 HH:mm:ss')}
                                </p>
                                <p>{item.noticeContent}</p>
                            </li>                           
                        ))
                    }
                    </ul>
                ):'空空如也~'
            }
            </div>
            <div className='pagination_box'>
                <Pagination
                current={curpage}
                total={total}
                showQuickJumper={true}
                pageSize={pageSize}
                showSizeChanger={true}
                onChange={handleChange}            
                />
            </div>
        </div>
    );
}