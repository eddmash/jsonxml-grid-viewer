import { useState } from "react"
import { DataField } from "./DataField"

export function ObjectDataField(props: {
    label: string
    field?: string
    value: any
    parent?: string
    isComplex?: boolean
}) {
    const { field, value, parent, label, isComplex } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    const [show, setShow] = useState<boolean>(false);

    const OnShow = (e: any) => {
        setShow(!show)
    }
    if (!field) {
        return <table className="data">
            {Object.keys(value).map((key: any, index: number) => {
                const inVal = value[key];
                return (<tr>
                    <td className="field-name">{key}</td>
                    <td>
                        <DataField field={key} label={key} value={inVal}
                            parent={fieldPath} fieldIndex={index} onlyValue={true} />
                    </td>
                </tr>)
            })}
        </table>
    }
    return (<>
        <div className="nested-value" onClick={OnShow}>{!show ? `[+]` : `[-]`} {label} {`{}`} </div>
        {show && (<div className="wrapper object">
            <table>
                {Object.keys(value).map((key: string, index: number) => {
                    const subVal: any = value[key];
                    return (
                        <tr>
                            <td className="field-name">{key}</td>
                            <td><DataField field={key} label={key} value={subVal} parent={fieldPath} fieldIndex={index} /></td>
                        </tr>
                    );
                })}
            </table>
        </div>)}
    </>);
}