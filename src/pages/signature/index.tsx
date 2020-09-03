import React, { useState } from 'react';
import styles from './Welcome.less';
import { Document, Page } from 'react-pdf';
import { Button, Upload, Row, Col, Card, message } from 'antd';
import Drr from '../../components/DragResizeRotate';
import { UploadOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import Meta from 'antd/lib/card/Meta';

export interface PdfPage {
  width: number
  height: number
}

export interface PdfDocument {
  pages: PdfPage[]
  pageIndex: number
  filename: string
  ref: any // 引用pdf
}

export interface PdfSign {
  documents: PdfDocument[]
  docIndex: number
}

export interface Stamper {
  id: number
  src: string
  docIndex: number
  pageIndex: number
  top: number
  left: number
  width: number
  height: number
  rotateAngle: number
  handleRotate: any
  handleResize: any
  handleDrag: any
  boundary: any // 边界处理
  maxX: number
  maxY: number
}

// 计算边界
const f4 = (item: Stamper) => {
  if (!item) return

  // 半径
  const r = Math.sqrt(Math.pow(item.width / 2, 2) + Math.pow(item.height / 2, 2))

  // 以下开始计算四角偏移量
  // 中心点
  const x = item.left + item.width / 2
  const y = item.top + item.height / 2
  // 弧度
  const a = Math.PI / 180 * item.rotateAngle
  // 
  const a4 = Math.atan(item.height / item.width)
  const aa4 = a4 + a
  const dx4 = Math.cos(aa4) * r
  const dy4 = Math.sin(aa4) * r

  // 
  const a3 = Math.atan(item.width / item.height)
  const aa3 = a3 + Math.PI / 2 + a
  const dx3 = Math.cos(aa3) * r
  const dy3 = Math.sin(aa3) * r

  //
  const dx2 = -dx4
  const dy2 = -dy4

  //
  const dx1 = -dx3
  const dy1 = -dy3

  const x4 = Math.round(dx4 + x), x3 = Math.round(dx3 + x), x2 = Math.round(dx2 + x), x1 = Math.round(dx1 + x)
  const y4 = Math.round(dy4 + y), y3 = Math.round(dy3 + y), y2 = Math.round(dy2 + y), y1 = Math.round(dy1 + y)

  // console.log(`x=>${x}, y=>${y}, dx4=>${dx4}, dy4=>${dy4}, dx3=>${dx3}, dy3=>${dy3}, dx2=>${dx2}, dy2=>${dy2}, dx1=>${dx1}, dy1=>${dy1}, `)
  // console.log(`x4=>${x4}, y4=>${y4}, x3=>${x3}, y3=>${y3}, x2=>${x2}, y2=>${y2}, x1=>${x1}, y1=>${y1}, `)

  let xmin = x1, ymin = y1, xmax = x1, ymax = y1
  if (x1 < xmin) xmin = x1
  if (x2 < xmin) xmin = x2
  if (x3 < xmin) xmin = x3
  if (x4 < xmin) xmin = x4
  if (y4 < ymin) ymin = y4
  if (y3 < ymin) ymin = y3
  if (y2 < ymin) ymin = y2
  if (y1 < ymin) ymin = y1
  if (x1 > xmax) xmax = x1
  if (x2 > xmax) xmax = x2
  if (x3 > xmax) xmax = x3
  if (x4 > xmax) xmax = x4
  if (y4 > ymax) ymax = y4
  if (y3 > ymax) ymax = y3
  if (y2 > ymax) ymax = y2
  if (y1 > ymax) ymax = y1
  return [xmin, ymin, xmax, ymax]
}

class Index extends React.Component<PdfSign> {
  constructor(props) {
    super(props)
    this.state = {
      pdfSign: {
        documents: []
      },
      uploadFiles: [],
      seals: [],
      stampers: []
    }
  }

  const listSeals = () => {
    request('/seal/list').then(resp => {
      this.setState(state => {
        return {
          ...state, seals: resp
        }
      })
    })
  }

  componentDidMount = () => {
    this.listSeals()
  }

  render() {
    const { uploadFiles, pdfSign, seals, stampers } = this.state
    const { documents } = pdfSign
    const hasDoc = documents && documents.length > 0
    const docIndex = pdfSign && pdfSign.docIndex || 0

    // 上传文档
    const upload = () => {
      const formData = new FormData();
      uploadFiles.forEach(file => {
        formData.append('files', file);
      });
      request('/file/upload', {
        method: 'post',
        data: formData,
      }).then(resp => {
        if (resp && resp.length > 0) {
          this.setState(state => {
            uploadFiles
            resp.forEach(file => {
              pdfSign.documents.push({ file })
            });
            return { ...state, uploadFiles: [] }
          })
        }
      })
    }

    // 添加印章
    const addStamper = (stamper) => {
      if (!hasDoc) return
      const document = documents[docIndex]
      const pageIndex = document && document.pageIndex || 0
      const ref = document && document.ref || null
      if (!ref) return
      const maxX = Number.parseInt(ref.pages[pageIndex].firstChild.style.width)
      const maxY = Number.parseInt(ref.pages[pageIndex].firstChild.style.height)

      let left = 0, top = 0
      // 追随最后印章位置
      if (stampers && stampers.length > 0) {
        left = stampers[stampers.length - 1].left + 24
        top = stampers[stampers.length - 1].top + 24
      }

      const item: Stamper = {
        id: stamper.id,
        left: left,
        top: top,
        width: stamper.width,
        height: stamper.height,
        rotateAngle: 0,
        docIndex,
        pageIndex,
        maxX,
        maxY,
        handleDrag: (deltaX: number, deltaY: number) => {
          item.top += deltaY
          item.left += deltaX
          this.setState(state => {
            return { ...state }
          })
        },
        handleResize: (style, isShiftKey, type) => {
          let { top, left, width, height } = style
          item.top = Math.round(top)
          item.left = Math.round(left)
          item.width = Math.round(width)
          item.height = Math.round(height)
          this.setState(state => {
            return { ...state }
          })
        },
        handleRotate: (rotateAngle: number) => {
          item.rotateAngle = rotateAngle
          this.setState(state => {
            return { ...state }
          })
        },
        boundary: () => {
          const [x0, y0, x1, y1] = f4(item)
          let dx = 0, dy = 0
          if (x0 < 0) dx = -x0
          if (y0 < 0) dy = -y0
          if (x1 > item.maxX) dx = item.maxX - x1
          if (y1 > maxY) dy = maxY - y1
          this.setState(state => {
            item.left += dx
            item.top += dy
            return { ...state }
          })
        }
      }
      stampers.push(item)
      this.setState(state => {
        return { ...state }
      })
    }

    return (
      <>
        <hr />

        <Upload fileList={uploadFiles} multiple={true}
          onRemove={file => {
            const index = uploadFiles.indexOf(file)
            const list = uploadFiles.slice()
            list.splice(index, 1);
            this.setState(state => ({ ...state, uploadFiles: list }))
          }}
          beforeUpload={file => {
            uploadFiles.push(file)
            this.setState(state => ({ ...state }))
            return false
          }}>
          <Button>
            选择文件
            <UploadOutlined />
          </Button>
        </Upload>
        <br />
        <Button onClick={upload}>上传文件</Button>
        <Button onClick={() => {
          this.setState(state => {
            const { pdfSign } = state
            const { docIndex, documents } = pdfSign
            let index = docIndex && docIndex - 1
            if (index < 0) index = 0
            return {
              ...state, pdfSign: {
                ...pdfSign, docIndex: index
              }
            }
          })
        }}>文档--</Button>
        <Button onClick={() => {
          this.setState(state => {
            const { pdfSign } = state
            const { docIndex, documents } = pdfSign
            let index = docIndex && docIndex + 1 || 1
            if (index >= documents.length) index = documents.length - 1
            return {
              ...state, pdfSign: {
                ...pdfSign, docIndex: index
              }
            }
          })
        }}>文档++</Button>
        <Button onClick={() => {
          this.setState(state => {
            const { pdfSign } = state
            const { docIndex, documents } = pdfSign
            const doc = documents[docIndex]
            if (!doc) return
            let index = doc.pageIndex - 1
            if (index < 0) index = 0
            doc.pageIndex = index
            return { ...state }
          })
        }}>页码--</Button>
        <Button onClick={() => {
          this.setState(state => {
            const { pdfSign } = state
            const { docIndex, documents } = pdfSign
            const doc = documents[docIndex]
            if (!doc) return
            let index = doc.pageIndex + 1
            if (index >= doc.ref.pages.length) index = doc.ref.pages.length - 1
            doc.pageIndex = index
            return { ...state }
          })
        }}>页码++</Button>
        <Button onClick={() => {
          if (!(pdfSign && pdfSign.documents && pdfSign.documents.length > 0)) {
            return
          }
          console.log(this.state)
          if (!(stampers && stampers.length > 0)) {
            return
          }
          console.log(this.state)
          const reqStampers: Stamper[] | any = []
          const reqDocuments: PdfDocument[] | any = []
          pdfSign.documents.forEach(doc => {
            reqDocuments.push(doc.file)
          });
          console.log(reqDocuments)
          stampers.forEach(stamper => {
            reqStampers.push({
              top: stamper.top,
              left: stamper.left,
              width: stamper.width,
              height: stamper.height,
              rotateAngle: stamper.rotateAngle,
              sealId: stamper.id,
              docIndex: stamper.docIndex,
              pageIndex: stamper.pageIndex,
            })
          });
          console.log(reqStampers)
          // sign req
          request("/sign", {
            method: 'post',
            data: {
              documents: reqDocuments,
              stampers: reqStampers
            }
          }).then(resp => {
            message.success(resp || "err")
          }).catch(e => {
            console.log(e)
          })
        }}>确认签署</Button>

        <hr />

        <Row>
          {
            seals && seals.content && seals.content.map((item, sealIndex) => {
              return (
                <Card
                  hoverable={true} key={`seal-${sealIndex}`}
                  style={{ textAlign: 'center', margin: '4px', width: '80px', paddingTop: '4px', display: 'inline-block' }}
                  bodyStyle={{ padding: 0, margin: '10px' }}
                  cover={
                    <img alt="图片"
                      src={`/file/download?id=${item.file && item.file.id}`}
                      style={{ width: item.width, height: item.height, display: 'inline-block' }}
                    />
                  }
                  onClick={() => { addStamper(item) }}>
                  <Meta title={item.name} />
                </Card>
              )
            })
          }
        </Row>

        <hr />

        {
          pdfSign.documents && pdfSign.documents.map((doc, docIndex) => {
            if (!pdfSign.docIndex && 0 == docIndex || pdfSign.docIndex == docIndex) {
              return (
                <div key={`pdf-document-${docIndex}-div`}>
                  {`第${pdfSign.docIndex && pdfSign.docIndex + 1 || 1}/${pdfSign.documents.length}份文件
                  >>${doc.file.filename}<<
                  第${doc.pageIndex && doc.pageIndex + 1 || 1}/${doc.pages && doc.pages.length || '-'}页`}
                  <Document file={`/file/download?id=${doc.file.id}`} key={`pdf-document-${docIndex}-document`}
                    ref={ref => {
                      if (ref) {
                        pdfSign.documents[docIndex].ref = ref
                        if (ref.pages) {
                          pdfSign.documents[docIndex].pages = pdfSign.documents[docIndex].pages || new Array(ref.pages.length)
                          const docPageIndex = doc.pageIndex || 0
                          if (ref.pages[docPageIndex]) {
                            pdfSign.docIndex = docIndex
                            pdfSign.documents[docIndex].pageIndex = docPageIndex
                            pdfSign.documents[docIndex].pages[docPageIndex] = {
                              width: Number.parseInt(ref.pages[docPageIndex].firstChild.style.width),
                              height: Number.parseInt(ref.pages[docPageIndex].firstChild.style.height)
                            }
                          }
                        }
                      }
                    }}>
                    <Page pageIndex={doc.pageIndex || 0} key={`pdf-document-${docIndex}-page`}
                      renderMode="svg" renderTextLayer={false}>
                      {
                        // 印章
                        stampers && stampers.map((stamper: Stamper, stamperIndex) => {
                          if (hasDoc) {
                            const document = documents[docIndex]
                            const { pageIndex } = document
                            if (stamper.docIndex == docIndex && stamper.pageIndex == pageIndex) {
                              return (
                                <Drr
                                  left={stamper.left}
                                  top={stamper.top}
                                  width={stamper.width}
                                  height={stamper.height}
                                  rotateAngle={stamper.rotateAngle}
                                  onRotate={stamper.handleRotate}
                                  onResize={stamper.handleResize}
                                  onDrag={stamper.handleDrag}
                                  onDragEnd={stamper.boundary}
                                  onResizeEnd={stamper.boundary}
                                  onRotateEnd={stamper.boundary}
                                  rotatable={true}
                                  aspectRatio={true}
                                  zoomable='n, w, s, e, nw, ne, se, sw'
                                  key={`stamper-${stamperIndex}-drr`}
                                >
                                  <img src={`/file/download?id=${stamper.id}`} key={`stamper-${stamperIndex}-img`}
                                    style={{
                                      width: stamper.width,
                                      height: stamper.height,
                                      userSelect: "none",
                                      pointerEvents: "none"
                                    }} />
                                </Drr>
                              )
                            }
                          }
                          return (<div key={`stamper-${stamperIndex}-empty`}></div>)
                        })
                      }
                    </Page>
                  </Document>
                </div>)
            }
            return (<div key={`pdf-document-${docIndex}-empty`}></div>)
          })
        }
      </>
    )
  }
}

export default Index;



