import React from 'react';
import {Row,Col} from 'antd';
import {IMG_BED_URL} from '../../../utils/constants';

export default function FourthPage(){
    return (
        <div className='fourth_page_wrapper' id='fourthPage' name='fourthPage'>
            <div>
                <Row className='fourth_con'>
                    <Col span={10} className='fourth_left'>
                        <img src={IMG_BED_URL+'award_01.jpg'} alt='pic'></img>
                        <img src={IMG_BED_URL+'award_02.jpg'} alt='pic' className='pic_mid'></img>
                        <img src={IMG_BED_URL+'award_03.jpg'}  alt='pic'></img>
                    </Col>
                    <Col span={14} className='fourth_right'>
                        <div>
                            <p>关于我们</p>
                            <h2 className='right_title'>We help you embrace the future</h2>
                            <p>乐程软件工作室成立于2010年6月9日，自创立以来，团队项目多次获学院立项，更获省国赛奖项数十余项。
                                曾获中国大学生服务外包创新创业大赛国奖，团体程序设计天梯赛国奖，全国软件专业人才设计与开发大赛国奖，
                                蓝桥杯大赛国奖等，及数十余项省奖。目前团队成员大多都就职于阿里、腾讯、百度、Shopee、京东、字节跳动等大企，
                                也有许多保研至电子科大、川大等名校...
                            </p>
                            <a className='learn_more' href='/history'>了解更多</a>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}