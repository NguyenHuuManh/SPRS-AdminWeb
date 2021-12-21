import React, { Fragment } from "react";
import Select, { components } from "react-select";
import { Label } from "reactstrap";
import logoDown from "../../../assets/icons/arrow-down.svg";
// import logoDown from "../../../assets/icons/search-location-solid.svg";


const optionssss = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

export default React.memo((props) => {
    const {
        title,
        options,
        horizontal,
        isRequired,
        dropDownIcon,
        error,
        touched,
        isClearable,
        refs,
        onChange,
        getOptionLabel,
        getOptionValue,
        disabled,
        value,
        onInputChange,
        positionMenu,
        placeholder,
        width40,
        onBlur,
        icon,
        maxTitle,
        ...remainProps
    } = props;

    const customStyles = {
        // Nếu có ...provider thì sẽ mặc định style cũ
        control: (provided, state) => ({
            ...provided,
            borderColor: "#f8f8f8",
            minHeight: "30px",
            height: "30px",
            boxShadow: state.isFocused
                ? `0 0 0 0.2rem rgba(0, 123, 255, 0.25)`
                : null,
            border: "none",
            background: "#f8f8f8",
            borderRadius: 0,
            borderBottom: "1px solid #bfbfbf",
        }),

        valueContainer: (provided, state) => {
            return {
                ...provided,
                height: "30px",
                padding: "0 6px",
                background: "#f8f8f8",
                // borderBottom: "1px solid #bfbfbf",
                borderBottom: state.isDisabled ? 0 : "1px solid #bfbfbf",
            };
        },
        menu: (provided, state) => ({
            ...provided,
            zIndex: 200,
        }),
        option: (provided, state) => ({
            ...provided,
        }),
        input: (provided, state) => ({
            ...provided,
            margin: "0px",
            width: "auto",
            color: "red"
        }),
        indicatorSeparator: (provided, state) => ({
            // Thanh phân cách giữa input và nút xuống
            display: "none",
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: "30px",
            background: "#f8f8f8",
            borderBottom: state.isDisabled ? 0 : "1px solid #bfbfbf",
        }),
        dropdownIndicator: (state) => ({
            // Mũi tên trỏ xuống
            // display: dropDownIcon ? "none" : "block",
            margin: "6px",
            background: "#f8f8f8",
        }),
        loadingIndicator: (provided, state) => ({
            // loading style
            ...provided,
        }),
        singleValue: (provided, state) => ({
            ...provided,
        }),
    };

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                {icon ? (
                    <img src={icon} width="20px" alt="..." />
                ) : (
                    <img src={logoDown} width="8px" alt="..." />
                )}
            </components.DropdownIndicator>
        );
    };
    return (
        <div
            style={{ width: width40 ? "40%" : "", marginBottom: 20 }}
        >
            {(!horizontal) && title && (
                <label className="inputTitle">{title}</label>
            )}
            <div className="cccd-custom-select d-flex">
                {
                    horizontal && (
                        <label className="inputTitle" style={{ width: maxTitle || 150 }}>{title}</label>
                    )
                }
                <div style={{ width: "100%" }}>
                    <Select
                        {...remainProps}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={getOptionValue}
                        ref={refs && refs}
                        placeholder={placeholder || ""}
                        options={options || []}
                        isClearable={isClearable === false ? isClearable : true}
                        noOptionsMessage={() => "Không có dữ liệu"}
                        loadingMessage={() => "Đang tải dữ liệu"}
                        menuPosition={positionMenu}
                        onChange={onChange}
                        onBlur={onBlur}
                        isDisabled={disabled}
                        onInputChange={onInputChange}
                        value={value}
                        components={{ DropdownIndicator }}
                    />
                    {error && horizontal && touched && <div className="err-text" style={{ marginLeft: 0 }}>{error}</div>}
                </div>
            </div>
            {(error && touched && !horizontal) && <div className="err-text" style={{ marginLeft: 0 }}>{error}</div>}
        </div>
    );
});
