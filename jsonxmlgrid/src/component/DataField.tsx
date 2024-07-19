import { useEffect, useState } from "react";
import { ArrayDataField } from "./ArrayDataField";
import { ObjectDataField } from "./ObjectDataField";

export function DataField(props: { field: string, value: any, fieldIndex?: number, parent?: string, onlyValue?: boolean }) {
    const { field, value, parent, onlyValue, fieldIndex } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    const [valType, setValType] = useState<string>("");

    // if (fieldIndex < 1) {
    //     //style={}
    // }

    useEffect(function () {
        if (value) {
            const vT = value.constructor.name;
            setValType(vT);
        }
    }, [props.field]);

    if (onlyValue && !['Object', "Array"].includes(valType)) {
        return <>{`${value}`}</>
    }

    if (!['Object', "Array"].includes(valType)) {
        return <tr>
            <td>{field}</td>
            <td>{`${value}`}</td>
        </tr>;
    }

    return (<tr className="field">
        <td className="fieldName" style={{}}>{field}</td>
        <td className="fieldValue" style={{}}>
            {['Object'].includes(valType) && (<ObjectDataField field={field} value={value} parent={fieldPath}/>)}
            {['Array'].includes(valType) && (<ArrayDataField field={field} value={value} parent={fieldPath} />)}
        </td>
    </tr>
    )
}