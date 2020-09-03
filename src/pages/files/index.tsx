import React, { useState } from 'react';
import styles from './Welcome.less';
import { Document, Page } from 'react-pdf';
import { Button, Upload, Row, Col, Card, message } from 'antd';
import Drr from '../../components/DragResizeRotate';
import { UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'umi';

export interface PdfPage {
  width: number
  height: number
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      documents: []
    }
  }

  const listDocuments = () => {
    request('/sign/signed/list').then(resp => {
      this.setState(state => {
        return {
          ...state, documents: resp.content
        }
      })
    })
  }

  componentDidMount = () => {
    this.listDocuments()
  }

  render() {
    const { documents } = this.state

    console.log(documents)
    if (documents && documents.length > 0) {
      return (
        <div>
          <div>已签署文档:</div>
          {
            documents.map((doc, docIndex) => {
              return (
                <div>
                  <Button href={`/file/download?id=${doc.file.id}`}>{`${doc.file.filename}`}</Button>
                </div>
              )
            })
          }
        </div>
      )
    }

    return (<>已签署列表为空</>)
  }
}

export default Index;
