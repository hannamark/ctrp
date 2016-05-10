/**
 * Author: Shamim Ahmed
 * Date: 05/10/2016
 * Page Object: Trial Status
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionTrailStatuses = function(){


    var helper = new helperFunctions();
    var self = this;
    /*
     * Trial Status object(s)
     */

    //Trial Status



};

module.exports = abstractionTrailStatuses;
