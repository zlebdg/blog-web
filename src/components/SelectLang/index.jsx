import { Dropdown, Icon, Menu } from 'antd'
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale'
import React from 'react'
import classNames from 'classnames'
import styles from './index.less'

export default class Index extends React.PureComponent {
  state = {}

  render() {
    const { className } = this.props
    const selectedLang = getLocale()

    const changeLang = ({ key }) => setLocale(key, false)

    const locales = ['zh-CN', 'en-US']
    // const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR']; // 只留两个, 一个人开发翻译不过来

    const languageLabels = {
      'zh-CN': '简体中文',
      'zh-TW': '繁体中文',
      'en-US': 'English',
      'pt-BR': 'Português',
    }
    const languageIcons = {
      'zh-CN': '🇨🇳',
      'zh-TW': '🇭🇰',
      'en-US': '🇬🇧',
      'pt-BR': '🇧🇷',
    }
    const langMenu = (
      <Menu className={ styles.menu } selectedKeys={ [selectedLang] } onClick={ changeLang }
            style={ { zIndex: 2000 } }>
        { locales.map(locale => (
          <Menu.Item key={ locale } onClick={ () => {
            setTimeout(() => {
              this.setState({
                display: null,
              })
            }, 200)
          } }>
          <span role="img" aria-label={ languageLabels[locale] }>
            { languageIcons[locale] }
          </span>{ ' ' }
            { languageLabels[locale] }
          </Menu.Item>
        )) }
      </Menu>
    )
    return (
      <span>
        <Dropdown overlay={ langMenu } placement="bottomRight" onVisibleChange={ (visible) => {
          if (navigator && navigator.appVersion && navigator.appVersion.indexOf('iPhone') !== -1) {
            if (visible) {
              this.setState({
                display: 'block',
              })
            } else {
              setTimeout(() => {
                this.setState({
                  display: null,
                })
              }, 200)
            }
          }
        } }>
          <span className={ classNames(styles.dropDown, className) }>
            <Icon type="global" title={ formatMessage({
              id: 'navBar.lang',
            }) }/>
          </span>
        </Dropdown>
        <div style={ {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: 0.2,
          zIndex: 1999,
          display: this.state.display || 'none',
        } }>
        </div>
    </span>
    )
  }
}
