import React, { useState, useEffect } from 'react';
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined,EyeOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { reqGetTotalSummaries } from '../../../api';
import { SUM_PAGE_SIZE, IMG_URL } from '../../../utils/constants';
import moment from 'moment';

const SummaryLeft = (props) => {
  const [total_sum, settotal_sum] = useState([]);
  const [total, settotal] = useState();
  const [curpage, setcurpage] = useState(1);
  const [isloading, setisloading] = useState(false);

  //获取所有总结
  const getSummaries = async (pageNum) => {
    setisloading(true);
    const res = await reqGetTotalSummaries({ pageSize: SUM_PAGE_SIZE, pageNum });
    if (res.code) {
      setisloading(false);
      settotal_sum(res.data.object);
      settotal(res.data.pages * SUM_PAGE_SIZE);
    }
  }

  useEffect(() => {
    getSummaries(1);
  }, []);

  //处理分页
  const handleChangePage = async (cur) => {
    getSummaries(cur);
    setcurpage(cur);
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
      loading={isloading}
      itemLayout="vertical"
      split={false}
      size="large"
      className='left_list'
      pagination={{
        onChange: handleChangePage,
        pageSize: SUM_PAGE_SIZE,
        total: total,
        current: curpage
      }}
      dataSource={total_sum}
      renderItem={item =>{
        const {
          summaryid,
          summaryPicture,
          avatar,
          summaryTitle,
          summaryTime,
          summaryComment,
          summaryThumb,
          summaryView,
          nickname
        }=item;

        const sum_img=summaryPicture?summaryPicture.split('|')[0]:'';

        return (
          <List.Item
            key={summaryid}
            onClick={() => { props.history.push('/summary_detail', { info: item }) }}
            actions={[
              <IconText icon={EyeOutlined} text={summaryView} key="list-vertical-message" />,
              <IconText icon={LikeOutlined} text={summaryThumb} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text={summaryComment} key="list-vertical-message" />
            ]}
            extra={
              sum_img&&<img
                width={272}
                alt="logo"
                className='goal_item_image'
                src={IMG_URL + sum_img}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={avatar}/>}
              title={<p className='goal_item_title'>
                {nickname}
              </p>}
              description={moment(summaryTime).format('YYYY-MM-DD HH:mm:ss')}
            />
            {summaryTitle}
          </List.Item>
        )
      }}
    />
  );
}

export default withRouter(SummaryLeft);