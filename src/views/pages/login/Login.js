import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { CAlert } from '@coreui/react';


const Login = (props) => {
  const dispatch = useDispatch()
  const [visible2, setVisible2] = useState(false)
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const logingVerification = () => {
    if (username === "bid" && password === "123456") {
      dispatch({ username: username, password: password, authenticationValidation: true, type: 'UserLogin' })
    } else {
      setVisible2(true)
    }
  }
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <h1 style={{ textAlign: "center", paddingBottom: "3em" }}>Best Insurance Deal</h1>
          <CRow className="justify-content-center">
            <CCol md={8} className="justify-content-center flex-column">
              <CAlert color="danger" dismissible visible={visible2} onClose={() => setVisible2(false)}>
                Username & Password is wrong
              </CAlert>
              <CCardGroup style={{ width: "100%" }}>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Username" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" onClick={logingVerification}>
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login;
