import { XMLParser } from "fast-xml-parser";

/**
 * Based on the language of the content. parse the content
 * @param input 
 * @returns 
 */
export function smartJsonConverter(input: { content: any, languageId: string }) {

    switch (input.languageId) {
        case "xml": {
            return xmlparse(input.content);
        }
        case "json": {
            return JSON.parse(input.content);
        }
        default: {
            return "Only support XML/JSON";
        }
    }
}
/**
 * Parse xml
 * @param content 
 * @returns 
 */
function xmlparse(content: any) {
    // const parser = new DOMParser();
    // const xmlDoc = parser.parseFromString(content, 'application/xml');
    // return xml2json(xmlDoc);
    const parser = new XMLParser({
        ignoreAttributes: false
    });
    return parser.parse(content);
}

/**
 * Determine if item is a complex value.
 * @param val 
 * @returns 
 */
export function isComplex(val: any) {

    return val && ["Array", "Object"].includes(val.constructor.name)
}