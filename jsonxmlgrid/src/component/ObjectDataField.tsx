import { useEffect, useState } from "react"
import { DATA_LAYOUT, DataField, DataFieldTypeProps } from "./DataField"
import { isComplex } from "../utility/toJson";

export function ObjectDataField(props: DataFieldTypeProps) {
    const { field, value, parent, label, onLayoutChange, renderLayout, ...rest } = props
    const fieldPath = `${parent ? parent + '.' : ''}${field}`
    const [show, setShow] = useState<boolean>(false);

    useEffect(function () { console.log("ObjectDataField: inside") }, [])

    const OnShow = (e: any) => {
        setShow(!show)
    }

    return (<>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="nested-value" onClick={OnShow}>{!show ? `[+]` : `[-]`} {label} {`{}`} </div>
        </div>
        {show && value && (<div className="wrapper object">
            <table className="data">
                <tbody>
                    {Object.keys(value).map((key: string, index: number) => {
                        const subVal: any = value[key];
                        return (
                            <>
                                <Row key={key}
                                    field={key}
                                    label={key}
                                    value={subVal}
                                    parent={fieldPath}
                                    fieldIndex={index}
                                    onlyValue={!field}
                                    renderLayout={renderLayout}
                                    {...rest} /></>
                        );
                    })}
                </tbody>
            </table>
        </div>)}
    </>);
}

function Row(props: DataFieldTypeProps) {
    const { valueType, renderLayout, value, ...rest } = props
    const [toggleLayout, setToggleLayout] = useState<boolean>(false);
    const [layout, setLayout] = useState<DATA_LAYOUT | undefined>(renderLayout);

    useEffect(function () {
        setLayout(toggleLayout ? "Array" : "Object")
    }, [toggleLayout])
    return <tr key={props.fieldIndex}>
        <td className="field-name">
            <div style={{ display: "flex", flexDirection: "row", cursor:"pointer" }} onClick={e => {
                setToggleLayout(!toggleLayout)
            }}>
                <div>{props.field}</div>
                {isComplex(value) && (<>
                    {!toggleLayout && (<div className="icon"><i className="codicon codicon-json small"></i></div>)}
                    {toggleLayout && (<div className="icon"><i className="codicon codicon-table"></i></div>)}
                </>)}
            </div>
        </td>
        <td>
            <DataField  {...rest}
                value={layout === "Array" ? [value] : value}
                renderLayout={layout} />
        </td>
    </tr>
}