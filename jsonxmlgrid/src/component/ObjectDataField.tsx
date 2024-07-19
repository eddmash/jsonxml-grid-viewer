import { useState } from "react"
import { DataField } from "./DataField"

export function ObjectDataField(props: {
    field: string
    value: any
    parent?: string
}){
    const { field, value, parent } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    const [show, setShow] = useState<boolean>(false);

    const OnShow = (e: any) => {
        setShow(!show)
    }
    return (<>
        <div onClick={OnShow}  id={fieldPath}>Object {!show ? `{ + }` : `{-`} </div>
        {show &&(<div id={`${fieldPath}-data`} className="wrapper">
            <table>
                {Object.keys(value).map((key: string, index: number) => {
                    const subVal: any = value[key];
                    return (<DataField field={key} value={subVal} parent={fieldPath} fieldIndex={index} />);
                })}
            </table>
        </div>)}
    </>);
}