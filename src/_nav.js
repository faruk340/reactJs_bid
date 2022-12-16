import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCloudUpload,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Upload',
    to: '/theme/colors',
    icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Buttons',
  //   to: '/forms/select',
  //   icon: <CIcon icon={cilCloudUpload} customClassName="nav-icon" />,
  // },
]

export default _nav
