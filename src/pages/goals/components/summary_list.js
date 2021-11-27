import React from 'react';
import {Row,Col} from 'antd';
import SummaryLeft from './summary_left';

export default function SummaryList(){
    return (
        <div className='summary_list'>
            <div className='sum_header'>
                <div className='title_detail'>
                    <div className='line_01'></div>
                    <div className='line_02'></div>
                    <p>队员总结</p>
                    <p>Summaries</p>
                </div>
            </div>
            <Row className='sum_con' id='summary_list' name='summary_list'>
                <Col span={24} className='con_left'>
                    <SummaryLeft/>
                </Col>
            </Row>
        </div>
    );
}