/**
 * Author: Shamim Ahmed
 * Date: 12/09/2015
 * Page Object: Abstraction common methods
 */


//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
//Helper Methods
var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';


var abstractionCommonMethods = function(){
    /*******
     * Methods Description: Abstraction common helper methods
     *
     *
     *******/
    var reader;

    /*****************************************
     * Check for the various File API support.
     *****************************************/
    this.checkFileAPI = function() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true;
        } else {
            alert('The File APIs are not fully supported, Fallback required.');
            return false;
        }
    };

    /*****************************************
     * read text input
     *****************************************/
    this.readText = function(filePath) {
        var output = ""; //placeholder for text output
        if(filePath.files && filePath.files[0]) {
            reader.onload = function (e) {
                output = e.target.result;
                returnContents(output);
                return output;
            };//end onload()
            reader.readAsText(filePath.files[0]);
        }
        else if(ActiveXObject && filePath) {
            try {
                reader = new ActiveXObject("Scripting.FileSystemObject");
                var file = reader.OpenTextFile(filePath, 1);
                output = file.ReadAll();
                file.Close();
                returnContents(output);
                return output;
            } catch (e) {
                if (e.number == -2146827859) {
                    alert('Unable to access local files due to browser security settings. ' +
                        'To overcome this, go to Tools->Internet Options->Security->Custom Level. ' +
                        'Find the setting for "Initialize and script ActiveX controls not marked as safe" and change it to "Enable" or "Prompt"');
                }
            }
        }
        else {
            return false;
        }
        return true;
    };

    /*****************************************
     * Return Content or Text
     *****************************************/
    function returnContents(txt) {
        return txt;
    };

    /*****************************************
     * Before Test
     *****************************************/
    this.beforeTest = function() {
        var configurationFile;
        configurationFile = ''+testConfiguration+'/testSettings.json';
        var configuration = JSON.parse(
            fs.readFileSync(configurationFile)
        );

        console.log(configuration.abstractorUID);
        console.log(configuration.abstractorPWD);
        console.log(configuration.uiUrl);
    }

};

module.exports = abstractionCommonMethods;
