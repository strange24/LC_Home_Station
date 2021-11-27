import React,{useEffect} from 'react';
import './index.less';
import NavDrawer from '../../components/nav_drawer';
import CeleContent from "./components/celebrities";
import $ from 'jquery';
import BackTop from '../../components/back_top';
import { createFromIconfontCN } from '@ant-design/icons';
import debThrFunc from '../../utils/debounce_throttle';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_pqp1wjlpuuo.js',
});

export default function Celebrities(){
    const handleScroll=debThrFunc.throttle(()=>{
        //卷出去的页面高度
        const scroll_h=document.body.scrollTop;
        //屏幕高度
        if(scroll_h>100){
            $('.cele_con_header').show();
            $('.cele_con_footer').show();
            $('.cele_con_header').addClass('scale-in-hor-center');
            $('.cele_con_footer').addClass('slide-in-bottom');

            const liObjs=$('.cele_con_mid li');
            for(let i=0;i<liObjs.length;i++){
                if(i<=1){
                    //前两个左滑
                    $(liObjs[i]).addClass('slide-in-left');
                }else{
                    //后两个右滑
                    $(liObjs[i]).addClass('slide-in-right');
                }
            }
        }
    },100);

    useEffect(()=>{
        window.addEventListener('scroll',handleScroll);
    },[handleScroll]);

    return (
        <div className='cele_wrapper'>
            <NavDrawer/>
            <div className='cele_header' name='back_top' id='back_top'>
                <div className='cele_header_con'>
                    <p className='cele_title tracking-in-contract'>乐程名人榜</p>
                    <p className='cele_subtitle'>Celebrities Of LeCheng In Recent Years</p>
                    <a href='#cele_con'><IconFont type='icon-xiangxia' className='godown pulsate-fwd'/></a>
                </div>
            </div>
            {/* <FourthPage/> */}
            <div className='cele_con' id='cele_con' name='cele_con'>
                <div className='cele_con_header'>
                    <div className='title_detail'>
                        <div className='line_01'></div>
                        <div className='line_02'></div>
                        <p>你想认识乐程团队各路神仙吗？</p>
                        <p>Are you curious?</p>
                    </div>
                    <p>学习没有捷径可走，但在乐程，在学习上，你将获得学长学姐最热心的帮助</p>
                </div>
                <ul className='cele_con_mid'>
                    <li>
                        <span className='list_item_title'>技术强</span>
                        <p>团队各个方向人才辈出</p>
                    </li>
                    <li>
                        <span className='list_item_title'>多才艺</span>
                        <p>齐聚各球类运动人才、唱跳高手</p>
                    </li>
                    <li>
                        <span className='list_item_title'>高热情</span>
                        <p>有求必应，互帮互助是常态</p>
                    </li>
                    <li>
                        <span className='list_item_title'>无拘束</span>
                        <p>团队成员跨级同样亲密无间</p>
                    </li>
                </ul>
                <a href='#cele_photos'>
                    <p className='cele_con_footer'>
                        让我们看看历届神仙都有谁
                    </p>
                </a>
            </div>
            <CeleContent/>
            <BackTop _href='#back_top' _className='.back_top'/>
        </div>
    );
}