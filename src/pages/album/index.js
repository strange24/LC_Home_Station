import React from 'react';
import './index.less';
import {Layout} from 'antd';
import NavDrawer from '../../components/nav_drawer';
import { useHistory } from 'react-router';
import albumType from '../../config/album';
import {IMG_BED_URL} from '../../utils/constants';

const { Footer } = Layout;
function Album() {
    let history=useHistory();
    return (
        <Layout>
        <div className='album'>
        <NavDrawer />
            <div className='Special'>
            {
                albumType.data.map((item,index)=>{
                    return (
                        <div key={index}>
                            <img src={IMG_BED_URL+item.img_src} alt='pic'/>
                            <h2 className='name'>{item.title}</h2>
                            <div className='scale-in-ver-bottom'>
                                <h2>{item.sub_h}</h2>
                                <p>{item.sub_p}<br/>
                                    <button onClick={()=>history.push('/album/detail',index+1)}>View more</button>
                                </p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
        <Footer className='album-footer'>Copyright  2021 - 2022 LeCheng. All Rights Reserved. 乐程软件工作室 版权所有</Footer>
        </Layout>
    )
}
export default Album;