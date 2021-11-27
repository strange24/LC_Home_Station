import React,{useEffect} from "react";
import { createFromIconfontCN } from '@ant-design/icons';
import $ from 'jquery';
import debThrFunc from "../../utils/debounce_throttle";
import './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_pqp1wjlpuuo.js',
});

export default function BackTop(props){
    const {_href}=props;

    const handleScroll=debThrFunc.throttle(()=>{
        const screenHeight=$(window).height();
        if(document.body.scrollTop>screenHeight){
            $('.back_top').show();
            $('.back_top').addClass('fade-in');
        }else{
            $('.back_top').hide();'.back_top'.substr(1)
            $('.back_top').addClass('fade-out');
        }
    },1000);

    useEffect(()=>{
        if(document.body.scrollTop===0){
            $('.back_top').hide();
        }
        window.addEventListener('scroll',handleScroll);
        return ()=>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[handleScroll]);

    return (
        <a className='back_top' href={_href}>
            <IconFont type='icon-huidaodingbu' className='icon_back_top'/>
            <p>顶部</p>
        </a>
    );
}