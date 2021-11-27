import React from 'react';
import LeftNav from './components/left-nav';
import { Layout } from 'antd';
import { Redirect ,Route,Switch} from 'react-router';
import Feedback from '../feedback';
import UsersManage from '../users-manage';
import Notice from '../notice';
import NoticeAdd from '../notice-add';
import RewardOrPunish from '../reward-punish';
import RewardPunishAdd from '../reward-punish-add';
import AddCelebrity from '../add-celebrity';
import Certification from '../certification';
import ManageCelevbrity from '../manage-celebrity';
const {  Footer, Sider, Content} = Layout;
export default function Manage(){
    return(
    <Layout style={{minHeight:'100%'}}>
      <Sider><LeftNav/></Sider>
      <Layout>
        <Content>
            <Switch>
                <Route path='/manage/certification' component={Certification}/>
                <Route path='/manage/notice/add' component={NoticeAdd}/>
                <Route path='/manage/users' component={UsersManage} exact/>
                <Route path='/manage/notice' component={Notice} />
                <Route path='/manage/managecelebrity/add' component={AddCelebrity} />
                <Route path='/manage/managecelebrity' component={ManageCelevbrity} />
                <Route path='/manage/rewardpunish/add' component={RewardPunishAdd}></Route>
                <Route path='/manage/rewardpunish' component={RewardOrPunish}></Route>
                <Route path='/manage' component={Feedback} />
                <Redirect to='/manage'/>
            </Switch>
        </Content>
        <Footer style={{textAlign:'center',color:'#ccc'}}>Copyright  2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有</Footer>
      </Layout>
    </Layout>
    )
}