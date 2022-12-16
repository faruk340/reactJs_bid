import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../../../src/scss/App.css';
import {
  CButton, CFormSelect, CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import { CAlert } from '@coreui/react';
import Modal from 'react-modal';
import ReactToPrint from 'react-to-print';
import CIcon from '@coreui/icons-react';
import ReactLoading from 'react-loading';
import {
  cibWhatsapp,
  cilPrint
} from '@coreui/icons';
const Dashboard = () => {
  const componentRef = useRef();
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(true)
  const [visible, setVisible] = useState(false);
  const [successfull, Setsuccessfull] = useState(false);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [filterUserData, setFilterUserData] = useState([]);
  const [DropdownData, setDropdownData] = useState([]);
  const [WhatsappTemplatSelection, setWhatsappTemplatSelection] = useState("");
  const [Selection, setSelection] = useState();
  const [pdfData, SetPdfData] = useState({});
  // const [pdfWhatsappData, SetWhatsappPdfData] = useState({});
  const [whatsappMsgVisible, setWhatsappMsgVisible] = useState(false)
  // ================whatsappModelSelection======================
  console.log("WhatsappTemplatSelection", WhatsappTemplatSelection);
  const whatsappDropdownData = [
    {
      label: "Please select Whatsapp Template",
    },
    {
      label: "Whatsapp Template 1",
      value: "Whatsapp_Template_1",
    },
    {
      label: "Whatsapp Template 2",
      value: "Whatsapp_Template_2",
    }
  ]
  const whatsMsgTypeFun = (row) => {
    SetPdfData(row)
    setWhatsappMsgVisible(true)
  }
  // ========end whatsappModelSelection============
  const customStyles = {
    content: {
      top: '60%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "60%",
      height: "80%",
      zIndex: 999
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  };

  function closeModal() {
    setIsOpen(false);
  };

  const getDropdownData = async () => {
    try {
      const response = await axios.get('http://139.59.0.124:8080/api/filename');
      const dropDown = response.data;
      const dropDownResult = dropDown.map((ele, index) => {
        return {
          label: ele.name,
          value: index + 1,
          id: ele.id
        };
      });
      dropDownResult.unshift("Please select a list",);
      setDropdownData(dropDownResult);
      console.log("dropDownResult", dropDownResult);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getDropdownData();
  }, []);

  function setSelectionFun(event) {
    setSelection(event.target.value);
  }

  function setWhatsappTemplateFun(event) {
    setWhatsappTemplatSelection(event.target.value);
  }
  const getUser = async () => {
    if (Selection !== undefined) {
      setTableLoading(false)
      setLoading(true)
      const selectedUserData = await DropdownData.filter((ele, ind) => {
        return ele.value == Selection;
      });
      var apiGetById;
      await selectedUserData.forEach((ele) => {
        apiGetById = ele.id;
      })
      try {
        const response = await axios.get(`http://139.59.0.124:8080/api/filename/${apiGetById}`);
        setUserData(response.data);
        setFilterUserData(response.data);
        setLoading(false)
        setTableLoading(true)
      } catch (error) {
        console.error(error);
      }
    } else {
      setVisible(true);
    }
  }


  useEffect(() => {
    const result = userData.filter((ele) => {
      return ele.registration_no.toLowerCase().match(search.toLowerCase()) || ele.owner_name.toLowerCase().match(search.toLowerCase()) || ele.make.toLowerCase().match(search.toLowerCase()) || ele.model.toLowerCase().match(search.toLowerCase()) || ele.od_expire_on.toLowerCase().match(search.toLowerCase());
    })
    setFilterUserData(result);
  }, [search, userData]);

  // const downloadDocument = (row) => {
  //   SetPdfData(row)
  //   setIsOpen(true);
  // }

  const whatsappShareFun = (row) => {
    SetPdfData(row);
    setIsOpen(true);
  }
  //   const whatsappMsg =
  //     `owner name : ${pdfData.owner_name}
  // mobile no : ${pdfData.mobile_no}
  // od expire : ${pdfData.od_expire_on}
  // registration no : ${pdfData.registration_no}`

  // ==================================Whatsapp All Messages=================
  const whatsappMsgOne =
    `
    Hello *${pdfData.owner_name},*

I am Amrita Banerjee from *${pdfData.cmp_name}*.

Your *${pdfData.make} ${pdfData.model}* Vehicle No. *${pdfData.registration_no}* is going to expire on *${pdfData.od_expire_on}*.

Type *Yes* to get best quotation.

`;
  const whatsappMsgTwo =
    `
    Hello *${pdfData.owner_name},*

I am Sanjeet Sah from *${pdfData.cmp_name}*.

Your *${pdfData.make} ${pdfData.model}* Vehicle No. *${pdfData.registration_no}* is going to expire on *${pdfData.od_expire_on}*.

Type *Yes* to get best quotation.

`;

  // ==================================Whatsapp All Messages=================

  const whatsappShareNow = async () => {
    const whatsappData = {
      key: 'KDTJFTGAA8MYCARDATABASEINVWOAYNDPE',
      mobileno: "8145763757", //For International use Country Code
      // mobileno: pdfData.mobile_no, //For International use Country Code
      msg: WhatsappTemplatSelection === "Whatsapp_Template_1" ? whatsappMsgOne : WhatsappTemplatSelection === "Whatsapp_Template_2" ? whatsappMsgTwo : whatsappMsgOne,
      messageType: 'regular',
      // File: 'src/assets/images/react.jpg',
      type: 'Text'
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://www.cp.bigtos.com/api/v1/sendmessage",
        data: whatsappData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setWhatsappMsgVisible(false)
      setIsOpen(false);
      Setsuccessfull(true);
    } catch (error) {
      console.log(error);
      Setsuccessfull(true);
      setIsOpen(false);
      setWhatsappMsgVisible(false)
    }
  }
  const columns = [
    {
      name: 'Registration No',
      selector: (row) => row.registration_no,
    },
    {
      name: 'Owner Name',
      selector: (row) => row.owner_name,
    },
    {
      name: 'Make',
      selector: (row) => row.make,
    },
    {
      name: 'Model',
      selector: (row) => row.model,
    },
    {
      name: 'OD Expire On',
      selector: (row) => row.od_expire_on,
    },
    // {
    //   name: 'Action',
    //   cell: (row) => <CButton color="info" onClick={() => { downloadDocument(row) }}>download</CButton>,
    // },
    {
      name: 'Print/Whatsapp',
      cell: (row) => <> <CIcon color='#075E54' icon={cilPrint} style={{ width: "20px", color: "#075E54", marginRight: "2em" }} onClick={() => { whatsappShareFun(row) }} customClassName="nav-icon" /><CIcon color='#075E54' icon={cibWhatsapp} onClick={() => whatsMsgTypeFun(row)} style={{ width: "20px", color: "#075E54" }} customClassName="nav-icon" /></>,
    },
  ];

  return (
    <>
      <CModal alignment="center" visible={whatsappMsgVisible} onClose={() => setWhatsappMsgVisible(false)}>
        <CModalHeader>
          <CModalTitle>{WhatsappTemplatSelection}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {
            WhatsappTemplatSelection === "Whatsapp_Template_1" ? `${whatsappMsgOne}` : WhatsappTemplatSelection === "Whatsapp_Template_2" ? whatsappMsgTwo : whatsappMsgOne
          }
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setWhatsappMsgVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={whatsappShareNow}>Send</CButton>
        </CModalFooter>
      </CModal>
      <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
        Please select a list
      </CAlert>
      <CAlert color="success" dismissible visible={successfull} onClose={() => Setsuccessfull(false)}>
        successfull
      </CAlert>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
          <CFormSelect
            size="sm"
            style={{ width: "300px" }}
            className="mb-3"
            aria-label="Default select example"
            options={DropdownData}
            onChange={setSelectionFun}
          />
          <button type="submit" className="uploadBtn" style={{ marginBottom: "1em", marginLeft: "1em", height: 40 }} onClick={getUser}>Search</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
          <CFormSelect
            size="sm"
            style={{ width: "300px" }}
            className="mb-3"
            aria-label="Default select example"
            options={whatsappDropdownData}
            onChange={setWhatsappTemplateFun}
          />
          {/* <button type="submit" className="uploadBtn" style={{ marginBottom: "1em", marginLeft: "1em", height: 40 }} onClick={getUser}>Search</button> */}
        </div>
      </div>
      {loading &&
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10em" }}>
          <ReactLoading className='align-center' type="spin" color="#3399FF" height={'4%'} width={'4%'} />
        </div>
      }
      {tableLoading &&
        <div style={{ position: "relative", zIndex: 0 }}>
          <DataTable
            // title="User Data"
            columns={columns}
            data={filterUserData}
            pagination
            fixedHeader
            noDataComponent="Please select a list"
            fixedHeaderScrollHeight="400px"
            highlightOnHover
            pointerOnHover
            subHeader
            subHeaderComponent={<input style={{ width: "250px", border: "1px solid #ccc", padding: "3px" }} type="text" placeholder='Search Here' value={search} onChange={(e) => setSearch(e.target.value)} />}
          />
        </div>
      }
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <ReactToPrint
            trigger={() => <button>Print</button>}
            onBeforePrint={() => setIsOpen(false)}
            content={() => componentRef.current}
            pageStyle="print"
            documentTitle={pdfData.registration_no}
          />
          <button style={{ marginLeft: "1em" }} onClick={() => setIsOpen(false)}>close</button>
          {/* <button style={{ marginLeft: "1em" }} onClick={() => whatsappShareNow()}>Whatsapp</button> */}
        </div>
        {/* <button onClick={my_print}>print</button> */}
        <div
          style={{
            position: "relative",
            zIndex: 9999
          }}
          ref={componentRef}
        >
          <div id="whole_page">
            <div className="container" id="element-to-print">
              <table className="table-3" style={{ border: "none", marginTop: "2.5em" }}>
                <tr style={{ border: "none" }}>
                  <td
                    style={{
                      textAlign: "center",
                      color: "#000",
                      fontWeight: 800,
                      fontSize: "2.4rem",
                      border: "none",
                      paddingBottom: " 0.8em",
                    }}
                    colSpan="8"
                  >
                    Best Insurance Deal
                  </td>
                </tr>
                <tr>
                  <td>Name</td>
                  <th colSpan="4" id="Name"></th>
                  <td>Date</td>
                  <th id="Date" colSpan="2"></th>
                </tr>
                <tr>
                  <td>Customer Name</td>
                  <th colSpan="4" id="Customer_Name">{pdfData.owner_name}</th>
                  <td>Mobile No</td>
                  <th id="Mobile_No" colSpan="2">{pdfData.mobile_no}</th>
                </tr>
                <tr>
                  <td>Address</td>
                  <th colSpan="4" id="Address" style={{ width: "100px" }}>{pdfData.address}</th>
                  <td>Policy Type</td>
                  <th id="Policy_Type" colSpan="2">{pdfData.policy_type}</th>
                </tr>
                <tr>
                  <td>Vehicle Type</td>
                  <th id="Vehicle_Type">{pdfData.vehicle_type}</th>
                  <td>Vehicle No.</td>
                  <th id="Vehicle_No">{pdfData.registration_no}</th>
                  <td>Make</td>
                  <th colSpan="3" id="Make">{pdfData.make}</th>
                </tr>
                <tr>
                  <td>Date of Registration</td>
                  <th id="Date_of_Registration">{pdfData.registration_date}</th>
                  <td>Fuel</td>
                  <th id="Fuel">{pdfData.fuel}</th>
                  <td>Model</td>
                  <th colSpan="3" id="Model">{pdfData.model}</th>
                </tr>
                <tr>
                  <td>CC/KW/GVW</td>
                  <th id="CC_KW_GVW">{pdfData.cubic_cap}</th>
                  <td>YOM</td>
                  <th id="YOM">{pdfData.yom}</th>
                  <td>Variant</td>
                  <th colSpan="3" id="Variant"></th>
                </tr>
                <tr>
                  <td>Period of Insurance</td>
                  <th id="Period_of_Insurance">{pdfData.insurance_from}</th>
                  <td>To</td>
                  <th id="To_date">{pdfData.od_expire_on}</th>
                  <td>Policy Number</td>
                  <th colSpan="3" id="Policy_Number">{pdfData.policy_number}</th>
                </tr>
                <tr>
                  <td>Seating Capacity</td>
                  <th id="Seating_Capacity">{pdfData.seat_cap}</th>
                  <td>Previous Add-on</td>
                  <th id="PREVIOUS_ADD_ON"></th>
                  <td>This Year Add-on</td>
                  <th colSpan="3" id="Chasis_No"></th>
                </tr>
                <tr>
                  <td>Last Year IDV</td>
                  <th id="Last_Year_IDV"></th>
                  <td>Previous NCB</td>
                  <th id="Previous_NCB"></th>
                  <td>This Year IDV</td>
                  <th colSpan="3" id="This_Year_IDV">{pdfData.this_year_idv}</th>
                </tr>
                <tr>
                  <td>Last Year Premium</td>
                  <th id="Last_Year_Premium"></th>
                  <td>This Year NCB</td>
                  <th id="This_Year_NCB"></th>
                  <td>This year Premium</td>
                  <th colSpan="3" id="This_year_Premium"></th>
                </tr>
                <tr>
                  <td>Last Year Company</td>
                  <th id="Last_Year_Company" colSpan="3">{pdfData.insurance_company_name}</th>
                  <td>This Year Company</td>
                  <th id="This_Year_Company" colSpan="3"></th>
                </tr>
                <tr>
                  <td>Dealer Name</td>
                  <th id="Dealer_Name" colSpan="3">{pdfData.dealer_name}</th>
                  <td>Location</td>
                  <th id="Location" colSpan="3">{pdfData.city}</th>
                </tr>
                <tr>
                  <td>Cashless</td>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                    />
                    <label for="vehicle1"> Bajaj</label>
                  </th>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle2"
                      name="vehicle2"
                      value="Car"
                    />
                    <label for="vehicle2"> HDFC</label>
                  </th>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                    />
                    <label for="vehicle3"> TATA</label>
                  </th>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                    />
                    <label for="vehicle3"> Reliance</label>
                  </th>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                    />
                    <label for="vehicle3"> Royal</label>
                  </th>

                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                    />
                    <label for="vehicle3"> Digit</label>
                  </th>
                  <th className="PREVIOUS_ADD_ON">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                    />
                    <label for="vehicle3"> Others</label>
                  </th>
                </tr>
                <tr style={{ height: "160px" }}>
                  <td colSpan="8">
                    <span
                      id="Followup"
                      style={{
                        marginTop: "-6em",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start !important",
                      }}
                    >Followup:</span
                    >
                  </td>
                </tr>
                <tr style={{ height: "160px" }}>
                  <td colSpan="8" style={{ textAlign: "left" }}></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Dashboard;
