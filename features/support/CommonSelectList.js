/**
 * Created by singhs10 on 9/4/15.
 */

/**
 * Created by singhs10 on 8/7/15.
 */

var helper = require('../support/helper');

CommonSelectList = function(){


    var select = new helper();


    this.selectSourceContext = function(sourceContext){
        var  SourceContext =  element(by.xpath('//*[@id="source_context"]/option[.="' + sourceContext + '"]'));
        select.selectValue(SourceContext,sourceContext,"Source Context field");
    };


    this.selectSourceStatus = function(sourceStatus){
        var  SourceStatus =  element(by.xpath('//*[@id="source_status"]/option[.="' + sourceStatus + '"]'));
        select.selectValue(SourceStatus,sourceStatus,"Source Status field");
    };


    this.selectCountry = function(countryName){
        var  country =  element(by.xpath('//*[@id="country"]/option[.="' + countryName + '"]'));
        var  countryDefault =  element(by.xpath('//*[@id="country"]/option[.="United States"]'));
        if(countryName == '') {
            select.selectValue(countryDefault,'United States',"Country field");
        }
        else{
            select.selectValue(country,countryName,"Country field");
        }
    };

    this.selectState = function(stateName){
        var  state =  element(by.xpath('//*[@id="state"]/option[.="' + stateName + '"]'));
        var stateDefault = element(by.xpath('//*[@id="state"]/option[.="Select a state or province"]'));
        if(stateName == '') {
            select.selectValue(stateDefault,'Select a state or province',"State field");
        }
        else{
            select.selectValue(state,stateName,"State field");
        }
    };


    this.selectFamilyType = function(type){
        var  familyType =  element(by.xpath('//*[@id="family_type"]/option[.="' + type + '"]'));
        var  familyTypeDefault = element(by.xpath('//*[@id="family_type"]/option[.="Select a type"]'));
        if(type == '') {
            select.selectValue(familyTypeDefault,'Select a type',"Family type field");
        }
        else{
            select.selectValue(familyType,type,"Family type field");
        }
    };

    this.selectFamilyStatus = function(status){
        var  familyStatus =  element(by.xpath('//*[@id="family_status"]/option[.="' + status + '"]'));
        var  familyStatusDefault =  element(by.xpath('//*[@id="family_status"]/option[.="Select a status"]'));
        if(status == '') {
            select.selectValue(familyStatusDefault,'Select a status',"Family status field");
        } else{
            select.selectValue(familyStatus,status,"Family status field");
        }
    };

    this.selectOrgFamilyRelationship = function(relationshipType){
        var  relationship =  element(by.xpath('//*[@id="org.family_relationship"]/option[.="' + relationshipType + '"]'));
        select.selectValue(relationship,relationshipType,"Org Family relationship field");
    };
};
module.exports = CommonSelectList;
