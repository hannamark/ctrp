/**
 * Author: Shamim Ahmed
 * Author: Shilpi Singh
 * Date: 10/14/2015
 * Desc: Project related methods
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var LoginPage = require('../support/LoginPage');
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var MenuItem = require('../support/PoCommonBar');
var AddOrganization = require('../support/AddOrganizationPage');
var main_SelectItem = require('../support/CommonSelectList.js');


var projectMethods = function() {

    /**********************************
     * Method: Create Organization
     * @param orgName
     * @param status
     * @param alias
     * @param address1
     * @param address2
     * @param country
     * @param state
     * @param city
     * @param postalCode
     * @param email
     * @param phone
     * @param fax
     ***********************************/
    this.orgDefaultCreate = function(orgName, status, alias,address1, address2, country, state, city, postalCode, email, phone, fax){
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        this.setAddOrgName(orgName + moment().format('MMMDoYY hmmss'));
        org4 = this.addOrgName.getAttribute('value');
        //  org4.then(function(value2){
        //    console.log('print value'+ value2)});
        if(alias !== ''){this.setAddAlias(alias);this.clickSaveAlias();}
        this.setAddAddress(address1);
        this.setAddAddress2(address2);
        //   selectItem.selectCountry(country);
        //   selectItem.selectState(state);
        this.setAddCity(city);
        this.setAddPostalCode(postalCode);
        this.setAddEmail(email);
        this.setAddPhone(phone);
        this.setAddFax(fax);
        this.clickSave();
    };

    /********************************
     * Method: Convert Object value to a String
     * @param obj
     * @returns {string}
     ********************************/
    function objToStringAll (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    };

    /*********************************
     * Method: Convert Object value to a String
     * @param obj
     * @returns {string}
     *********************************/
    function objToString (obj) {
        var j=''+obj+'';
        JSON.stringify(j);
        return j;
    };

    /********************************
     * Method: Returns random number
     * @param min
     * @param max
     * @returns {*}
     ********************************/
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    /********************************
     * Method: Returns random integer
     * @param min
     * @param max
     * @returns {*}
     ********************************/
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /********************************
     * Method: Random alpha numeric string based on
     *         the string size(2 - 64) & the pattern (aA, #aA, #A!)
     * @param length
     * @param chars
     * @returns {string}
     ********************************/
    function randomAlphaNumericString(sizeOfTheStrng, pattern) {
        var alpNumStr = '';
        if (pattern.indexOf('a') > -1) alpNumStr += 'abcdefghijklmnopqrstuvwxyz';
        if (pattern.indexOf('A') > -1) alpNumStr += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (pattern.indexOf('#') > -1) alpNumStr += '0123456789';
        if (pattern.indexOf('!') > -1) alpNumStr += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var randAlpNmVal = '';
        for (var i = sizeOfTheStrng; i > 0; --i) randAlpNmVal += alpNumStr[Math.round(Math.random() * (alpNumStr.sizeOfTheStrng - 1))];
        return randAlpNmVal;
    }


};
module.exports = projectMethods;
