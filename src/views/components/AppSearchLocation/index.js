/*
 * /api/danh-muc-dan-toc
 * danh mục đơn vị
 */
import { debounce, isEmpty } from "lodash-es";
import React, { memo, useCallback, useEffect, useState } from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import { apiPlaceAutoComplete } from "src/apiFunctions/mapPlace";
import AppSelect from "../AppSelect";
import searchIcon from "../../../assets/icons/search-location-solid.svg";

interface Props extends SelectProps<OptionTypeBase> {
    title?: string;
    horizontal?: boolean;
    options?: Array<{
        label: string,
        value: any,
    }>;
    dropDownIcon?: boolean;
    isFormik?: boolean;
    defaultKey?: any;
    disabled?: any;
    functionProps?: any;
    mapRef?: any;
}

export default memo((props: Props) => {
    const {
        title,
        defaultKey,
        isFormik,
        form,
        field,
        donViId,
        phongBanId,
        disabled,
        idTinh,
        functionProps,
        mapRef,
        ...remainProps

    } = props;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const callAutoComplete = (key) => {
        if (isEmpty(key)) return;
        apiPlaceAutoComplete(key)
            .then(res => {
                if (res.status !== 200) {
                    return;
                }

                return res.json();
            })
            .then((e) => {
                if (e?.status == "OK") {
                    setData(e.predictions);
                }
            })
    }

    useEffect(() => {
        console.log("defau", defaultKey)
        callAutoComplete(defaultKey || "H");
    }, []);

    const debounceDropDown = useCallback(debounce((nextValue) => callAutoComplete(nextValue), 150), [])

    const onInputChange = (e) => {
        debounceDropDown(e);
    }

    const selectedOption =
        field && data?.find((option) => option?.place_id == field?.value);

    const patchedOnChange = (selectedOption) => {
        //
        const selectedValue = selectedOption ? selectedOption.place_id : selectedOption;

        const changeEvent = {
            target: {
                name: field.name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
        functionProps && functionProps(selectedOption);
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
                        getOptionLabel={(item) => item.description}
                        getOptionValue={(item) => item.place_id}
                        error={form.errors[field.name]}
                        touched={form.touched[field.name]}
                        icon={searchIcon}
                        onInputChange={onInputChange}
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
                getOptionLabel={(item) => item.description}
                getOptionValue={(item) => item.id}
                onInputChange={onInputChange}
                icon={searchIcon}
                {...remainProps}
            />
        );
    };
    return renderSelectType();
});
