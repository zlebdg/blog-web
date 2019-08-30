import React, { PureComponent } from 'react'
import { Col, Row }             from 'antd'
import GithubEmoji              from '../../../components/GithubEmoji'

const text = '🤣🙌💚💛👏😉💯💕💞💘💙💙🖤💜❤️😍😻💓💗😋😇😂😹😘💖😁😀🤞😲😄😊👍😌😃😅✌️🤗💋😗😽😽🤠😙😺👄😸😏😼👌😎😆😛🙏🤝🙂🤑😝😐😑🤤😤🙃🤡😶😪😴😵😓👊😦😷🤐😜🤓👻😥🙄🤔🤒🙁😔😯☹️☠️😰😩😖😕😒😣😢😮😿🤧😫🤥😞😬👎💀😳😨🤕🤢😱😭😠😈😧💔😟🙀💩👿😡😾🖕'
const emojis = []
for (let i = 0; i < text.length; i += 1) {
  if (text.codePointAt(i) > 0xffff) {
    emojis.push(text.codePointAt(i))
  }
}

export default class Index extends PureComponent {
  render() {
    const { aa } = this.props
    return (
      <div
        style={ {
          textAlign: 'center',
        } }
      >
        emoji
        <hr/>
        <Row>
          <Col>
            {
              emojis.map(emoji => <GithubEmoji codePoint={ emoji }/>)
            }
          </Col>
          <hr/>
          <Col>{ text }</Col>
        </Row>
      </div>
    )
  }
}
