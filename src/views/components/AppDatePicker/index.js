import CIcon from "@coreui/icons-react";
import {
    CInputGroup, CInputGroupPrepend, CInputGroupText
} from "@coreui/react";
import moment from 'moment';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
const AppDatePicker = (props) => {
    const { form, field, iconName, type, placeholder, title, horizontal, maxTitle, isPhone, ...remainProps } = props;
    const { name, value } = field;
    const { errors, touched, setFieldValue } = form;
    const [startDate, setStartDate] = useState(new Date());
    const onchange = (value) => {
        if (moment(value).format("DD-MM-YYYY") + "" === "Invalid date") {
            setFieldValue(name, "");
            return;
        }
        setFieldValue(name, value);
        setStartDate(value);
    }

    const onBlur = () => {
        if (moment(value).format("DD-MM-YYYY") + "" === "Invalid date") {
            setFieldValue(name, "");
        }
    }


    return (
        <>
            {(!horizontal) && title && (
                <label className="inputTitle">{title}</label>
            )}
            <div style={{ display: "flex" }}>
                {
                    horizontal && (
                        <label className="inputTitle" style={{ width: maxTitle || 150 }}>{title}</label>
                    )
                }
                <CInputGroup className="mb-3" style={{ display: "flex" }}>
                    {
                        iconName && (
                            <div style={{ marginRight: -1, width: "20%" }}>

                                <CInputGroupPrepend style={{ width: "100%" }}>
                                    <CInputGroupText style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: "100%", display: "flex", justifyContent: "center" }} >
                                        <CIcon name={iconName} height={21} />
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                            </div>
                        )
                    }

                    <div style={{ width: `${(iconName && isPhone) ? "60%" : (iconName ? "80%" : "100%")}` }}>
                        <DatePicker
                            {...remainProps}
                            id="date_picker_id"
                            closeOnScroll={(e) => e.target === document}
                            selected={startDate}
                            onChange={(date) => onchange(date)}
                            dateFormat="dd-MM-yyyy"
                            className=" form-control Date-Picker"
                            placeholderText="dd/mm/yyyy"
                            value={value}
                            onBlur={onBlur}
                        />
                        {errors[name] && <div className="err-text" >{errors[name]}</div>}
                    </div>
                </CInputGroup>
            </div>
        </>
    )
}
export default AppDatePicker