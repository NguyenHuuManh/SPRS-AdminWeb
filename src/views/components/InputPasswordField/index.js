import CIcon from "@coreui/icons-react";
import {
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText
} from "@coreui/react";
import React, { memo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default memo((props) => {
  const { form, field, iconName, type, placeholder, title, horizontal, maxTitle, isPhone, iconRight, leftView, isPassword, disabled, ...remainProps } = props;
  const { name, value } = field;
  const { errors, touched, setFieldValue } = form;
  const onChange = (values) => {
    setFieldValue(name, values.target.value);
  };
  const [security, setSecurity] = useState(false);
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
        <CInputGroup className="mb-3" style={{ display: "flex" }} >
          <div style={{ width: `100%` }}>
            <CInput
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: disabled ? 'rgba(250, 250, 250,1)' : '#FFFF' }}
              {...remainProps}
              type={security ? 'password' : 'text'}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              disabled={disabled}
            />
            {errors[name] && <div className="err-text" >{errors[name]}</div>}
          </div>
          {
            isPassword && (
              <div style={{ position: 'absolute', top: 5, right: 10 }}>
                {security ? (
                  <FaEye size={21} height={'100%'} onClick={() => { setSecurity(!security) }} />
                ) : (
                  <FaEyeSlash size={21} height={'100%'} onClick={() => { setSecurity(!security) }} />
                )}
              </div>
            )
          }
        </CInputGroup>
      </div>
    </>
  );
});
