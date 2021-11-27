import React from "react";
import { List } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_1d5nv0zp2g1i.js',
});

const data = [
    '大一每周28h，大二38h，每周每少1h罚10元，连续两周不满自行退队，有事需提前三天向上级队长请假.',
    '在团队用电脑打游戏、看视频被学长学姐逮到或被举报一次罚款25元（可匿名举报）.',
    '打扫卫生不积极罚扫一周,当前周加时2h.',
    '水卡时间每超过1h加时2h',
    '学习进度最慢的同学团建的时候给大家表演个节目(大一、大二同级对比).',
    '每月写一篇学习总结，没按时认真写的同学当前周加时5h.',
    '在团队影响他人学习被举报并经核实的当前周加时2h.'
  ];
  

export default function PunishItem(){
    return (
        <List
        dataSource={data}
        renderItem={(item,index)=>(
          <List.Item key={index}
          style={{paddingLeft:'15px'}}
          ><IconFont type='icon-star_full' style={{marginRight:'8px'}}/>{item}</List.Item>
        )}
      />
    );
}