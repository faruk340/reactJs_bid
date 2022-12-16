import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">

        </a>
        <span className="ms-1">&copy; 2022 All Rights Reserved</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Developed By</span>
        <a href="https://www.gosoftware.in/" target="_blank" rel="noopener noreferrer">
          Go Software
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
