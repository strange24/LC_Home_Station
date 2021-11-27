import React,{useEffect,useState,useImperativeHandle} from 'react';
import {Row,Col,List,Modal} from 'antd';
import {useHistory} from 'react-router-dom';
import {reqGetGoals} from '../../../api';
import moment from 'moment';
import {GOAL_PAGE_SIZE,IMG_URL} from "../../../utils/constants";
import Avatar from 'antd/lib/avatar/avatar';
import './index.less';

const GoalList=React.forwardRef((props,ref)=>{
    const [goals, setgoals] = useState([]);
    const [total, settotal] = useState(GOAL_PAGE_SIZE);//总条数
    const [curpage, setcurpage] = useState(1);//当前页码
    const [isloading, setisloading] = useState(false);
    const history=useHistory();

    //获取目标
    const initGoals=async (pageNum)=>{
        setisloading(true);
        const res=await reqGetGoals({pageSize:GOAL_PAGE_SIZE,pageNum});
        setisloading(false);
        if(res.code){
            setgoals(res.data.object);
            settotal(GOAL_PAGE_SIZE*res.data.pages);
        }else{
            setgoals([]);
            settotal(0);
        }
    }

    //将initGoals暴露给父组件
    useImperativeHandle(ref,()=>({
        initGoals
    }))

    useEffect(()=>{
        initGoals(1);
    },[]);

    //显示目标详情
    const showDetail=(value)=>{
        Modal.info({
            content: value,
            okText:'关闭'
        })
    }

    /*换页*/
    const handleChangePage=(cur)=>{
        setcurpage(cur);
        initGoals(cur);
    }
    
    /*目标content*/
    const getDescription=(item)=>{
        const {goalContent,goalState,goalTime}=item;
        return (
            <div className='list_item_desc'>
                <p onClick={()=>{showDetail(goalContent)}}>{goalContent}</p>
                <div className='desc_footer'>
                    <p>{moment(goalTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <p style={{color:goalState?'green':'red'}}>{goalState?'已完成':'未完成'}</p>
                </div>
            </div>
        );
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
        <div className='goal_wall_wrapper' id='goal_list' name='goal_list'>
            <Row className='goal_list'>
                <Col {...leftcol} className='goal_list_left'>
                    <div className='title'>目标<span>Targets</span></div>
                    <p>我们不仅希望你积蓄三年终取得一个满意的结果，也希望你一步一步迈向成功的过程精彩着，写下你的目标吧，让大家共同见证你在乐程闪闪发光的日子~</p>
                </Col>
                <Col {...rightcol} className='goal_list_right'>
                    <List
                        loading={isloading}
                        itemLayout="horizontal"
                        dataSource={goals}
                        split={false}
                        pagination={{
                            onChange: handleChangePage,
                            pageSize: GOAL_PAGE_SIZE,
                            total:total,
                            current:curpage
                        }}
                        className='goal_right_con'
                        renderItem={
                            goals&&(item => (
                                <List.Item className='list_item'>
                                    <List.Item.Meta
                                    avatar={<Avatar 
                                        src={IMG_URL+item.avatar} 
                                        onClick={()=>{history.push('/space',{userid:item.userid})}}
                                    />}
                                    title={<p style={{color:'#fff'}}>{item.nickname}</p>}
                                    description={getDescription(item)}
                                />
                                </List.Item>
                            ))
                        }
                    />                    
                </Col>
            </Row>
        </div>
    );
})

export default GoalList;
