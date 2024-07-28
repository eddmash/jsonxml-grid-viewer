import React, { useEffect, useState } from "react";
import { DataField, DataFieldTypeProps } from "./DataField";
import { isComplex } from "../utility/toJson";

export function ArrayDataField(props: DataFieldTypeProps) {
    const { field, value, parent, label, renderLayout } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`

    const [arrayFields, setArrayFields] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);
    useEffect(function () { console.log("ArrayDataField:Onload inside") }, [])

    useEffect(function () {
        refreshData(value);
    }, [value]);

    const refreshData = (val: any) => {
        console.log("ArrayDataField: data", val)
        const tmp = value || [];
        if (Array.isArray(tmp)) {
            const keys: any[] = tmp.flatMap((ob: any) => Object.keys(ob));
            setArrayFields(Array.from(new Set<any[]>(keys)))
            setData(tmp)
        }
    }

    const OnShow = (e: any) => {
        setShow(!show)
    }

    return (<>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="nested-value" onClick={OnShow}>{!show ? `[+]` : `[-]`} {label} {`[${value.length}]`}</div>
        </div>

        {show && (<div className="wrapper list">
            <table className="data">
                {isComplex(data[0]) && (<thead>
                    <tr className="columns" >
                        <td className="field-name">#</td>
                        {arrayFields.map(key => {
                            return (<td className="field-name" key={key}>{key}</td>);
                        })}
                    </tr>
                </thead>)}
                <tbody>
                    {data.map((tRecord: any, roidx: number) => {
                        return (
                            <tr key={roidx}>
                                <td>{roidx + 1}</td>
                                {!isComplex(tRecord) && (<td>{`${tRecord}`}</td>)}
                                {isComplex(tRecord) && arrayFields.map((col: string, index: number) => {
                                    return (<td key={`${roidx}-${index}`}>
                                        <DataField parent={`${fieldPath}[${index}]`}
                                            field={col}
                                            label={col}
                                            value={tRecord[col]}
                                            onlyValue={true}
                                            fieldIndex={index} />
                                    </td>);
                                })}
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>)}
    </>)
}