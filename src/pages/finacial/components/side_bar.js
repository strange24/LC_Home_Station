import React from "react";
import { Menu } from 'antd';
import { Link,withRouter } from "react-router-dom";
import {
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import storageUtils from '../../../utils/storageUtils';

const SideBar=(props)=>{
    const path=props.location.pathname;
    const selection=path.split('/')[2];

    return (
        <div className='financial_side_bar'>
            <div className='financial_side_top'>
                <p><Link to='/' style={{color:'#fff'}}>&lt;首页</Link></p>
                <p>团队财务</p>
            </div>
            <div className='financial_side_menu'>
                <Menu
                defaultSelectedKeys={[selection?selection:'detail']}
                theme="dark"
                >
                    <Menu.Item key="detail" icon={<DesktopOutlined />}>
                        <Link to='/financial/detail'>收入/支出</Link>
                    </Menu.Item>
                    {
                        storageUtils.getUser().role===2&&(
                            <Menu.Item key="manage" icon={<ContainerOutlined />}>
                                <Link to='/financial/manage'>数据管理</Link>
                            </Menu.Item>
                        )
                    }
                    <Menu.Item key="charts" icon={<ContainerOutlined />}>
                        <Link to='/financial/charts'>图形图表</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default withRouter(SideBar);