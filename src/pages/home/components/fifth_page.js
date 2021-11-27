import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import '../index.less';
import {Modal} from 'antd';
import {IMG_BED_URL} from '../../../utils/constants';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_qlrnjmwxz8l.js',
});

export default function FifthPage(props){
    const {goTopApi}=props;
    
    const content=(
        <img src={IMG_BED_URL+'ico.jpg'} alt='ico' style={{width:'200px'}}></img>
    );

    //展示二维码
    const showIco=()=>{
        Modal.info({
        content,
        okText:'关闭'
        })
    }
    return (
        <div className='fifth_page_wrapper' id='fifthPage' name='fifthPage'>
            <div className='dots_bg'></div>
            <div className='fifth_con'>
                <div className='fifth_top'>
                    <p className='font_l'><span>L</span></p>
                    <p className='font_c'><span>程</span></p>
                </div>
                <div className='fifth_footer'>
                    <p>地点：明理楼C1010 乐程软件工作室</p>
                    <div className='footer_mid'>
                        <div className='footer_links'>
                            <dl>
                                <dt className='links'>友情链接</dt>
                            </dl>
                            <dl>
                                <dt>博客链接</dt>
                                <dd><a href='https://blog.csdn.net/Kobe_G?spm=1001.2014.3001.5509' target='_blank' rel="noreferrer">龚皓</a></dd>
                                <dd><a href='https://blog.csdn.net/qq_44685099?spm=1001.2014.3001.5509' target='_blank' rel="noreferrer">文磊</a></dd>
                                <dd><a href='http://123.57.249.198:8081/' target='_blank' rel="noreferrer">赵宇</a></dd>
                                <dd><a href='https://codespi.github.io/' target='_blank' rel="noreferrer">叶尤晟</a></dd>
                            </dl>
                            <dl>
                                <dt>更多服务</dt>
                                <dd><a href='/history#feedback'>提交反馈</a></dd>
                            </dl>
                        </div>
                        <p>Copyright © 2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有</p>
                    </div>
                </div>
            
            </div>
            <div className='side_bar'>
        <ul className='side_list'>
          <li>
            <p className='side_item'>
              <IconFont type='icon-qun' className='side_icon'/>招新群:1436154
            </p>
          </li>
          <li>
            <p className='side_item'>
              <IconFont type='icon-qq' className='side_icon'/>客服:2810990752
            </p>
          </li>
          <li>
            <p className='side_item' onClick={showIco}>
              <IconFont type='icon-ico' className='side_icon'/><span>q群二维码</span>
            </p>
          </li>
          <li onClick={()=>{goTopApi.moveTo(1)}}>
            <a className='side_item' href='#firstPage'>
              <IconFont type='icon-huidaodingbu' className='side_icon'/>返回顶部
            </a>
          </li>
        </ul>
      </div>
    
        </div>
    );
}