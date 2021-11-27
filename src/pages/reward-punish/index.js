import React, { useEffect, useState,useCallback } from 'react';
import { Card ,Select,Input,Button,Table,Modal, message} from 'antd';
import {reqGetRewardPunish,reqDeleteRewardPunish} from '../../api';
import LinkButton from '../../components/link-button';
import {PlusCircleOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router';
import debThrFunc from '../../utils/debounce_throttle';
import moment from 'moment';

const Option=Select.Option;

export default function RewardOrPunish() {
    const [searchType,setSearchType]=useState();
    let history=useHistory();
    const [columns,setColumns]=useState([]);
    const [searchName,setSearchName]=useState("");
    const [list,setList]=useState([]);
    const [visible,setVisible]=useState(false);
    const [Id,setId]=useState('');
    const [pages,setPages]=useState(1);
    const [totals,setTotals]=useState(0);
    const [loadingState,setLoadingState]=useState(false);
    const pageSize=10;

    const getList=async(pageNum)=>{
        setLoadingState(true);
        let req={
            rewardpunishState:searchType,
            nickname:searchName,
            pageNum:pageNum,
            pageSize:10
        }
        const result=await reqGetRewardPunish(req);
        setLoadingState(false);
        if(result.code===1){
            setList(result.data.object);
            setTotals(result.data.pages*pageSize);
        }else{
            setList([]);
            setTotals(0);
        }
    }
    
    const deleteRewradPunish=async()=>{
        const result=await reqDeleteRewardPunish(Id);
        if(result.code===1){
            message.success('删除成功');
            getList(pages);
            setVisible(false);
        }else{
            message.error(result.error);
        }
    }
    const hideModal=()=>{
        setVisible(false);
    }
    const showModal=(info)=>{
        setVisible(true);
        setId(info.rewardpunishid);
    }
    const initColumns=useCallback(()=>{
        setColumns([
            {
                title: '时间',
                dataIndex: 'rewardpunishTime',
                align:'center',
                render:(rewardpunishTime)=>(
                    moment(rewardpunishTime).format('YY-MM-DD HH:mm:ss')
                )
              },
              {
                title: '姓名',
                dataIndex: 'nickname',
                align:'center'
              },
              {
                  title:'年级',
                  dataIndex:'grade',
                  align:'center'
              },
              {
                title:'类型',
                dataIndex:'rewardpunishState',
                align:'center',
                render:(rewardpunishState)=>(
                    rewardpunishState?'惩罚':'奖励'
                )
             },
              {
                title: '描述',
                dataIndex: 'rewardpunishDescription',
                align:'center'
              },{
                  title:'操作',
                  align:'center',
                  render:(info)=>(
                      <span>
                        <LinkButton onClick={()=>history.push('/manage/rewardpunish/add',info)}>修改</LinkButton>
                        <LinkButton onClick={()=>showModal(info)}>删除</LinkButton>
                      </span>
                  )
              }
        ])
    },[history]);
 

    useEffect(()=>{
        initColumns();
    },[initColumns]);

    useEffect(()=>{
        getList(pages);
    },[pages])// eslint-disable-line react-hooks/exhaustive-deps

    const debounce=debThrFunc.debounce_delay((e)=>{
        setSearchName(e.target.value);
    },800);

    //姓名输入框防抖
    const handleChange=useCallback(debounce,[debounce]);
    
    const title=(
        <span>
        <Select 
        value={searchType}
        placeholder='类型'
        style={{color:'#555',width:100}}
        onChange={value=>setSearchType(value)}
        >
            <Option value='0'>奖励</Option>
            <Option value='1'>惩罚</Option>
        </Select>
        <Input 
        placeholder='按姓名...' 
        style={{width:150,margin:'0 15px'}}
        onChange={handleChange}
        />
        <Button type='primary' onClick={()=>getList(1)}>搜索</Button>
    </span>  
    );
    const extra=(
        <LinkButton style={{fontSize:20}} onClick={()=>history.push('/manage/rewardpunish/add')}>
            <PlusCircleOutlined style={{marginRight:5}}/>添加
        </LinkButton>
    );
    return (
        <div style={{height:'100%'}}>
            <Card 
            title={title}
            extra={extra} 
            style={{border:'1px solid #eee',height:"100%"}}
            >
                <Table 
                loading={loadingState}
                dataSource={list} 
                columns={columns} 
                bordered rowKey='rewardpunishid'
                pagination={{
                    onChange: page => {
                        setPages(page);
                    },
                    pageSize:10,
                    total:totals
                    }}
                />
            </Card>
            <Modal
                title="确认"
                visible={visible}
                onOk={deleteRewradPunish}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
                bodyStyle={{fontSize:16}}
            >确定要删除吗？</Modal>
        </div>
    );
}