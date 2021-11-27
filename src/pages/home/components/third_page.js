import React from 'react';
import {Row,Col} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2739025_sd1d1cen5d8.js',
});

export default function ThirdPage(){
    return (
        <div className='third_page_wrapper' id='thirdPage' name='thirdPage'>
            <Row className='third_con'>
                <Col span={6} className='third_con_item animate__animated  animate__backInLeft'>
                    <div className='outer_con'>
                        <IconFont type='icon-qianduankaifa' className='_icon'/>
                        <p>前端开发</p>
                        <p>通过HTML，CSS及JavaScript以及衍生出来的各种技术、框架、解决方案，来实现互联网产品的用户界面交互</p>
                    </div>
                </Col>
                <Col span={6} className='third_con_item animate__animated  animate__backInLeft'>
                    <div className='outer_con'>
                        <IconFont type='icon-houduankaifa' className='_icon'/>
                        <p>后端开发</p>
                        <p>后端开发者关心的是如何通过代码、API 和数据库集成来提升网站的速度、性能和响应性。</p>
                    </div>
                </Col>
                <Col span={6} className='third_con_item animate__animated animate__backInRight'>
                    <div className='outer_con'>
                        <IconFont type='icon-suanfa' className='_icon'/>
                        <p>算法</p>
                        <p>算法（Algorithm）是指解题方案的准确而完整的描述，算法代表着用系统的方法描述解决问题的策略机制。</p>
                    </div>
                </Col>
                <Col span={6} className='third_con_item animate__animated animate__backInRight'>
                    <div className='outer_con'>
                        <IconFont type='icon-yanjiusheng' className='_icon'/>
                        <p>保研/考研</p>
                        <p>保研（全称：推荐优秀应届本科毕业生免试攻读硕士学位研究生），就是被保送者不经过笔试等初试一些程序</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}