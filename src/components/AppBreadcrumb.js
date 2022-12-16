import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem, CButton } from '@coreui/react'

const AppBreadcrumb = () => {
  const dispatch = useDispatch()
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-2 ms-2">
      {/* <CBreadcrumbItem href="/">Home</CBreadcrumbItem> */}
      <CButton color="info" style={{ position: "absolute", top: "61%", right: "5%" }}><a href='http://mycardatabase.in/bid_data_sample.xlsx' download style={{ textDecoration: "none", color: "#fff" }}>download sample xlsx</a></CButton>
      <CButton color="info" style={{ position: "absolute", top: "61%", left: "5%", color: "#fff" }} onClick={() => dispatch({ authenticationValidation: false, type: 'UserLogin' })}>Logout</CButton>
      {/* {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })} */}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
