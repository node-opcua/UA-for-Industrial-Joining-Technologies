import ResultValueDataType from './ResultValueDataType.mjs';
import ProcessingTimesDataType from './ProcessingTimesDataType.mjs';
import { DefaultNode, BrowseNameDataType, DisplayNameDataType } from './DefaultNode.mjs';
import ErrorInformationDataType from './ErrorInformationDataType.mjs';
import TighteningResultDataType from './TighteningResultDataType.mjs';
import ResultDataType from './ResultDataModel.mjs';
import StepResultDataType from './StepResultDataType.mjs';
import TagDataType from './TagDataType.mjs';
import { localizationModel, keyValuePair } from './SupportModels.mjs';
import { TighteningTraceDataType, StepTraceDataType, TraceContentDataType, TraceValueDataType } from './TighteningTraceDataType.mjs';

export default class ModelManager {
    constructor() { }


    /**
     * The purpose of this method is to create a javascript class from a parameter name
     * @param {*} parameterName 
     * @param {*} content 
     * @param {*} castMapping 
     * @returns 
     */
    factory(parameterName, content, castMapping) {
        if ('object' == typeof content && Array != content.constructor) {
            let obj;
            if (content.dataType == "ExtensionObject") {
                content = content.value;
            }
            // If the model itself provides a typecasting, then use it
            if (castMapping) {
                for (let name of Object.entries(castMapping)) {
                    if (parameterName.toLowerCase() == name[0].toLowerCase()) {
                        return eval('new ' + name[1] + '(content,this)');
                    }
                }
            }
            // Else, handle simple types
            if (content && content.locale) {
                let a = {};
                a[parameterName] = content.text;
                return new localizationModel(a, this);
            } else if (content && content.key) {
                let a = {};
                if (!content.value) {
                    content.value = ''
                }
                a[content.key] = content.value;
                return new localizationModel(a, this);
            }
            return obj;
        }
        return content;
    }


    /**
     * This method handles the top level interpretation of a message that should be 
     * converted to a model. This is probably unnecessary and could likely
     * be handled by the factory function with little modifications.
     * @param {*} node 
     * @returns 
     */
    createModelFromNode(node) {
        //console.log(node.nodeId);
        //console.log(node.typeName);
        switch (node.typeName) {
            case ('TighteningSystemType'):
                return new DefaultNode(node, this);
                break;
            case ('ResultManagementType'):
                return new DefaultNode(node, this);
                break;
            case ('ResultType'):
                return new ResultDataType(node.value.value, this)
                break;
            default:
                return new DefaultNode(node, this);
        }

        return;

    }


    // This method handles the top level interpretation of a message that should be 
    // converted to a model. This is probably unnecessary and could likely
    // be handled by the factory function with little modifications.
    createModelFromMessage(path, dObject, cast) {
        let obj = {}
        if (!dObject.dataType) {                                // Unknown
            for (const [key, value] of Object.entries(dObject)) {
                console.log(`PARSING: ${key}: ${value}`);
                obj = value;
            }
        } else if (dObject.dataType == "ExtensionObject") {     // Object
            if (dObject.arrayType == "Scalar") {
                let key = path.split("/").pop();
                obj = this.factory(key, dObject.value, cast)
            } else if (dObject.arrayType == "Array") {          // Array
                console.log('PATH:' + path);
                let key = path.split("/").pop();
                let a = {};
                a[key] = dObject.value;
                obj = this.factory(key, a, cast);
            }
        } else {
            let key = path.split("/").pop();
            let a = {
                'key': key,
                'value': dObject.value
            };
            obj = this.factory('keyValuePair', a, cast);
            return obj;
        }
        return obj;
    }
}
