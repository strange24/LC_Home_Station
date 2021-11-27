import React,{useState,useEffect} from 'react';
import {Row,Col} from 'antd';
import {reqGetNotice} from '../../../api';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import { NOTICE_PAGE_SIZE } from "../../../utils/constants";
import {IMG_URL} from '../../../utils/constants';
import './index.less';

const SecondPage=(props)=>{
    const [notice, setnotice] = useState([]);
    const [cur, setcur] = useState({});

    //获取所有notice
    const getNotice=async (pageNum)=>{
        const res=await reqGetNotice({pageSize:NOTICE_PAGE_SIZE,pageNum});
        if(res.code){
            if(res.data){
                const arr=res.data.object.splice(0,NOTICE_PAGE_SIZE);
                setnotice(arr);
                setcur(arr[0]);
            }
        }
    }

    useEffect(()=>{
        getNotice(1);
    },[]);

    const {noticeTitle,noticeTime,noticeContent,noticeImg}=cur;

    return (
        <div className='second_page_wrapper' id='secondPage' name='secondPage'>
            <Row className='second_con'>
                <Col span={8} className='left'>
                    <div>
                    <div className='history_top'>
                        <p>历史动态</p>
                        <p>关注乐程官网，获取团队最新动态~</p>
                    </div>
                    <ul className='history_list'>
                        {
                            notice.length?(
                                notice.map(item=>{
                                    const time=moment(item.noticeTime).format('YYYY-MM-DD');
                                    return (
                                        <li 
                                        key={item.noticeid}
                                        style={{color:item.noticeid===cur.noticeid?'rgb(240, 169, 15)':''}}
                                        onClick={()=>{setcur(item)}}
                                        >
                                            {item.noticeTitle}
                                            <span>{time}</span>
                                        </li>
                                    )
                                })
                            ):''
                        }
                    </ul>
                    <p 
                        onClick={()=>{props.history.push('/history_news')}}
                        style={{textAlign:'right',cursor:'pointer',fontSize:'15px'}}
                    >更多&gt;&gt;</p>
                    </div>
                </Col>
                <Col span={16} className='right'>
                    {
                        noticeTitle&&(
                            <div className='notice_right'>
                                <img src={IMG_URL+noticeImg} alt='poster'></img>
                                <div className='notice'>
                                    <p className='notice_title'>{noticeTitle}</p>
                                    <p className='notice_time'>{moment(noticeTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                                    <p className='notice_con'>{noticeContent}</p>
                                </div>
                            </div>
                        )
                    }
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(SecondPage);