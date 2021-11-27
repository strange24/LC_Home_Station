import React, { useEffect, useState, useImperativeHandle } from 'react';
import { message, Upload } from 'antd';
import { IMG_URL } from '../../../utils/constants';
import storageUtils from "../../../utils/storageUtils";

export const RichImg = React.forwardRef((props, ref) => {
  const [fileList, setFileList] = useState([]);
  const { img } = props;

  useEffect(() => {
    if (img) {
      var file = [];
      img.split('|').forEach((i, index) => {
        file.push({
          uid: -index,
          name: img,
          url: IMG_URL + i,
          status: 'done'
        })
      })
      setFileList(file);
    }
  }, [img]);

  useImperativeHandle(ref, () => ({
    //暴露给父组件的方法
    getImgs: () => {
      var pic = [];
      if (fileList.length > 0) {
        fileList.forEach(file => {
          pic.push(file.name);
        })
        return pic;
      }
      return [];
    }
  }));

  const onChange = async ({ file, fileList }) => {
    if (file.status === 'done') {
      //上传图片
      const result = file.response;
      if (result.code === 1) {
        message.success('上传图片成功');
        const name = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
      }
    } else if (file.status === 'removed') {
      message.success('删除成功');
    }
    setFileList(fileList);
  }

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
      <Upload
        action='/lc/upload'
        listType="picture-card"
        name='multipartFile'
        headers={{ "Authorization": storageUtils.getUser().token }}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        className='summaryPic'
      >
        {'+ Upload'}
      </Upload>
  )
})
