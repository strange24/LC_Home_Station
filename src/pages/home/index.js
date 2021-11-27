import React from 'react';
import {Carousel} from 'antd';
import Header from './components/header';
import SecondPage from "./components/second_page";
import ThirdPage from "./components/third_page";
import FourthPage from './components/fourth_page';
import FifthPage from './components/fifth_page';
import {IMG_BED_URL} from '../../utils/constants';
import ReactFullpage from '@fullpage/react-fullpage';
import './index.less';

export default function Home(){
  const contentStyle={
    // easying:'ease-in',
    effect:'fade', 
    autoplay:true,
    autoplaySpeed:4000,
    dots:false
  }

  return (
    <div>
      <Header/>
      <ReactFullpage
      scrollingSpeed ={700}
      render={({state,fullpageApi})=>{
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
            <div className="first_page active" id='first_page' name='first_page'>
              <Carousel className='_carousel' {...contentStyle}>
                <div>
                  <div className='carousel_item' style={{backgroundImage:"url('"+IMG_BED_URL+"first_page01.jpg')"}}>
                    <div>
                      <p>专注开发，重视算法</p>
                      <p>团队主要以找工作为主，前、后端方向均有着成熟的学习路线，也重视数据结构与算法的学习</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='carousel_item' style={{backgroundImage:"url('"+IMG_BED_URL+"first_page02.jpg')"}}>
                    <div>
                      <p>高度自由，高度自律</p>
                      <p>团队实行周28h考勤制度，学习上无任何限制，可广泛涉猎，队员高度自律，从而形成了浓厚的学习氛围</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='carousel_item' style={{backgroundImage:"url('"+IMG_BED_URL+"first_page03.jpg')"}}>
                    <div>
                      <p>团结一心，砥砺前行</p>
                      <p>团队队员之间高度团结，互帮互助，缘聚于此，同是为了各自的目标不懈努力的人</p>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>           
            </div>
            <div className="section second_page">
              <SecondPage/>
            </div>
            <div className="section third_page">
              <ThirdPage/>
            </div>
            <div className="section fourth_page">
              <FourthPage/>
            </div>
            <div className="section fifth_page">
              <FifthPage goTopApi={fullpageApi}/>
            </div>
          </ReactFullpage.Wrapper>       
        
        )
      }}
      />

    </div>
  );
}