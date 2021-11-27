import React,{useState,useEffect,useCallback} from 'react';
import {Drawer} from 'antd';
import './index.less';
import { createFromIconfontCN } from '@ant-design/icons';
import $ from "jquery";
import storageUtils from '../../utils/storageUtils';
import {Link} from 'react-router-dom';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_rdilki51ug.js',
});

export default function NavDrawer(){
    const [visible, setvisible] = useState(false);
    const _role=storageUtils.getUser().role;

    const handleScroll=useCallback(()=>{
        const scrollTop=document.body.scrollTop;
        const screenHeight=$(window).height();

        if(scrollTop>screenHeight){
            $('.nav_drawer').hide();
        }else{
            $('.nav_drawer').show();
        }
    },[]);

    /*监听页面滚动事件*/
    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);
        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[handleScroll]);

    /*关闭drawer*/
    const onClose=()=>{
        setvisible(false);
    }

    const getHeader=(type)=>{
        return (
            <div className='nav_drawer animate__animated' id='nav_drawer'>
                <Link className='title' to='/'>乐程LeCheng</Link>
                <IconFont 
                    className='icon_list' 
                    type={type}
                    onClick={()=>{setvisible(!visible)}}
                ></IconFont>
            </div>            
        );
    }

    return (
        <div className='nav_drawer_wrapper'>
            {getHeader('icon-tubiaozhizuomoban-09')}
            <Drawer
            title={getHeader('icon-chacha')}
            placement='top'
            closable={false}
            onClose={onClose}
            visible={visible}
            className='drawer'
            height= ''
            key='top'
            >
                <ul className='drawer_list_detail'>
                    <li className='list_item'><Link to='/#secondPage'>首页</Link><span>Home</span></li>
                    <li className='list_item'><Link to='/history'>团队简介</Link><span>Team Profile</span></li>
                    <li className='list_item'><a href='/#secondPage'>最新动态</a><span>Latest News</span></li>
                    <li className='list_item'><a href='/#fourthPage'>发展史</a><span>History</span></li>
                    <li className='list_item'><Link to='/celebrities'>名人榜</Link><span>Celebrities</span></li>
                    {
                        _role?(
                            <>
                            <li className='list_item'><Link to='/reward_punishment'>奖惩制度</Link><span>Reward&punishment</span></li>
                            <li className='list_item'><Link to='/album'>团队相册</Link><span>Album</span></li>
                            <li className='list_item'><Link to='/goals'>乐程墙</Link><span>Wishes</span></li>
                            <li className='list_item'><Link to='/financial'>财务管理</Link><span>Finance</span></li>
                            <li className='list_item'><Link to='/members'>成员列表</Link><span>TeamMembers</span></li>
                        </>
                        ):''
                    }
                    {_role===2&&<li className='list_item'><Link to='/manage'>后台管理</Link><span>Team Management</span></li>}
                </ul>
            </Drawer>
        </div>
    );
}