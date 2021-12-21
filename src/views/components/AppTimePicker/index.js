import CIcon from "@coreui/icons-react";
import {
    CInputGroup, CInputGroupPrepend, CInputGroupText
} from "@coreui/react";
import moment from 'moment';
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import InputMask from 'react-input-mask';
import dateIcon from "../../../assets/icons/date.svg";

const months = [
    "Tháng 01",
    "Tháng 02",
    "Tháng 03",
    "Tháng 04",
    "Tháng 05",
    "Tháng 06",
    "Tháng 07",
    "Tháng 08",
    "Tháng 09",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
];
const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const locale = {
    localize: {
        month: (n) => months[n],
        day: (n) => days[n],
    },
    formatLong: {},
}
const AppTimePicker = (props) => {
    const { form, field, iconName, type, placeholder, title, horizontal, maxTitle, isPhone, minDate, maxDate, formatDate, disabled, ...remainProps } = props;
    const { name, value } = field;
    const { errors, touched, setFieldValue } = form;
    const [openDatePicker, setOpenDatePicker] = useState(false);
    // const [startDate, setStartDate] = useState(new Date());
    const onchange = (value) => {
        setFieldValue(name, moment(value).format(formatDate ? formatDate : "DD-MM-YYYY HH:mm"));
    }

    const onBlur = () => {
        if (value.includes("_")) {
            setFieldValue(name, '');
            return;
        }
        setFieldValue(name, value);
    }

    const onChange = (values) => {
        const value = values.target.value;
        if (value && value.length == (formatDate ? 10 : 16) && !value.includes("_")) {
            const dateInput = moment(value, formatDate ? formatDate : "DD-MM-YYYY HH:mm");
            if (dateInput.isValid()) {
                if (minDate && dateInput.isBefore(minDate)) {
                    setFieldValue(name, moment(minDate).format("DDMMYYYY"));
                }
                if (maxDate && dateInput.isAfter(maxDate)) {
                    setFieldValue(name, moment(maxDate).format("DDMMYYYY"));
                }
                setFieldValue(name, value);
            } else {
                setFieldValue(name, '')
                return
            }
        }
        setFieldValue(name, value)
    }

    const beforeMaskedValueChange = (newState, oldState, userInput) => {
        var { value } = newState;
        var selection = newState.selection;
        var cursorPosition = selection ? selection.start : null;

        // keep minus if entered by user
        if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
            if (cursorPosition === value.length) {
                cursorPosition--;
                selection = { start: cursorPosition, end: cursorPosition };
            }
            value = value.slice(0, -1);
        }

        return {
            value,
            selection
        };
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

                        <div style={{ width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#d8dbe0", borderRadius: 4, display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
                            <InputMask mask={formatDate ? "99-99-9999" : "99-99-9999 99:99"} value={value}
                                style={{
                                    borderBlockWidth: 0,
                                    border: "none",
                                    outline: "none",
                                    width: "100%",
                                    color: "#768192",
                                    textOverflow: 'ellipsis'
                                }}
                                onChange={onChange}
                                beforeMaskedValueChange={beforeMaskedValueChange}
                                onBlur={onBlur}
                                disabled={disabled}
                            >
                            </InputMask>
                            <label>
                                <span className="calender-icon" onClick={() => {
                                    if (disabled) return;
                                    setOpenDatePicker(true)
                                }
                                }>
                                    <img src={dateIcon} height="20px" width="20px" alt="" />
                                </span>
                            </label>
                        </div>

                        {errors[name] && <div className="err-text" >{errors[name]}</div>}
                    </div>
                    {openDatePicker && (
                        <DatePicker
                            {...remainProps}
                            closeOnScroll={(e) => e.target === document}
                            selected={moment(value, formatDate ? formatDate : "DD-MM-YYYY HH:mm").isValid() ? moment(value, formatDate ? formatDate : "DD-MM-YYYY HH:mm").toDate() : moment().toDate()}
                            onChange={(date) => onchange(date)}
                            dateFormat={formatDate ? "dd-MM-yyyy" : "dd-MM-yyyy HH:mm"}
                            value={value}
                            customInput={<div style={{ display: 'none' }} />}
                            // showTimeInput
                            open={true}
                            onClickOutside={() => setOpenDatePicker(false)}
                            autoComplete="off"
                            disabled={disabled}
                        />
                    )}
                </CInputGroup>

            </div>
        </>
    )
}
export default AppTimePicker