import { useEffect, useState } from "react";
import { DataField } from "./DataField";

export function ArrayDataField(props: {
    field: string
    value: any
    parent?: string
}) {
    const { field, value, parent } = props
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

    return (<><div onClick={OnShow} id={fieldPath}>Array {!show ? `[ + ]` : `[ -`}</div>
        {show && (<div id={`${fieldPath}-data`} className="wrapper">
            <table >
                <tr className="columns" >
                    {arrayFields.map(key => {
                        return (<td style={{}}>{key}</td>);
                    })}
                </tr>
                {value.map((tRecord: any) => {
                    return (
                        <tr className="data">
                            {arrayFields.map((col: string, index: number) => {
                                return (<td style={{}}>
                                    <DataField parent={`${fieldPath}[${index}]`} field={col} value={tRecord[col]} onlyValue={true}
                                        fieldIndex={index} />
                                </td>);
                            })}
                        </tr>)
                })}
            </table>
        </div>)}
    </>)
}