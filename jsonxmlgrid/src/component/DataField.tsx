import { useEffect, useState } from "react";
import { ArrayDataField } from "./ArrayDataField";
import { ObjectDataField } from "./ObjectDataField";

interface DataFieldProps {
    label: string;
    field?: string;
    value: any;
    fieldIndex?: number;
    parent?: string;
    onlyValue?: boolean;
    renderLayout?: DATA_LAYOUT;
}

export type DATA_LAYOUT = "Array" | "Object";
export function DataField(props: DataFieldProps) {
    const { field, value, renderLayout, ...rest } = props
    const [valType, setValType] = useState<string>("");
    const [record, setRecord] = useState<any>();
    useEffect(function () {
        console.log(`DataField: inside>>>> ${field}: ${renderLayout}`, props)
        // setValType(renderLayout || "")
    }, [renderLayout])

    useEffect(function () {
        if (value) {
            let vT = value.constructor.name;
            setValType(vT);
        }
        setRecord(value);
    }, [value]);



    const onLayoutChange = (field: string, targetLayout: DATA_LAYOUT) => {

    }
    return <DataFieldType field={field} valueType={valType} value={record} renderLayout={renderLayout}
        onLayoutChange={onLayoutChange} {...rest} />
}

export type DataFieldTypeProps = DataFieldProps & {
    valueType: string;
    onLayoutChange?: (field: string, targetLayout: DATA_LAYOUT) => void;
};

function DataFieldType(props: DataFieldTypeProps) {
    const { field, value, parent, onlyValue, valueType, ...rest } = props
    useEffect(function () {
        console.log(`DataFieldType: Data to render =`, value)
    }, [])
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    if (!field || onlyValue) {
        switch (valueType) {
            case "Object": {
                return (<ObjectDataField field={field} value={value} valueType={valueType}
                    parent={fieldPath} {...rest} />);
            }
            case "Array": {
                return (<ArrayDataField field={field} value={value} valueType={valueType}
                    parent={fieldPath} {...rest} />);
            }
            default: {
                return <>{value ? `${value}` : ''}</>
            }
        }
    }

    if (!['Object', "Array"].includes(valueType)) {
        return <>{value ? `${value}` : ''}</>
    }
    return (<>
        {['Object'].includes(valueType) && (<ObjectDataField field={field}
            value={value}
            parent={fieldPath}
            valueType={valueType}
            {...rest} />)}
        {['Array'].includes(valueType) && (<ArrayDataField field={field}
            value={value}
            valueType={valueType}
            {...rest} />)}
    </>
    )
}