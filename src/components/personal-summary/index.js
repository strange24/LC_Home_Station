import React, { useEffect, useState,useCallback } from 'react';
import { Card, List, message,Modal } from 'antd';
import { MessageOutlined, LikeOutlined,EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { reqDeletePersonalSummary, reqGetPersonalSummary } from '../../api';
import { useHistory } from 'react-router';
import { GOAL_SIZE_SPACE, IMG_URL } from '../../utils/constants';
import { withRouter } from 'react-router-dom';
import storageUtils from '../../utils/storageUtils';
import './index.less';


function PersonalSummary(props) {
  const { userid } = props;
  const [summaryList, setSummaryList] = useState([]);
  const [pages, setPages] = useState(1);
  const [curpage, setcurpage] = useState(1);
  const [isloading, setisloading] = useState(false);

  let history = useHistory();

  const getSummaryList = useCallback(async (pageNum) => {
    setisloading(true);
    const result = await reqGetPersonalSummary({ userid, pageNum, pageSize: GOAL_SIZE_SPACE });
    setisloading(false);
    if (result.code === 1) {
      if(result.data){
        setSummaryList(result.data.object);
        setPages(result.data.pages);
      }
    }
  },[userid]);

  //换页
  const handleChangePage = (value) => {
    setcurpage(value);
    getSummaryList(value);
  }

  const deleteSummary = (summaryid) => {
    Modal.confirm({
      content: '确定要删除这条总结吗？',
      okText:'确定',
      cancelText:'取消',
      onOk:async ()=>{
        const result = await reqDeletePersonalSummary(summaryid);
        if (result.code === 1) {
          message.success('删除成功');
          getSummaryList(1);
        } else {
          message.error(result.message);
        }
      }
    })
  }

  useEffect(() => {
    getSummaryList(1);
  }, [getSummaryList])

  const IconText = ({ icon, text }) => (
    <div style={{ color: '#eee' }}>
      {React.createElement(icon)}
      {text}
    </div>
  );
  return (
    <Card
      className='personal_summary_list'
      style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid #222', marginTop: 0 }}
      headStyle={{ borderBottom: '1px solid #999', color: '#7546C8' }}
      bodyStyle={{ color: '' }}
    >
      <List
        itemLayout="vertical"
        loading={isloading}
        size="large"
        pagination={{
          onChange: handleChangePage,
          pageSize: GOAL_SIZE_SPACE,
          total: GOAL_SIZE_SPACE * pages,
          current: curpage
        }}
        dataSource={summaryList}
        renderItem={item =>{
          const {
            summaryTitle,
            summaryDetail,
            summaryThumb,
            summaryComment,
            summaryView,
            summaryid,
            summaryPicture
          }=item;
          return (
            <List.Item
              style={{ color: '#ddd', borderBottom: '1px solid #666' }}
              key={summaryid}
              className='goal_list_item'
              actions={[
                <IconText icon={EyeOutlined} text={summaryView} key="list-vertical-message" />,
                <IconText icon={LikeOutlined} text={summaryThumb} key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text={summaryComment} key="list-vertical-message" />,
              ]}
              extra={
                item.summaryPicture ? (
                  <img
                  className='goal_item_img'
                  alt="logo"
                  src={IMG_URL + summaryPicture.split('|')[0]}
                  style={{marginLeft:15}}
                />
                ) : ''
              }
            >
              <List.Item.Meta title={<span style={{ color: '#7546C8' }}>
                <h2
                  className='space_summary_title'
                  onClick={() => { props.history.push('/summary_detail', { info: item }) }}
                >
                  {summaryTitle}
                </h2>
                {
                  userid === storageUtils.getUser().userid ? (
                    <div>
                      <EditOutlined
                        style={{ color: '#f75c0cad', marginLeft: 20, fontSize: 20 }}
                        onClick={() => history.push('/space/summaryadd', item)}
                      />
                      <DeleteOutlined
                        style={{ color: '#f75c0cad', marginLeft: 10, fontSize: 20 }}
                        onClick={() => deleteSummary(summaryid)}
                      />
                    </div>
                  ) : ''
                }
              </span>}
              />
              <div dangerouslySetInnerHTML={{ __html: summaryDetail }}></div>
            </List.Item>
          )
        } }
      />
    </Card>
  );
}
export default withRouter(PersonalSummary);