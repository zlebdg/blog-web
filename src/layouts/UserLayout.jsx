import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import DocumentTitle from 'react-document-title'
import React from 'react'
import { connect } from 'dva'
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale'
import SelectLang from '@/components/SelectLang'
import logo from '../assets/logo.svg'
import styles from './UserLayout.less'

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: '',
    },
  } = props
  const { breadcrumb } = getMenuData(routes)
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang/>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo}/>
              <span className={styles.title}>Ant Design</span>
            </div>
            <div className={styles.desc}>
              <FormattedMessage id="antd.intro.logo.under"></FormattedMessage>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter/>
      </div>
    </DocumentTitle>
  )
}

export default connect(({ settings }) => ({ ...settings }))(UserLayout)
