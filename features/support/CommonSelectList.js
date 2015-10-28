/**
 * Created by singhs10 on 9/4/15.
 */

/**
 * Created by singhs10 on 8/7/15.
 */

var helper = require('../support/helper');

CommonSelectList = function(){


    var select = new helper();


    this.selectSourceContext = function(sourceContextType){
        var  sourceContext =  element(by.xpath('//*[@id="source_context"]/option[.="' + sourceContextType + '"]'));
        var  sourceContextDefault =  element(by.xpath('//*[@id="source_context"]/option[.="All Contexts"]'));
        if(sourceContextType == '') {
            select.selectValue(sourceContextDefault,'All Contexts',"Source Context field");
        }
        else{
            select.selectValue(sourceContext,sourceContextType,"Source Context  field");
        }
    };


    this.selectSourceStatus = function(sourceStatusType){
        var  sourceStatus =  element(by.xpath('//*[@id="source_status"]/option[.="' + sourceStatus + '"]'));
        var  sourceStatusDefault =  element(by.xpath('//*[@id="source_status"]/option[.="Select a Status"]'));
        if(sourceStatusType == '') {
            select.selectValue(sourceStatusDefault,'Select a Status',"Source Status field");
        }
        else{
            select.selectValue(sourceStatus,sourceStatusType,"Source Status field");
        }
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


    this.selectCountrySearchOrg = function(countryName){
        var  country =  element(by.xpath('//*[@id="country"]/option[.="' + countryName + '"]'));
        var  countryDefault =  element(by.xpath('//*[@id="country"]/option[.="All Countries"]'));
        if(countryName == '') {
            select.selectValue(countryDefault,'All Countries',"Country field");
        }
        else{
            select.selectValue(country,countryName,"Country field");
        }
    };


    this.selectState = function(stateName){
        var  state =  element(by.xpath('//*[@id="state"]/option[.="' + stateName + '"]'));
        var stateDefault = element(by.xpath('//*[@id="state"]/option[.="Select a state or province"]'));
        if(stateName == '') {
            console.log('When no state is Provided');
            select.selectValue(stateDefault,'Select a state or province',"State field");
        }
        else{
            console.log('When State is selected');
            select.selectValue(state,stateName,"State field");
        }
    };

    this.selectStateSearchOrg = function(stateName){
        var  state =  element(by.xpath('//*[@id="state"]/option[.="' + stateName + '"]'));
        var stateDefault = element(by.xpath('//*[@id="state"]/option[.="All States/Provinces"]'));
        if(stateName == '') {
            console.log('When no state is Provided');
            select.selectValue(stateDefault,'All States/Provinces',"State field");
        }
        else{
            console.log('When State is selected');
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
        var  relationshipDefault =  element(by.xpath('//*[@id="org.family_relationship"]/option[.="Select a relationship"]'));
        if(relationshipType == '') {
            select.selectValue(relationshipDefault,'Select a relationship',"Family relationship Type field");
        } else{
            select.selectValue(relationship,relationshipType,"Org Family relationship field");
        }
    };
};
module.exports = CommonSelectList;
