import { useEffect, useState } from "react";
import { DataField } from "./DataField";

export function ArrayDataField(props: {
    field?: string
    label: string
    value: any
    parent?: string
}) {
    const { field, value, parent, label } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`

    const [arrayFields, setArrayFields] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);


    useEffect(function () {
        if (value) {
            const keys: any[] = value.flatMap((ob: any) => Object.keys(ob));
            const x = new Set<any[]>(keys);
            setArrayFields(Array.from(x))
        }
    }, [props.field]);

    const OnShow = (e: any) => {
        setShow(!show)
    }

    return (<>
        <div className="nested-value" onClick={OnShow}>{!show ? `[+]` : `[-]`} {label} {`[${value.length}]`} </div>
        {show && (<div className="wrapper list">
            <table >
                <thead>
                    <tr className="columns" >
                        <td className="field-name">filter</td>
                        {arrayFields.map(key => {
                            return (<td className="field-name">{key}</td>);
                        })}
                    </tr>
                </thead>
                {value.map((tRecord: any, roidx: number) => {
                    return (
                        <tr className="data">
                            <td>{roidx + 1}</td>
                            {arrayFields.map((col: string, index: number) => {
                                return (<td>
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
            </table>
        </div>)}
    </>)
}