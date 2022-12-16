import React, { useState, useEffect } from 'react'
import axios, { post } from 'axios'
import '../../../../src/scss/App.css'
import DataTable from 'react-data-table-component'
import { CButton, CFormSelect } from '@coreui/react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { cilCheckCircle } from '@coreui/icons';
import { CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Colors = () => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [validExcellFile, setValidExcellFile] = useState(false)
  const [fileNameError, setfileNameError] = useState(false)
  const [fileSizedError, setfileSizedError] = useState(false)
  const [file, setFile] = useState(null)
  const [nameChange, setNameChange] = useState("")
  const [allFileList, setallFileList] = useState([])
  const [fileSized, setFileSized] = useState()
  function handleChange(event) {
    var file_size = event.target.files[0].size
    var file_extantion = event.target.files[0].name;
    var extension = file_extantion.substring(file_extantion.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
      setFile(event.target.files[0])
    } else {
      setValidExcellFile(true)
      setFile(null)
    }
    setFileSized(file_size)
  }

  function handleFileNameChange(event) {
    setNameChange(event.target.value)
  }
  let file_size_max = fileSized / 1024;
  const MIN_FILE_SIZE = 2048  //1MB
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (file !== null && nameChange !== "" && file_size_max < MIN_FILE_SIZE) {
      console.log("nameChange", nameChange);
      const formData = {
        name: nameChange,
        file: file,
      }
      try {
        const response = await axios({
          method: "post",
          url: "http://139.59.0.124:8080/api/filename/",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
      } catch (error) {
        console.log(error)
      }
      await getFileName()
      setVisible(true)
    } else if (file === null) {
      setValidExcellFile(true)
    } else if (nameChange === "") {
      setfileNameError(true)
    } else if (file_size_max < MIN_FILE_SIZE) {
      setfileSizedError(true)
    }
    else {
      setVisible2(true)
    }
  }

  const successClose = () => {
    setVisible(false)
    setFile(null)
    setNameChange("")
  }

  // ==========================file delete=======================
  const fileDeleteFunction = async (filedata) => {
    const deleteFile = await filedata.id;
    await axios.delete(`http://139.59.0.124:8080/api/filename/${deleteFile}`)
    await getFileName()
  }

  const OnDeleteFunc = (filedata) => {
    confirmAlert(confirmAlert({
      title: 'Are you sure?',
      message: 'You want to delete this file?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => { fileDeleteFunction(filedata) }
        },
        {
          label: 'No',
          onClick: () => { onclose }
        }
      ]
    }));
  }


  // ==================================



  const getFileName = async () => {
    try {
      const response = await axios.get('http://139.59.0.124:8080/api/filename/')
      const Result = response.data;
      const fileResult = Result.map((ele, index) => {
        return {
          ownId: index + 1,
          id: ele.id,
          name: ele.name
        }
      })
      setallFileList(fileResult)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getFileName()
  }, []);
  const columns = [
    {
      name: 'Id',
      selector: (row) => row.ownId,
    },
    {
      name: 'List Name',
      selector: (row) => row.name,
    },
    {
      name: 'Action',
      cell: (row) => <CButton color="danger" id='btnDetails' onClick={() => { OnDeleteFunc(row) }}>Delete</CButton>,
    },
  ]

  return (
    <>
      <CAlert color="success" className="d-flex align-items-center" dismissible visible={visible} onClose={successClose}>
        <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>
          File upload successfully.
        </div>
      </CAlert>
      <CAlert color="danger" dismissible visible={visible2} onClose={() => setVisible2(false)}>
        Somthing is wrong
      </CAlert>
      <CAlert color="danger" dismissible visible={validExcellFile} onClose={() => setValidExcellFile(false)}>
        Please select a valid excel file.
      </CAlert>
      <CAlert color="danger" dismissible visible={fileNameError} onClose={() => setfileNameError(false)}>
        Please enter file name.
      </CAlert>
      <CAlert color="danger" dismissible visible={fileSizedError} onClose={() => setfileSizedError(false)}>
        Your file sized is too big (Support only less then 1MB file)
      </CAlert>
      <div className="upload_container" style={{ marginBottom: "2em" }}>
        <form onSubmit={handleSubmit} className="uploadForm">
          <input type="file" onChange={handleChange} />
          <input type="text" onChange={handleFileNameChange} placeholder="Type File Name" style={{ marginRight: "4em" }} />
          <button type="submit" className="uploadBtn">Upload</button>
        </form>
      </div>
      <DataTable
        title="Previous Uploaded Files List -"
        columns={columns}
        data={allFileList}
        pagination
      />
    </>
  )
}

export default Colors
