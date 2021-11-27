import React,{useRef} from 'react';
import {Row,Col,Input,Button,message,Form} from 'antd';
import './index.less';
import NavDrawer from '../../components/nav_drawer';
import BackTop from '../../components/back_top';
import { reqAddFeedback } from "../../api";
import { IMG_BED_URL } from "../../utils/constants";

const {TextArea}=Input;

const awardData=[
    '2019/2020蓝桥杯大赛 国奖10名 省奖10名',
    '2019中国大学生程序设计天梯赛国奖2名 省奖3名',
    '2017/2018蓝桥杯大赛 国奖7名 省奖15名',
    '全国软件专业人才设计与开发比赛 国奖2名 省奖5名',
    'SAP智能商务仪表盘设计大赛 国奖一、二等奖',
    '全国软件专业人才设计与开发比赛 一等奖、二等奖',
    '“中国航信杯”全国信息技术应用大赛一等奖、二等奖、三等奖',
    '四川省作品大赛获奖5名、学院盛特杯立项多次'
]

export default function HistoryOfLc(){
    const formRef=useRef();

    //提交反馈
    const handleFinish=async (values)=>{
        //发送请求提交反馈
        const res=await reqAddFeedback(values);
        if(res.code){
            message.success('提交成功！');
            formRef.current.resetFields();
        }else{
            message.warning(res.msg);
        }
    }

    const colleft={
        xs:24,
        sm:24,
        md:24,
        lg:10
    }

    const colright={
        xs:0,
        sm:0,
        md:0,
        lg:14
    }

    const funleft={
        xs:0,
        sm:0,
        md:0,
        lg:12
    }

    const funright={
        xs:24,
        sm:24,
        md:24,
        lg:12
    }

    return (
        <div className='history_wrapper' id='history_top' name='history_top'>
            <NavDrawer/>
            <div className='history_header'>
                <div className='header_con slide-in-right'>
                    <h2>团队简介<span>Team profile</span></h2>
                    <p>一个从事软件、网站、多媒体作品开发，并且参与各类软件项目比赛的学生科研团队</p>
                    <a href='#history_con'>了解更多</a>
                </div>
            </div>
            <div className='history_con' id='history_con' name='history_con'>
                <Row className='history_intro'>
                    <Col {...colleft} className='history_con_left'>
                        <p>2010~2021</p>
                        <p className='title'>团队创立</p>
                        <p className='desc'>
                            乐程软件工作室（LeCheng Software Studio）成立于2010年6月，隶属于西南石油大学计算机科学学院，
                            是一个从事软件、网站、多媒体作品开发，并且参与各类软件项目比赛的学生科研团队。工作室现有前端开发，
                            后端开发，算法，保研四个学习兴趣小组，我们将本着“学以致用，服务学校，走向社会”的宗旨，用优秀的软
                            件和体贴的服务为您的数字化生活提供便利。
                        </p>
                    </Col>
                    <Col {...colright} className='history_con_right'> 
                        <img src={IMG_BED_URL+'team.png'} alt='pic'></img>
                    </Col>
                </Row>
                <div className='direction_wrapper'>
                    <div className='title_detail'>
                        <div className='line_01'></div>
                        <div className='line_02'></div>
                        <p>团队发展方向</p>
                        <p className='desc_en'>Development direction</p>
                    </div>
                    <Row className='direction'>
                        <Col span={6} className='direction_item'>
                            <div className='detail_con'>
                                <p>前端</p>
                                <p>团队前端方向是由2016级学长郭昌雨开辟的，学长腾讯实习后选择保研至电子科大，但团队前端路线一直延续至今，每届均有各大厂offer.</p>
                            </div>
                        </Col>
                        <Col span={6} className='direction_item'>
                            <div className='detail_con'>
                                <p>后端</p>
                                <p>团队后端方向随着多年的探索，已经形成了非常成熟的学习路线。目前团队成员大多都就职于阿里、腾讯、百度、Shopee、京东、字节跳动等大企.</p>
                            </div>
                        </Col>
                        <Col span={6} className='direction_item'>
                            <div className='detail_con'>
                                <p>算法</p>
                                <p>团队对基础知识十分重视并且在算法方面深有研究，曾多次获得蓝桥杯、天梯赛等国家级奖项，省级奖项若干.</p>
                            </div>
                        </Col>
                        <Col span={6} className='direction_item'>
                            <div className='detail_con'>
                                <p>保研/考研</p>
                                <p>团队学习氛围浓厚，学长学姐绩点、综测名列前茅并且在队内参加多项比赛，保研至电子科大、川大等名校的学长学姐也不在少数.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='history_con_footer'>
                <div className='rewards_fun_wrapper'>
                    <Row className='rewards_fun'>
                        <Col {...funleft} className='rewards_left'>
                            <img src={IMG_BED_URL+'award_01.jpg'} alt='pic'></img>
                        </Col>
                        <Col {...funright} className='rewards_right common_style'>
                            <div className='common_con'>
                                <p className='common_title'>团队荣誉</p>
                                <p className='common_mid'>Team honor</p>
                                <ul className='common_footer'>
                                {
                                    awardData.map((item,index)=>{
                                        return <li key={index}>{item}</li>
                                    })
                                }
                                </ul>
                                <p className='more_info'>以上仅统计了近几年数据，具体人物信息请看<a href='/celebrities' target='blank'>乐程名人榜</a></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className='rewards_fun'>
                        <Col {...funright} className='fun_left common_style'>
                            <div className='fun_con common_con'>
                                <p className='common_title'>团队团建</p>
                                <p className='common_mid'>Team gathering</p>
                                <p className='fun_footer common_footer'>
                                    团队每年生日、招新之后都会安排团建，一起聚餐、玩桌游、唱歌...乃至彻夜长谈，
                                    学业繁忙之际，也有片刻闲暇、温暖的时光。所有团队成员都热爱这个大家庭，
                                    珍惜这些记忆碎片.
                                </p>
                            </div>                      
                        </Col>
                        <Col {...funleft} className='fun_right'>
                            <img src={IMG_BED_URL+'history01.jpg'} alt='history_pic'></img>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='history_footer' id='feedback' name='feedback'>
                <Row className='footer_con'>
                    <Col span={12}>
                        <div className='con_left'>
                            <p className='top'>CONTACT US</p>
                            <p className='mid'>提交反馈</p>
                            <p className='footer'>若您有任何问题、建议，请在右侧填写，
                                此处为匿名反馈，若有需要可查看首页的联系方式
                            </p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <Form 
                        className='con_right' 
                        onFinish={handleFinish}
                        ref={formRef}
                        >
                            <Form.Item
                                name='feedback'
                            >
                                <TextArea
                                value='sdfsdg'
                                placeholder="请输入..."
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' size='large' htmlType='submit'>提交</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <p>Copyright © 2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有</p>
            </div>
            <BackTop _href='#history_top'/>
        </div>
    );
}