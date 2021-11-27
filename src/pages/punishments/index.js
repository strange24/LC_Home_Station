import React,{useEffect,useState,useRef} from 'react';
import './index.less';
import { Row,Col,Card,Button,Select,Form,Table,Input } from "antd";
import PunishItem from "./components/punish_item";
import { createFromIconfontCN } from '@ant-design/icons';
import {PUNISH_PAGE_SIZE} from '../../utils/constants';
import { reqGetPunish } from '../../api';
import moment from 'moment';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_uj7bxdzmlpr.js',
});

const {Option}=Select;
  
  const columns = [
    {
      title: '序号',
      dataIndex: 'rewardpunishid',
      align:'center'
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      align:'center'
    },
    {
      title: '年级',
      dataIndex: 'grade',
      align:'center',
      render:grade=>grade+'级'
    },
    {
        title: '类型',
        dataIndex: 'rewardpunishState',
        align:'center',
        render:type=>(
            type?<span style={{color:'red'}}>惩罚</span>:
            <span>奖励</span>
        )
    },
    {
        title: '描述',
        dataIndex: 'rewardpunishDescription',
        align:'center'
    },
    {
        title: '日期',
        dataIndex: 'rewardpunishTime',
        align:'center',
        render:date=>moment(date).format('YYYY-MM-DD')
    },
];

export default function RewardPunishment(props){
    const [punish_records, setpunish_records] = useState([]);
    const [curpage, setcurpage] = useState(1);
    const [total, settotal] = useState();
    const [allParams, setallParams] = useState({grade:'',nickname:'',rewardpunishState:null});//保存搜索字段
    const formRef=useRef();

    //获取奖惩记录
    const getPunishRecords=async (params,pageNum)=>{
        const res=await reqGetPunish({pageSize:PUNISH_PAGE_SIZE,pageNum,...params});
        if(res.code){
            setpunish_records(res.data.object);
            settotal(res.data.pages*PUNISH_PAGE_SIZE);
        }else{
            setpunish_records([]);
            settotal(0);
        }
    }

    //换页
    const handleChangePage=(cur)=>{
        setcurpage(cur);
        getPunishRecords(allParams,cur);
    }

    useEffect(()=>{
        getPunishRecords(null,1);
    },[]);

    //搜索
    const handleFinish=(values)=>{
        setallParams(values);
        getPunishRecords(values,curpage);
    }

    const title=(
        <Form 
            className='search_form' 
            ref={formRef}
            onFinish={handleFinish} 
        >
            <Form.Item
                name='rewardpunishState'
                className='form_item'
            >
                <Select allowClear placeholder='奖惩'>
                    <Option value={0}>奖励</Option>
                    <Option value={1}>惩罚</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name='grade'
                className='form_item'
            >
                <Input placeholder='按年级...'/>
            </Form.Item>
            <Form.Item
                name='nickname'
                className='form_item'
            >
                <Input placeholder='按姓名...' allowClear/>
            </Form.Item>
            <Form.Item className='form_item'>
                <Button type='primary' htmlType='submit'>搜索</Button>
            </Form.Item>
        </Form>
    );

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
        <div className='reward_wrapper'>
            <div className='punish_header'>
                <Row className='punish_con'>
                    <Col {...leftcol} className='con_left'>
                        <p onClick={()=>{props.history.push('/')}}>
                            <IconFont type='icon-fanhui'/>首页
                        </p>
                        <h2>奖惩制度</h2>
                        <p>低年级同学应自觉遵守团队规定，高年级同学应给学弟学妹们做好表率</p>
                    </Col>
                    <Col {...rightcol} className='con_right'>
                        <PunishItem/>
                    </Col>
            </Row>
            </div>
            <div className='punish_title' id='rp_record' name='rp_record'>
                <p>奖惩记录</p>
            </div>
            <div className='punish_record'>
                <Card title={title} className='punish_card'>
                    <Table 
                        dataSource={punish_records} 
                        bordered 
                        columns={columns} 
                        rowKey='rewardpunishid'
                        pagination={{
                            pageSize:PUNISH_PAGE_SIZE,
                            total:total,
                            onChange:handleChangePage,
                            current:curpage
                        }}
                    />
                </Card>
                <div className='punish_footer'>
                Copyright © 2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有
                </div>
            </div>
        </div>
    );
}