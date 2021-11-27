import React, { useEffect, useState, useCallback } from 'react';
import './index.less';
import { withRouter, Link } from 'react-router-dom';
import storageUtils from '../../../utils/storageUtils';
import { Modal, message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { reqQueryAvatar } from '../../../api';
import { IMG_URL } from '../../../utils/constants';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2793892_a1elyl8porp.js',
});

const Header = (props) => {
    const [user, setuser] = useState(storageUtils.getUser());
    const [avatar, setavatar] = useState('');
    const { userid } = storageUtils.getUser();
    const user_role = storageUtils.getUser().role;

    //获取头像、角色
    const getAvatarRole = useCallback(async () => {
        const res = await reqQueryAvatar(userid);
        if (res.code === 1) {
            if(res.data){
                const {role,avatar}=res.data;
                setavatar(avatar);
                //根据id获取role
                const user_role=role;
                //判断是否认证通过
                if(storageUtils.getUser().role!==user_role){
                    //通过，修改缓存
                    const local_user=storageUtils.getUser();
                    local_user.role=user_role;
                    storageUtils.addUser(local_user);
                    setuser(local_user);
                }
            }
        }
    }, [userid]);

    //控制首页nav的展开与隐藏
    useEffect(() => {
        const headercon = document.querySelector('.header_con');
        const header = document.querySelector('.header');

        headercon && headercon.addEventListener('mouseenter', () => {
            header.classList.remove('hide');
            header.classList.add('show');
        })

        headercon && headercon.addEventListener('mouseleave', () => {
            header.classList.remove('show');
            header.classList.add('hide');
        })
    }, []);

    // //页面滚动事件回调——加节流
    // const handleScroll=()=>{
    //     const scroll_h=document.body.scrollTop;
    //     const headerobj=$('#header_home');

    //     if(scroll_h>window.screen.height){
    //         headerobj.removeClass('header-nav-show');
    //         headerobj.addClass('header-nav-hide');
    //     }else{
    //         headerobj.removeClass('header-nav-hide');
    //         headerobj.addClass('header-nav-show');
    //     }
    // }


    // //监听页面滑动事件
    // useEffect(()=>{
    //     window.addEventListener('scroll',handleScroll);
    //     return ()=>{
    //         window.removeEventListener('scroll',handleScroll);
    //     }
    // },[handleScroll]);

    useEffect(() => {
        userid && getAvatarRole();
    }, [userid, getAvatarRole]);

    const handleLogOut = () => {
        Modal.confirm({
            content: '确定要退出登录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                //请求退出登录
                message.success('已退出', 0.5);
                //删除缓存的用户信息
                storageUtils.removeUser();
                setuser({});
            }
        })
    }


    return (
        <div className='header header-nav-show' id='header_home'>
            <div className='header_con'>
                <div className='header_con_nav'>
                    <div className='left'>
                        <p>LeCheng乐程</p>
                    </div>
                    <div className='right'>
                        <dl>
                        {
                            user.username ? (
                                <div>
                                    <dt>
                                    {
                                        avatar ? (
                                            <img
                                                src={IMG_URL + avatar}
                                                alt='avatar'
                                                onClick={() => { props.history.push('/space', { userid: storageUtils.getUser().userid }) }}
                                            ></img>
                                        ) : (
                                                <IconFont
                                                    type='icon-morentouxiangicon'
                                                    className='avatar_icon'
                                                    onClick={() => { props.history.push('/space', { userid: storageUtils.getUser().userid }) }}
                                                />
                                            )
                                    }
                                    </dt>
                                    <dd onClick={handleLogOut}>退出登录</dd>
                                </div>
                            ) : (
                                <dt>
                                    <a href='/login' target='_blank'>登录/注册</a>
                                </dt>
                            )
                        }
                        </dl>
                        {
                            user_role === 2 && (
                                <dl>
                                    <dt><Link to='/manage' >后台管理</Link></dt>
                                    <dd><Link to='/manage' >反馈信息</Link></dd>
                                    <dd><Link to='/manage/users' >用户信息</Link></dd>
                                    <dd><Link to='/manage/rewardpunish' >奖惩管理</Link></dd>
                                    <dd><Link to='/manage/managecelebrity' >名人榜管理</Link></dd>
                                    <dd><Link to='/manage/notice' >公告管理</Link></dd>
                                    <dd><Link to='/manage/certification' >认证处理</Link></dd>
                                </dl>
                            )
                        }
                        {
                            user_role?(
                                (
                                    <dl>
                                        <dt><Link to='/financial' >财务管理</Link></dt>
                                        <dd><Link to='/financial/detail' >收入/支出</Link></dd>
                                        <dd><Link to='/financial/charts' >图形图表</Link></dd>
                                        {user_role === 2 && <dd><Link to='/financial/manage' >数据管理</Link></dd>}
                                    </dl>
                                )
                            ):''
                        }
                        {
                            user_role?(
                                <>
                                    <dl>
                                        <dt><Link to='/reward_punishment' >奖惩信息</Link></dt>
                                        <dd><Link to='/reward_punishment'>奖惩制度</Link></dd>
                                        <dd><Link to='/reward_punishment#rp_record'>奖惩记录</Link></dd>
                                    </dl>
                                    <dl>
                                        <dt><Link to='/goals' >乐程墙</Link></dt>
                                        <dd><a href='/goals#goal_list'>队员目标</a></dd>
                                        <dd><a href='/goals#summary_list'>队员总结</a></dd>
                                    </dl>
                                </>
                            ):''
                        }
                        <dl>
                            <dt><Link to='/history' >关于我们</Link></dt>
                            <dd><Link to='/history'>团队简介</Link></dd>
                            <dd><Link to='/celebrities' >乐程名人榜</Link></dd>
                            {
                                user_role?(
                                    <>
                                        <dd><Link to='/album' >团队相册</Link></dd>
                                        <dd><Link to='/members'>成员列表</Link></dd>
                                    </>
                                ):''
                            }
                        </dl>
                        <dl>
                            <dt>
                                <Link to='/'>首页</Link>
                            </dt>
                            <dd><a href='#secondPage'>最新动态</a></dd>
                            <dd><a href='#thirdPage'>发展方向</a></dd>
                            <dd><a href='#fourthPage'>团队简介</a></dd>
                            <dd><a href='#fifthPage'>友链</a></dd>
                        </dl>
                        <dl>
                            <dt onClick={()=>{props.history.push('/docs',{cur:1})}}>版本信息</dt>
                            <dd onClick={()=>{props.history.push('/docs',{cur:0})}}>Version2.0</dd>
                            <dd onClick={()=>{props.history.push('/docs',{cur:1})}}>Version1.0</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Header);
