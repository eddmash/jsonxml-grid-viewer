import { useEffect, useState } from "react";
import { ArrayDataField } from "./ArrayDataField";
import { ObjectDataField } from "./ObjectDataField";

export function DataField(props: {
    label: string,
    field?: string,
    value: any,
    fieldIndex?: number, parent?: string, onlyValue?: boolean
}) {
    const { field, value, parent, onlyValue, label } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    const [valType, setValType] = useState<string>("");

    useEffect(function () {
        if (value) {
            const vT = value.constructor.name;
            setValType(vT);
        }
    }, [props.field]);

    if (!field || onlyValue) {
        switch (valType) {
            case "Object": {
                return (<ObjectDataField field={field} label={label} value={value} parent={fieldPath} />);
            }
            case "Array": {
                return (<ArrayDataField field={field} label={label} value={value} parent={fieldPath} />);
            }
            default: {
                return <>{value ? `${value}` : ''}</>
            }
        }
    }

    if (!['Object', "Array"].includes(valType)) {
        return <>{value ? `${value}` : ''}</>
    }

    return (<>
        {['Object'].includes(valType) && (<ObjectDataField field={field} label={label} value={value} parent={fieldPath}
            isComplex={['Object', "Array"].includes(valType)} />)}
        {['Array'].includes(valType) && (<ArrayDataField field={field} label={label} value={value} parent={fieldPath} />)}
    </>
    )
}