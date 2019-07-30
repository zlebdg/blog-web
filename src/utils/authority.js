export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' ? sessionStorage.getItem('antd-pro-authority') : str // authorityString could be admin, "admin", ["admin"]

  let authority

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString)
    }
  } catch (e) {
    authority = authorityString
  }

  if (typeof authority === 'string') {
    return [authority]
  }

  return authority
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority
  return sessionStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority))
}
