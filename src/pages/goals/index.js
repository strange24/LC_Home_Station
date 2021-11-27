import React,{useRef,useState} from 'react';
import './index.less';
import GoalList from "./components/goal_list";
import SummaryList from './components/summary_list';
import BackTop from '../../components/back_top';
import NavDrawer from '../../components/nav_drawer';
import {Modal,message} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import WriteArea from "./components/writearea";
import { reqAddGoal } from "../../api";
import storageUtils from "../../utils/storageUtils";


const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_pqp1wjlpuuo.js',
});


export default function Goals(){
    const textRef=useRef();//添加对话框
    const goalRef=useRef();//goallist组件，便于获取最新list
    const [isvisible, setisvisible] = useState(false);

    //添加goal
    const handleOk=async ()=>{
        const userid=storageUtils.getUser().userid;
        const context=await textRef.current.validateFields().catch(err=>{
            console.log(err);
        });
        //若内容不为空，发请求添加,关闭Modal，否则不关闭Modal
        if(context){
            setisvisible(false);
            // 发请求添加
            const res=await reqAddGoal({goalContent:context.goalContent,userid,goalState:0});
            if(res.code){
                message.success('添加成功');
                //重新获取goallist的值
                goalRef.current.initGoals(1);
            }else{
                message.error(res.msg);
            }
        }
        textRef.current.resetFields();
    }

    const handleCancel=()=>{
        setisvisible(false);
        //清空Form
        textRef.current.resetFields();
    }

    return (
        <div className='goal_wrapper' id='goal_header' name='goal_header'>
            <NavDrawer/>
            <div className='goal_header'>
                <div className='goal_header_con tilt-in-left-1'>
                    <h1>乐程<span style={{fontFamily:'Edwardian Script ITC',fontSize:'58px'}}>Flag</span>墙</h1>
                    <p>在这里，你可以畅所欲言，或短期目标，或远大梦想，或整理情绪，发布即不可更改，让大家共同见证你的决心吧.</p>
                    <div className='header_choice'>
                        <div onClick={()=>{setisvisible(true)}}>现在就写</div>
                        <a href='#goal_list'>历史记录</a>
                    </div>
                </div>
                <a href='#goal_list'><IconFont type='icon-xiangxia' className='godown pulsate-fwd'/></a>
            </div>
            <GoalList ref={goalRef}/>
            <SummaryList/>
            <BackTop _href='#goal_header'/>
            <Modal 
            className='goal_modal'
            okText='添加'
            cancelText='取消'
            onOk={handleOk}
            onCancel={handleCancel}
            icon={false}
            visible={isvisible}
            >
                <WriteArea ref={textRef}/>
            </Modal>
        </div>
    );
}