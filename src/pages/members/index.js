import React,{useState,useEffect} from 'react';
import  './index.less';
import {Tabs} from 'antd';
import NavDrawer from '../../components/nav_drawer';
import { reqGetMembers } from "../../api";
import { IMG_URL } from "../../utils/constants";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2793892_p0wg6ftjiap.js',
});


const { TabPane } = Tabs;

export default function TeamMembers(props){
    const [members, setmembers] = useState([]);
    const [whole, setwhole] = useState(0);
    const grades=[2020,2019,2018,2017,2016];

    //按照年级获取数据
    const getMembers=async (grade)=>{
        const res=await reqGetMembers(grade);
        if(res.code){
            setmembers(res.data.object);
            setwhole(res.data.number);
        }else{
            setmembers([]);
        }
    }

    const changeGrade=async (grade)=>{
        getMembers(grade);
    }

    useEffect(()=>{
        getMembers(2020);
    },[])

    return (
        <div className='member_wrapper'>
            <NavDrawer/>
            <h1 className='member_title'>团队成员</h1>
            <div className='member_data'>
                <p>当前年级：<span>{members.length}</span></p>
                <p>成员总数：<span>{whole}</span></p>
            </div>
            <div className='member_tabs'>
            <Tabs defaultActiveKey="2020" onChange={changeGrade}>
            {
                grades.map(item=>(
                    <TabPane tab={item+'级'} key={item} className='member_con'>
                    <ul className='members'>
                    {
                        members.length?members.map((item,index)=>{
                            const {avatar,nickname,selfIntroduction,userid}=item;
                            return (
                                <li key={index}>
                                    <div onClick={()=>{props.history.push('/space',{userid})}}>
                                        {avatar?<img src={IMG_URL+avatar} alt='avatar'></img>:
                                            <IconFont type='icon-icon-test' className='avatar_icon'/>
                                        }
                                        <div className='right'>
                                            <h2>{nickname}</h2>
                                            <p>自我介绍：{selfIntroduction?selfIntroduction:'暂无'}</p>
                                        </div>
                                    </div> 
                                </li>
                            )
                        }):(
                            <div className='members_null'>
                                <IconFont type='icon-kong' className='members_icon'/>
                                <p>暂无数据~</p>
                            </div>
                        )
                    }
                    </ul>
                </TabPane>
                ))
            }
                {/* <TabPane tab="2019级" key="2019">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="2018级" key="2018">
                Content of Tab Pane 3
                </TabPane> */}
            </Tabs>
            </div>
        </div>
    );
}