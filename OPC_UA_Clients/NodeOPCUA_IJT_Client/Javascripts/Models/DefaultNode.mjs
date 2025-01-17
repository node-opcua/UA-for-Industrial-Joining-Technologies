import IJTBaseModel from './IJTBaseModel.mjs';

// The purpose of this class is to model the Processing times data structure
export class DefaultNode extends IJTBaseModel {
    constructor(node, modelManager) {
        let castMapping = {
            'browseName': 'BrowseNameDataType',
            'displayName': 'DisplayNameDataType'
        }
        let parameters = node.browseData;
        super(parameters, modelManager, castMapping);
        if (node.value) {
            this.value = node.value;
        }
        this.relations = node.relations;
    }
}


// The purpose of this class is to  
export class BrowseNameDataType extends IJTBaseModel {
    constructor(parameters, modelManager) {
        super(parameters, modelManager);
    }
}

// The purpose of this class is to  
export class DisplayNameDataType extends IJTBaseModel {
    constructor(parameters, modelManager) {
        super(parameters, modelManager);
    }
}
