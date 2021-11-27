import React, {  useEffect, useState,useCallback } from 'react';
import NavDrawer from '../../components/nav_drawer';
import { reqGetUserSpace,reqGetGoalByUserid,reqUpdateGoalState,reqSubmitCtf} from '../../api';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import { message,List, Divider,Modal,Row,Col} from 'antd';
import  './index.less';
import storageUtils from '../../utils/storageUtils';
import { PlusCircleOutlined,EditFilled,TrophyOutlined,ClockCircleOutlined,EditOutlined} from '@ant-design/icons';
import { Layout } from 'antd';
import PersonalSummary from '../../components/personal-summary';import moment from 'moment';
import { GOAL_SIZE_SPACE, IMG_URL } from '../../utils/constants';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2793892_53brzjlu4tm.js',
});

const { Footer } = Layout;

function  Space(props){
    const userid=props.location.state.userid;
    const [users,setUsers]=useState({});
    const [flag,setFlag]=useState([]);
    const [num,setNum]=useState(1);
    const [visible,setVisible]=useState(false);
    const [goalInfo,setgoalInfo]=useState({});
    const [pages,setPages]=useState(1);
    const _role=storageUtils.getUser().role;
    
    let history=useHistory();
    
    const getUser=useCallback(async()=>{
        const result=await reqGetUserSpace(userid);
        if(result.code===1){
            setUsers(result.data);
        }else{
            message.error(result.message);
        }
    },[userid]);


    const getFlags=useCallback(async(pageNum)=>{
        const result=await reqGetGoalByUserid(userid,pageNum,GOAL_SIZE_SPACE);
        if(result.code===1){
            setFlag(result.data.object);
            setNum(result.data.pages);
        }
    },[userid]);


    const hideModal=()=>{
        setVisible(false);
    }
    const showModal=(goal)=>{
        setVisible(true);
        setgoalInfo(goal);
    }
    const updateState=async()=>{
        const req={
            goalid:goalInfo.goalid,
            goalState:goalInfo.goalState?0:1
        }
        const result=await reqUpdateGoalState(req);
        if(result.code===1){
            message.success('修改成功');
            setVisible(false);
            getFlags(pages);
        }else{
            message.error(result.msg);
        }
    }
    useEffect(()=>{
        getUser();
    },[getUser])

    useEffect(()=>{
        getFlags(pages);
    },[pages,getFlags])

    //请求认证
    const handleCTF=async ()=>{
        //发请求认证，传缓存的userid
        const _userid=storageUtils.getUser().userid;
        const res=await reqSubmitCtf(_userid);
        if(res.code===1){
            message.success('【待审核】发送成功');
        }else{
            message.warning(res.data);
        }
    }

    //解构所查看对象信息
    const {avatar,email,grade,nickname,phone,role,selfIntroduction}=users;

    return(
        <Layout className='space-all'>
            <div className='space'>
            <NavDrawer />
            <Row className='space_header_wrapper'>
                <Col span={_role!==0?8:24}>
                    <div className='space-left'>
                        <div className='space-left-top'>
                            <div className='title'>个人资料</div>
                            <div className='space-avtar'>
                            {
                                avatar?(
                                    <img src={IMG_URL+avatar} alt='avatar'/>
                                ):(
                                    <IconFont 
                                    type='icon-morentouxiangicon' 
                                    className='space_avatar_icon'
                                    />
                                )
                            }
                            </div>
                        </div>
                        <div className='space-content'>
                            <div className='space-userInfo'>
                                <div className='space-userInfo-name'>
                                    {nickname}
                                    {
                                        role!==0?(
                                            <IconFont type='icon-yirenzheng' className='ctf_icon'/>
                                        ):(
                                            userid===storageUtils.getUser().userid?(
                                                <span className='to_ctf' onClick={handleCTF}>未认证</span>
                                            ):(
                                                <span className='to_ctf'>未认证</span>
                                            )
                                        )
                                    }
                                </div>
                                <div className='space-userInfo-more'>
                                    <div>年级:{grade?grade+'级':'暂无'}</div>
                                    <div>真实姓名:{nickname?nickname:'暂无'}</div>
                                    <div>电话号码:{phone?phone:'暂无'}</div>
                                    <div>邮箱:{email?email:'暂无'}</div>
                                    <div>自我介绍:{selfIntroduction?selfIntroduction:'暂无'}</div>
                                </div>
                            </div>
                            {
                                userid===storageUtils.getUser().userid?(
                                    <div>
                                        <div 
                                        className='space-detail' 
                                        >
                                            <span onClick={()=>history.push('/space/updateuserinfo',users)}>完善信息</span>
                                            &nbsp;&nbsp;<span onClick={()=>history.push('/space/updateuserinfo',{updatepsd:true})}>修改密码</span>
                                        </div>
                                        {
                                            _role!==0?(
                                                <Link to='/goals' className='space-add-flag'><EditFilled />Flag</Link>
                                            ):''
                                        }
                                    </div>
                                ):''
                            }
                        </div>
                    </div> 
                </Col>
                <Col span={_role!==0?16:0}>
                    <div className='space-right'>
                        <div className='space-right-title'>个人总结
                        {
                            userid===storageUtils.getUser().userid?(
                                <div 
                                style={{float:'right',marginRight:20,color:'#f75c0cad', cursor: "pointer"}} 
                                onClick={()=>history.push('/space/summaryadd')}
                                >
                                    <PlusCircleOutlined />发布总结
                                </div>
                            ):''
                        }
                        </div>
                        <PersonalSummary userid={userid}/>
                    </div>
                </Col>
            </Row>
            {
                _role!==0?(
                    <div className='space-flag-list' >
                        <Divider orientation="left" className='flag_list_title'>
                            <TrophyOutlined style={{marginRight:10}} />目标
                        </Divider>
                            <List
                            bordered
                            dataSource={flag}
                            pagination={{
                                onChange: page => {
                                    setPages(page);
                                },
                                pageSize: GOAL_SIZE_SPACE,
                                total:num*GOAL_SIZE_SPACE
                            }}
                            renderItem={item=>(
                                <List.Item style={{color:'#aaa',height:'60px'}}>
                                <span style={{marginRight:10,color:'#ddd'}}>
                                    <ClockCircleOutlined style={{marginRight:5}}/>
                                    {moment(item.goalTime).format('YYYY-MM-DD HH:mm:ss')}
                                </span>
                                {item.goalContent}
                                {
                                    userid===storageUtils.getUser().userid?(
                                        <span 
                                        style={{float:'right',color:item.goalState===1?'#9c27b0 ':'#f44336',cursor:'pointer'}} 
                                        onClick={()=>showModal(item)}>
                                            <EditOutlined/>
                                            {item.goalState===1?'完成':'未完成'}
                                        </span>
                                    ):''
                                }
                                </List.Item>
                            )}
                            />
                            <Modal
                            title="确认"
                            visible={visible}
                            onOk={updateState}
                            onCancel={hideModal}
                            okText="确认"
                            cancelText="取消"
                            >确认修改吗？</Modal>
                    </div>
                ):''
            }
        </div>
            <Footer style={{backgroundColor:'#000' ,color:'#7546C8' ,textAlign:'center'}}>Copyright  2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有</Footer>
        </Layout> 
    );
}
export default Space;