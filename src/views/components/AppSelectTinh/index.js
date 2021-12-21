/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import React, { memo, useEffect, useState } from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import { apiCity } from "src/apiFunctions/mapPlace";
import { DiaChinh } from "src/helps/data";
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
        ...remainProps
    } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const callGetTinh = () => {
        apiCity().then((res) => {
            if (res?.status == 200) {
                if (res.data.code == "200") {
                    setData(res?.data?.obj);
                }
                return;
            }
        })
    }

    useEffect(() => {
        callGetTinh();
    }, []);

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
                        isLoading={loading}
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
                isLoading={loading}
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
