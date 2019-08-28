import { Icon } from 'antd'
import React from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import Avatar from './AvatarDropdown'
import SelectLang from '../SelectLang'
import styles from './index.less'

const GlobalHeaderRight = props => {
  const { theme, layout, currentUser } = props
  let className = styles.right

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${ styles.right }  ${ styles.dark }`
  }

  return (
    <div className={ className }>
      {/*<HeaderSearch*/ }
      {/*  className={ `${ styles.action } ${ styles.search }` }*/ }
      {/*  placeholder={ formatMessage({*/ }
      {/*    id: 'component.globalHeader.search',*/ }
      {/*  }) }*/ }
      {/*  dataSource={ [*/ }
      {/*    formatMessage({*/ }
      {/*      id: 'component.globalHeader.search.example1',*/ }
      {/*    }),*/ }
      {/*    formatMessage({*/ }
      {/*      id: 'component.globalHeader.search.example2',*/ }
      {/*    }),*/ }
      {/*    formatMessage({*/ }
      {/*      id: 'component.globalHeader.search.example3',*/ }
      {/*    }),*/ }
      {/*  ] }*/ }
      {/*  onSearch={ value => {*/ }
      {/*  } }*/ }
      {/*  onPressEnter={ value => {*/ }
      {/*  } }*/ }
      {/*/>*/ }
      {
        currentUser && currentUser.authenticated &&
        (<div className={ `${ styles.action }` } onClick={ () => {
          console.log(currentUser)
          router.push(`/${ currentUser.userId }/newBlog`)
        } }>
          <Icon type="edit"/>
          <span className={ styles.name }> 发博客</span>
        </div>)
      }
      <Avatar/>
      <SelectLang className={ styles.action }/>
    </div>
  )
}

export default connect(({ settings, user }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  currentUser: user.currentUser,
}))(GlobalHeaderRight)
