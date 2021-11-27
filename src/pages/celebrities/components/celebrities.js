import React,{useState,useEffect} from 'react';
import {Row,Col} from 'antd';
import './index.less';
import { reqGetCelebrities } from "../../../api";
import {IMG_BED_URL, IMG_URL} from '../../../utils/constants';

export default function CeleContent(){
    const [cele_info, setcele_info] = useState([]);
    const [_active, set_active] = useState(2018);//当前选中年级

    //按年级获取名人信息
    const getCeleInfo=async (idx)=>{
        const res=await reqGetCelebrities({celebrityGrade:idx});
        if(res.code){
            setcele_info(res.data);
        }else{
            setcele_info([]);
        }
    }

    useEffect(()=>{
        getCeleInfo(_active);
    },[_active]);

    const handleClick=(idx)=>{
        getCeleInfo(idx);
        set_active(idx);
    }

    const getCeleArr=()=>{
        let arr=[];
        for(let i=2018;i>=2015;i--){
            if(i===_active){
                arr.push(
                    <li className='item_title active' key={i}>{i}级</li>
                )            
            }else{
                arr.push(
                    <li className='item_title' key={i} onClick={()=>{handleClick(i)}}>{i}级</li>
                )
            }
        }
        return arr;
    }
    
    const leftcol={
        xs:0,
        sm:0,
        md:8,
        lg:8
    }

    const rightcol={
        xs:24,
        sm:24,
        md:16,
        lg:16
    }

    return (
        <div className='celecontet_wrapper' id='cele_photos' name='cele_photos'>
            <Row className='celecontent_top'>
                <Col className='left' {...leftcol}>
                    <div className='left_top'>
                        <p>乐程名人榜<span>Celebrities</span></p>
                        <p>乐程十一年的辉煌历史，成就了数位就职于阿里、腾讯、百度...等大厂及保研的学子.</p>
                    </div>
                    <ul className='left_bottom'>
                        {getCeleArr()}
                        <li className='item_title'>....</li>
                    </ul>
                </Col>
                <Col className='right' {...rightcol}>
                    <div className='right_con'>
                        {
                            cele_info.length?cele_info.map(item=>{
                                return (
                                    <div className='cele_item' key={item.celebrityid}>
                                        <div>
                                            <div className='cele_img'>
                                                <img src={item.celebrityPhoto?IMG_URL+item.celebrityPhoto:IMG_BED_URL+'pihua.jpg'} alt='cele_photo'></img>
                                            </div>
                                            <div className='cele_item_info'>
                                                <div className='detail_info'>
                                                    <div className='inner_detail'>
                                                        <p>姓名:{item.celebrityName}</p>
                                                        <p>年级:{item.celebrityGrade}</p>
                                                        <p>简介:{item.celebrityIntroduction}</p>
                                                        <p>寄语:{item.celebrityTalk}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                )
                            }):'暂无数据~'
                        }
                    </div>
                </Col>
            </Row>
            <div className='celecontent_mid'>
                <div className='mid_con'>
                    <div className='mid_con_left'>
                        <p>16</p>
                        <p>2021-09</p>
                        <img src={IMG_URL+'/img/_1631774398001'} alt='img'></img>
                    </div>
                    <div className='mid_con_right' style={{width:"calc(100% - 355px)"}}>
                        <p className='right_title'>展望未来</p>
                        <em className='right_location'>
                        ———————— 乐程软件工作室
                        </em>
                        <p className='right_con'>历届的学长学姐，都是学弟学妹们最好的榜样。距22年春招仅剩不到半年的时间，
                        愿19级所有找工作的同学都进大厂，保研、考研的同学均能成功上岸；愿20、21级的同学锐意进取、不卑不亢。
                        既然来到乐程，就要让自己的生活有所不同，在仍可选择的时候，选择自己的未来，而不是被选择。
                        愿所有满怀憧憬来到乐程的同学，离开的时候都是不留遗憾的，既有前程可奔赴，亦有岁月可回首~
                        </p>
                    </div>
                </div>
            </div>
            <div className='celecontent_footer'>
                <div className='join_us'>
                    <p>JOIN US</p>
                    <div className='join_right'>
                        <p>LECHENG</p>
                        <p>软件工作室</p>
                    </div>
                </div>
            </div>
            <p className='copy_right'>
                Copyright © 2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有
            </p>
        </div>
    );
}