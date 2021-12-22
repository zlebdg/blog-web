import React, { useState } from 'react';
import { Button, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';

export interface DrrData {
  src: string;
  top: number;
  left: number;
  width: number;
  height: number;
  rotateAngle: number;
  handleRotate: any;
  handleResize: any;
  handleDrag: any;
  pageIndex: number;
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      seals: []
    };
  }

  const list = () => {
    request('/seal/list').then(resp => {
      this.setState(state => {
        return {
          ...state, seals: resp
        }
      })
    })
  }

  componentDidMount = () => {
    this.list()
  }

  render() {
    const { fileList, seals } = this.state;

    const upload = () => {
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files', file);
      });
      request('/file/upload', {
        method: 'post',
        data: formData,
      }).then(resp => {
        if (resp && resp.length > 0) {
          resp.map(image => {
            request('/seal/create', {
              method: 'post',
              data: {
                width: 64,
                height: 64,
                name: image.filename,
                file: { id: image.id }
              }
            }).then(() => {
              this.list()
            })
          })
        }
      })
    }

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props}>
          <Button>
            选择文件
            <UploadOutlined />
          </Button>
        </Upload>
        <br />
        <Button onClick={upload}>确认上传</Button>
        <hr />
        {
          seals && seals.content && seals.content.map((item, key) => {
            return (
              <div key={`seal-${item.id}`}>
                {JSON.stringify({ id: item.id, name: item.name, width: item.width, height: item.height })} < br />
                <img alt="图片"
                  src={`/file/download?id=${item.file.id}`}
                  style={{ width: item.width, height: item.height }}
                />
              </div>
            )
          })
        }
      </div >
    )
  }
}

export default Index;
