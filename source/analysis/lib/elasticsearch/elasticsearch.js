/********************************************************************************************************************* 
 *  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.                                           * 
 *                                                                                                                    * 
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    * 
 *  with the License. A copy of the License is located at                                                             * 
 *                                                                                                                    * 
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    * 
 *                                                                                                                    * 
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES * 
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    * 
 *  and limitations under the License.                                                                                * 
 *********************************************************************************************************************/ 
 
/** 
 * @author Solution Builders 
 */ 

'use strict';

const es_index = "video_rekognition";
const client = require('../elasticsearch/connection')

/**
 * Performs operations for interacting with the elasticsearch cluster
 *
 * @class elasticsearch
 */
let elasticsearch = (function() {
    /**
     * @class elasticsearch
     * @constructor
     */
    let elasticsearch = function() {};

    /**
     * Indexes a document in the elasticsearch cluster.
     * @param {JSON} doc - document to be indexed in elasticsearch
     * @param {indexDocument~callback} cb - The callback that handles the response
     */
    elasticsearch.prototype.indexDocument = function(doc, cb) {
        console.log('Indexing document:', doc);

        client.index({
            index: es_index,
            type: 'media',
            body: doc,
            id: doc.object_id
        }).then(function(body) {
            console.log(body);
            cb(null, body);
        }, function(error) {
            console.trace(error.message);
            cb(error, null);
        });
    };

    return elasticsearch;

})();

module.exports = elasticsearch;
