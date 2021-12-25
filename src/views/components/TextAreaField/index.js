import CIcon from "@coreui/icons-react";
import {
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CTextarea
} from "@coreui/react";
import React, { memo, useState } from "react";

export default memo((props) => {
  const { form, field, iconName, type, placeholder, title, horizontal, maxTitle, iconRight, disabled, ...remainProps } = props;
  const { name, value } = field;
  const { errors, touched, setFieldValue } = form;
  const onChange = (values) => {
    setFieldValue(name, values.target.value);
  };
  const [security, setSecurity] = useState(true);
  return (
    <>
      {(!horizontal) && title && (
        <label className="inputTitle">{title}</label>
      )}
      <div style={{ display: "flex", height: `${horizontal ? "100%" : "80%"}` }}>
        {
          horizontal && (
            <label className="inputTitle" style={{ width: maxTitle || 150 }}>{title}</label>
          )
        }
        <CInputGroup style={{ display: "flex", marginBottom: 0, height: "100%" }}>
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
          <div style={{ width: `${iconName ? "60%" : (iconName || type == "password" ? "80%" : "100%")}`, height: "100%" }}>
            <CTextarea
              style={{ borderRadius: 5, height: "100%", backgroundColor: disabled ? 'rgba(250, 250, 250,1)' : '#FFFF' }}
              {...remainProps}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              disabled={disabled}
            />
            {errors[name] && <div className="err-text" >{errors[name]}</div>}
          </div>
        </CInputGroup>
      </div>


    </>
  );
});
