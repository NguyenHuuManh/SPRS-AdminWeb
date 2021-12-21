import CIcon from "@coreui/icons-react";
import {
  CButton,
  CCard
} from "@coreui/react";
import { isEmpty } from "lodash";
import React, { memo, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { appToast } from "../AppToastContainer";
import imageDefault from "../../../assets/images/imagesDefault.png";

export default memo(({ imageUrl, image, setImage, disabled }) => {
  const onChange = (event) => {
    readImage(event)
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataImage = reader.result?.toString().split(",")[1];
      setImage({ base64: dataImage, file: file });
    };
    reader.onerror = function (error) { };
  }

  const readImage = (event) => {
    var file = event.currentTarget.files[0]
    if (Math.round(file.size / 1048576) > 3) {
      appToast({
        description: "file không được vượt quá " + 3 + "MB",
        toastOptions: { type: "error" },
      });
      return;
    }
    getBase64(file);
  };
  // console.log('value', image);
  const inputFile = useRef(null);
  const chooseFile = () => {
    inputFile.current.value = "";
    inputFile.current.click();
  };
  return (
    <div style={{ width: "100%", display: "flex", height: '100%' }}>
      <CCard style={{ width: "100%", height: '100%' }}>
        {isEmpty(image) && !imageUrl && (
          <img
            src={imageDefault}
            alt=""
            style={{ height: '100%', width: "auto" }}
          />
        )}
        {isEmpty(image) && imageUrl && (
          <img
            src={imageUrl}
            alt=""
            style={{ height: '100%', width: 'auto' }}
          />
        )}
        {!isEmpty(image) && (
          <img
            src={`data:image/png;base64,${image.base64}`}
            alt=""
            style={{ height: '100%', width: 'auto' }}
          />
        )}
        {!disabled && (
          <CButton onClick={chooseFile} style={{ position: "absolute", bottom: 1, right: 1 }} color="secondary">
            <FaCamera size={20} />
          </CButton>
        )}

      </CCard>

      <input type="file"
        accept="image/png, image/jpeg"
        onChange={onChange}
        ref={inputFile}
        value={null}
        style={{ display: "none" }}
      />
    </div>
  );
});
