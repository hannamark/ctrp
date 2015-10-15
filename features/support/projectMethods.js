/**
 * Author: Shamim Ahmed
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

};
module.exports = projectMethods;
