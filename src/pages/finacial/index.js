import React from "react";
import { Layout } from "antd";
import './index.less';
import SideBar from './components/side_bar';
import InOutCome from "./components/in_outcome";
import Charts from "./components/charts";
import Manage from "./components/manage";
import { Redirect, Route,Switch } from "react-router-dom";

const {Content,Footer,Sider}=Layout;

export default function Finacial(){
    
    return (
        <Layout className='financial_wrapper'>
            <Sider>
                <SideBar/>
            </Sider>
            <Layout>
                <Content className='financial_content'>
                    <Switch>
                        <Redirect exact from='/financial' to='financial/detail'></Redirect>
                        <Route path='/financial/detail' exact component={InOutCome}></Route>
                        <Route path='/financial/manage' exact component={Manage}></Route>
                        <Route path='/financial/charts' exact component={Charts}></Route>
                        <Route component={InOutCome}></Route>
                    </Switch>
                </Content>
                <Footer className='financial_footer'>
                Copyright © 2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有
                </Footer>
            </Layout>
      </Layout>
    );
}