import React, { useEffect, useState,useCallback } from 'react';
import { Upload, message, Image,Pagination,Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';
import { useHistory } from 'react-router';
import { reqGetAlbum, reqDeleteAlbum } from '../../api';
import { IMG_PAGE_SIZE,IMG_URL } from '../../utils/constants';
import { createFromIconfontCN } from '@ant-design/icons';
import storageUtils from "../../utils/storageUtils";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2739025_oodi7yrxd77.js',
});

export default function AlbumDetail(albumId) {
  const id = albumId.location.state;
  let history = useHistory();
  const [album, setAlbum] = useState([]);
  const [total_page, settotal_page] = useState(1);//总照片数量
  const [curpage, setcurpage] = useState(1);
  const [pageSize, setpageSize] = useState(10);//pageSize
  
  //获取对应页的数据
  const getAlbum = useCallback(async (size,pageNum) => {
    const result = await reqGetAlbum({id, pageSize:size?size:IMG_PAGE_SIZE, pageNum});
    if (result.code === 1) {
      if(result.data){
        setAlbum(result.data.object);
        settotal_page(result.data.pages);
      }
    }
  },[id]);

  useEffect(() => {
    getAlbum(null,1);
  }, [getAlbum])

  const onChangeUpload = async ({ file, fileList }) => {
    if (file.status === 'done') {
      //上传图片
      const result = file.response;
      if (result.code === 1) {
        message.success('上传成功');
        //跳转第一页
        setcurpage(1);
        getAlbum(null,1);
      } else {
        message.error(result.message);
      }
    }
  }
  const deleteAlbum = (name) => {
    Modal.confirm({
      content: '删除后不可恢复，确定要删除吗？',
      onOk:async ()=>{
        const result = await reqDeleteAlbum(name);
        if (result.code === 1) {
          message.success('删除成功');
          getAlbum(null,1);
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  //处理分页
  const handleChange=(value,size)=>{
    setcurpage(value);
    setpageSize(size);
    getAlbum(size,value);
  }

  return (
    <div className='album-detail'>
      <span onClick={() => history.goBack()}><IconFont type='icon-fanhui'/>返回</span>
      <div className='upload-box'>
        <Upload
          style={{ width: '100%' }}
          name="file"
          headers={{"Authorization":storageUtils.getUser().token}}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/lc/picture/upload"
          data={{ id: id }}
          onChange={onChangeUpload}
        >
            <IconFont type='icon-ai-up-img' className='upload_icon'/>
            <p>upload</p>
            </Upload>
      </div>
      {
        album.length?(
          <div>
            <Image.PreviewGroup>
              <div className='img_box'>
              {
                album.map((item) => {
                  return (
                    <div className='box' key={item.pictureId}>
                      <Image
                        className='imgList'
                        width={270}
                        height={270}
                        fallback="data:image/png;base64,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"
                        src={IMG_URL + item.pictureName}
                      />
                      < DeleteOutlined className='delete' onClick={() => deleteAlbum(item.pictureName)} />
                    </div>
                  )
                })
              }
              </div>
            </Image.PreviewGroup>
            <Pagination 
            current={curpage}
            total={total_page*pageSize}
            showQuickJumper={true}
            pageSize={pageSize}
            showSizeChanger={true}
            onChange={handleChange}
            className='album_pagination'
            />
          </div>
        ):(
          <div className='null_info'>
            <IconFont type='icon-kong' className='null_icon'/>
            <p>暂无照片，快来上传照片吧~</p>
          </div>
        )
      }
    </div>
  );
}

