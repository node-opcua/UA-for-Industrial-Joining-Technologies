import IJTBaseModel from './IJTBaseModel.mjs';

// The purpose of this class is to handle the actual subscription or reading of a value and via socketIO send the result to the webpage
export default class ErrorInformationDataType extends IJTBaseModel {
    constructor(parameters) { 
        super(parameters);
    }
}