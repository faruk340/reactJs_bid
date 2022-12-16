import React from 'react';
import "../../scss/Pdf.css";
const Pdf = () => {
    return (
        <div id="whole_page">
            <div className="container" id="element-to-print">
                <table className="table-3" style={{ border: "none" }}>
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
                            colspan="8"
                        >
                            Best Insurance Deal
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <th colspan="4" id="Name"></th>
                        <td>Date</td>
                        <th id="Date" colspan="2"></th>
                    </tr>
                    <tr>
                        <td>Customer Name</td>
                        <th colspan="4" id="Customer_Name"></th>
                        <td>Mobile No</td>
                        <th id="Mobile_No" colspan="2"></th>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <th colspan="4" id="Address"></th>
                        <td>Policy Type</td>
                        <th id="Policy_Type" colspan="2"></th>
                    </tr>
                    <tr>
                        <td>Vehicle Type</td>
                        <th id="Vehicle_Type"></th>
                        <td>Vehicle No.</td>
                        <th id="Vehicle_No"></th>
                        <td>Make</td>
                        <th colspan="3" id="Make"></th>
                    </tr>
                    <tr>
                        <td>Date of Registration</td>
                        <th id="Date_of_Registration"></th>
                        <td>Fuel</td>
                        <th id="Fuel"></th>
                        <td>Model</td>
                        <th colspan="3" id="Model"></th>
                    </tr>
                    <tr>
                        <td>CC/KW/GVW</td>
                        <th id="CC_KW_GVW"></th>
                        <td>YOM</td>
                        <th id="YOM"></th>
                        <td>Variant</td>
                        <th colspan="3" id="Variant"></th>
                    </tr>
                    <tr>
                        <td>Period of Insurance</td>
                        <th id="Period_of_Insurance"></th>
                        <td>To</td>
                        <th id="To_date"></th>
                        <td>Policy Number</td>
                        <th colspan="3" id="Policy_Number"></th>
                    </tr>
                    <tr>
                        <td>Seating Capacity</td>
                        <th id="Seating_Capacity"></th>
                        <td>Previous Add-on</td>
                        <th id="PREVIOUS_ADD_ON"></th>
                        <td>This Year Add-on</td>
                        <th colspan="3" id="Chasis_No"></th>
                    </tr>
                    <tr>
                        <td>Last Year IDV</td>
                        <th id="Last_Year_IDV"></th>
                        <td>Previous NCB</td>
                        <th id="Previous_NCB"></th>
                        <td>This Year IDV</td>
                        <th colspan="3" id="This_Year_IDV"></th>
                    </tr>
                    <tr>
                        <td>Last Year Premium</td>
                        <th id="Last_Year_Premium"></th>
                        <td>This Year NCB</td>
                        <th id="This_Year_NCB"></th>
                        <td>This year Premium</td>
                        <th colspan="3" id="This_year_Premium"></th>
                    </tr>
                    <tr>
                        <td>Last Year Company</td>
                        <th id="Last_Year_Company" colspan="3"></th>
                        <td>This Year Company</td>
                        <th id="This_Year_Company" colspan="3"></th>
                    </tr>
                    <tr>
                        <td>Dealer Name</td>
                        <th id="Dealer_Name" colspan="3"></th>
                        <td>Location</td>
                        <th id="Location" colspan="3"></th>
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
                        <td colspan="8">
                            <span
                                id="Followup"
                                style={{
                                    marginTop: "-3em",
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
                        <td colspan="8" style={{ textAlign: "left" }}></td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Pdf;
