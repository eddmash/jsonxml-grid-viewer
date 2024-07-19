import { XMLParser } from "fast-xml-parser";

export function smartJsonConverter(input: { content: any, fileName: string }) {
    console.log("co", input)
    if (input.fileName.endsWith("json")) {
        return JSON.parse(input.content);
    }
    if (input.fileName.endsWith("xml")) {
        return xmlparse(input.content);
    }

    return "Only support XML/JSON";
}

function xmlparse(content: any) {
    // const parser = new DOMParser();
    // const xmlDoc = parser.parseFromString(content, 'application/xml');
    // return xml2json(xmlDoc);
    const parser = new XMLParser();
    return parser.parse(content);
}