import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout'
import DocumentTitle from 'react-document-title'
import React from 'react'
import { connect } from 'dva'
import { formatMessage } from 'umi-plugin-react/locale'
import SelectLang from '@/components/SelectLang'
import styles from './UserLayout.less'

const BlankLayout = props => {
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
      title={ getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      }) }
    >
      <div className={ styles.container }>
        <div className={ styles.lang }>
          <SelectLang/>
        </div>
        <div className={ styles.content }>
          { children }
        </div>
        <DefaultFooter/>
      </div>
    </DocumentTitle>
  )
}

export default connect(({ settings }) => ({ ...settings }))(BlankLayout)
