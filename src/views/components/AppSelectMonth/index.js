/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import { isEmpty } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import AppSelect from "../AppSelect";

interface Props extends SelectProps<OptionTypeBase> {
    title?: string;
    horizontal?: boolean;
    options?: Array<{
        label: string,
        value: any,
    }>;
    dropDownIcon?: boolean;
    isFormik?: boolean;
    defaultValue?: any;
    disabled?: any;
    functionProps?: any;
}
const dummy = [
    { id: '1', name: "Tháng 1" },
    { id: '2', name: "Tháng 2" },
    { id: '3', name: "Tháng 3" },
    { id: '4', name: "Tháng 5" },
    { id: '5', name: "Tháng 5" },
    { id: '6', name: "Tháng 6" },
    { id: '7', name: "Tháng 7" },
    { id: '8', name: "Tháng 8" },
    { id: '9', name: "Tháng 9" },
    { id: '10', name: "Tháng 10" },
    { id: '11', name: "Tháng 11" },
    { id: '12', name: "Tháng 12" },
]
export default memo((props: Props) => {
    const {
        title,
        defaultValue,
        isFormik,
        form,
        field,
        donViId,
        phongBanId,
        disabled,
        idTinh,
        functionProps,
        year,
        ...remainProps
    } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const yearString = year + ''
        if (isEmpty(yearString + '') || yearString.includes("_")) {
            setData([])
        };
        if (yearString && Number(yearString) > 1000) {
            setData(dummy);
        }
    }, [year])

    const selectedOption =
        field && data?.find((option) => option?.id == field?.value);
    const selectedDefault = data?.find(
        (option) => option?.values == defaultValue
    );

    const patchedOnChange = (selectedOption) => {
        //
        const selectedValue = selectedOption ? selectedOption.id : selectedOption;

        const changeEvent = {
            target: {
                name: field.name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
        functionProps && functionProps({ ...selectedOption });
    };

    const renderSelectType = () => {
        if (field) {
            return (
                <>
                    <AppSelect
                        {...field}
                        id={field.name}
                        title={title}
                        value={selectedOption || ""}
                        onChange={patchedOnChange}
                        options={data}
                        getOptionLabel={(item) => item.name}
                        getOptionValue={(item) => item.id}
                        error={form.errors[field.name]}
                        touched={form.touched[field.name]}
                        {...remainProps}
                        disabled={disabled}
                    />
                </>
            );
        }

        return (
            <AppSelect
                options={data}
                title={props.title}
                value={selectedDefault}
                getOptionLabel={(item) => item.name}
                getOptionValue={(item) => item.id}
                {...remainProps}
            />
        );
    };
    return renderSelectType();
});
