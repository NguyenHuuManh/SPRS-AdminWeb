import CIcon from "@coreui/icons-react";
import {
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from "@coreui/react";
import React, { memo } from "react";
import InputMask from 'react-input-mask';
import { isEmpty } from 'lodash'

export default memo((props) => {
  const { form, field, iconName, type, placeholder, title, horizontal, maxTitle, isPhone, iconRight, format, ...remainProps } = props;
  const { name, value } = field;
  const { errors, setFieldValue } = form;
  const onChange = (values) => {
    setFieldValue(name, values.target.value);
  };

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

  const onBlur = () => {
    const valueString = value + ''
    if (isEmpty(valueString)) return;
    if (valueString.includes('_')) return setFieldValue(name, '');
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
          {isPhone && (
            <div style={{ marginRight: -1, width: "20%" }}>
              <CInputGroupPrepend style={{ width: "100%" }}>
                <CInputGroupText style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: "#FFFF", width: "100%" }} >
                  <label style={{ height: 13 }}>+84</label>
                </CInputGroupText>
              </CInputGroupPrepend>
            </div>
          )}
          <div style={{ width: `${(iconName && isPhone) ? "60%" : (iconName || isPhone ? "80%" : "100%")}` }}>
            <div style={{ width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: "#d8dbe0", borderRadius: 4, padding: 5 }}>
              <InputMask mask="9999999999" value={value}
                style={{
                  borderBlockWidth: 0,
                  border: "none",
                  outline: "none",
                  width: "100%",
                  color: "#768192"
                }}
                onChange={onChange}
                beforeMaskedValueChange={beforeMaskedValueChange}
                onBlur={onBlur}
              >
              </InputMask>
            </div>
          </div>
          {errors[name] && <div className="err-text" >{errors[name]}</div>}
        </CInputGroup>
      </div>


    </>
  );
});
