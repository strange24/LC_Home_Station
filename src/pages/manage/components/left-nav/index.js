import React from 'react';
import { Menu } from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {DoubleLeftOutlined,LikeOutlined,MehOutlined} from '@ant-design/icons';
import './left-nav.less';
import {
  MessageOutlined,
  UserOutlined,
  BellOutlined,
  SafetyOutlined
} from '@ant-design/icons';
 const LeftNav=withRouter(({location})=>{
    let path=location.pathname.indexOf('/manage/notice')===0?"/manage/notice":location.pathname;
    return(
        <div  className='left-nav'>
                <Link to='/' className='left-nav-header'>
                    <h1><DoubleLeftOutlined />乐程主站</h1>
                </Link>
                <Menu
                defaultSelectedKeys={[path]}
                mode="inline"
                theme="dark"
                >
                <Menu.Item key="/manage" icon={<MessageOutlined />}>
                    <Link to='/manage'>
                    反馈信息
                    </Link>
                </Menu.Item>
                <Menu.Item key="/manage/users" icon={<UserOutlined />}>
                    <Link to='/manage/users'>
                    用户管理
                    </Link>
                </Menu.Item>
                <Menu.Item key="/manage/rewardpunish" icon={<MehOutlined />}>
                    <Link to='/manage/rewardpunish'>
                    奖惩管理
                    </Link>
                </Menu.Item>
                <Menu.Item key="/manage/managecelebrity" icon={<LikeOutlined />}>
                    <Link to='/manage/managecelebrity'>
                    名人榜管理
                    </Link>
                </Menu.Item>
                <Menu.Item key="/manage/notice" icon={<BellOutlined />}>
                    <Link to='/manage/notice'>
                    公告管理
                    </Link>
                </Menu.Item>
                <Menu.Item key="/manage/certification" icon={<SafetyOutlined />}>
                    <Link to='/manage/certification'>
                    认证处理
                    </Link>
                </Menu.Item>
               </Menu>
            </div>

    )
 }) 

export default LeftNav;