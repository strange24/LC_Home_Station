import React, { useEffect, useState,useCallback } from 'react';
import { Card ,Input,Button,Table,Modal, message} from 'antd';
import {reqGetCelebrities,reqDeleteCelebrities} from '../../api';
import LinkButton from '../../components/link-button';
import {PlusCircleOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router';
import debThrFunc from '../../utils/debounce_throttle';

export default function ManageCelevbrity() {
    let history=useHistory();
    const [columns,setColumns]=useState([]);
    const [grade,setSearchGrade]=useState();
    const [list,setList]=useState([]);
    const [visible,setVisible]=useState(false);
    const [Id,setId]=useState('');
    const [totals,setTotals]=useState(0);
    const [loadingState,setLoadingState]=useState(false);
    const pageSize=8;

    const getList=async()=>{
        setLoadingState(true);
        const result=await reqGetCelebrities({celebrityGrade:grade});
        setLoadingState(false);
        if(result.code===1){
            setList(result.data);
            setTotals(result.data.length);
        }else{
            setList([]);
        }
    }

    const deleteRewradPunish=async()=>{
        const result=await reqDeleteCelebrities(Id);
        if(result.code===1){
            message.success('删除成功');
            getList();
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
        setId(info.celebrityid);
    }
    const initColumns=useCallback(()=>{
        setColumns([
              {
                title: '姓名',
                dataIndex: 'celebrityName',
                align:'center'
              },
              {
                  title:'年级',
                  dataIndex:'celebrityGrade',
                  align:'center'
              },{
                  title:'操作',
                  align:'center',
                  render:(info)=>(
                      <span>
                        <LinkButton onClick={()=>history.push('/manage/managecelebrity/add',info)}>修改</LinkButton>
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
        getList();
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const debounce=debThrFunc.debounce_delay((e)=>{
        setSearchGrade(e.target.value);
    },800);

    //搜索框防抖
    const handleChange=useCallback(debounce,[debounce]);
    
    const title=(
        <span>
        <Input 
        placeholder='按年级...' 
        style={{width:150,margin:'0 15px'}}
        onChange={handleChange}
        />
        <Button type='primary' onClick={()=>getList()}>搜索</Button>
    </span>  
    );
    const extra=(
        <LinkButton style={{fontSize:20}} onClick={()=>history.push('/manage/managecelebrity/add')}>
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
                bordered 
                rowKey='celebrityid'
                pagination={{
                    pageSize:pageSize,
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