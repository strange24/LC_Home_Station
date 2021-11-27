import React,{useEffect,useState,useRef,useCallback} from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';
import {Image} from 'antd';
import { reqgetThumbState,reqThumb,reqQueryThumb} from "../../api";
import {IMG_URL,IMG_BED_URL} from "../../utils/constants";
import storageUtils from '../../utils/storageUtils';
import CommentPart from './comment';
import debThrFunc from '../../utils/debounce_throttle';
import './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2793892_nuxx3uo7s4q.js',
});

export default function SummaryDetail(props){
    const {
        summaryTitle,
        summaryTime,
        summaryDetail,
        summaryid,
        summaryPicture,
        summaryView,
        summaryThumb,
        summaryComment,
        userid,
        avatar,
        nickname
    }=props.location.state.info;

    const curuser=storageUtils.getUser().userid;//获取当前登录用户的id
    const [isthumb, setisthumb] = useState(false);
    const [curthumb, setcurthumb] = useState(summaryThumb);
    const [thumbs, setthumbs] = useState({summaryThumb,summaryComment,summaryView});
    const commentRef=useRef();//评论组件

    //处理图片数组
    const imgs=summaryPicture?summaryPicture.split('|'):[];

    //获取点赞量
    const getThumbs=async (summaryid)=>{
        reqQueryThumb(summaryid).then(res=>{
            if(res.code===1){
                setthumbs(res.data);
                setcurthumb(res.data.summaryThumb);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        getThumbs(summaryid);
    },[summaryid]);

    //判断是否点赞
    const getThumbState=async (params)=>{
        const res=await reqgetThumbState(params);
        if(res.code){
            //已点赞
            setisthumb(true);
        }else{
            setisthumb(false);
        }
    }

    //初始化点赞状态
    useEffect(()=>{
        getThumbState({summaryid,userid:curuser});
    },[summaryid,curuser]);

    const fn=useCallback((thumb,cur)=>{
        if(!thumb){
            setcurthumb(cur+1);
        }else{
            setcurthumb(cur-1);
        }
        setisthumb(!thumb);
        //发送请求点赞/取消点赞
        reqThumb({summaryid,userid:curuser}).then(()=>{
            getThumbs();
        }).catch(err=>{
            console.log(err);
        })
    },[curuser,summaryid]);

    const debounce=debThrFunc.debounce(fn,1000);

    const handleThumb=useCallback(debounce,[debounce]);
    
    return (
        <div className='summary_detail'>
            <p onClick={()=>{props.history.goBack()}}>
                <IconFont type='icon-fanhui'/>返回
            </p>
            <div>
                <div className='summary_con'>
                    <div className='con_header'>
                        <img 
                        src={avatar?IMG_URL+avatar:IMG_BED_URL+'pihua.jpg'} 
                        alt='avatar'
                        onClick={()=>{props.history.push('/space',{userid:userid})}}
                        ></img>
                        <div className='right'>
                            <p>{nickname}</p>
                            <p>{moment(summaryTime).format('YYYY年MM月DD日 HH:mm:ss')}</p>
                        </div>
                    </div>
                    <div className='con_detail'>
                        <h1>{summaryTitle}</h1>
                        <p>{summaryDetail}</p>
                        {
                            imgs.length?(
                                <Image.PreviewGroup>
                                {
                                    imgs.map((item,index)=>{
                                     return <Image width={150} height={150} src={IMG_URL+item} key={index}/>
                                    })
                                }
                              </Image.PreviewGroup>
                            ):''
                        }
                        <p className='con_actions'>
                            <IconFont type='icon-liulan'/><span>{thumbs.summaryView}</span>
                            <IconFont 
                            type='icon-zan1' 
                            className='action_icon'
                            style={{color:isthumb?'orange':''}}
                            onClick={()=>{handleThumb(isthumb,curthumb)}}
                            /><span>{curthumb}</span>
                            <IconFont 
                            type='icon-pinglun' 
                            className='action_icon'
                            onClick={debThrFunc.debounce(()=>{commentRef.current.addPureComment()},1000)}
                            /><span>{thumbs.summaryComment}</span>
                        </p>
                    </div>
                    <div className='comment_part'>
                        <CommentPart 
                        summaryid={summaryid} 
                        summaryuserid={userid} 
                        ref={commentRef}
                        getThumbs={getThumbs}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}