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


    this.selectCountry = function(country){
        var  Country =  element(by.xpath('//*[@id="country"]/option[.="' + country + '"]'));
        select.selectValue(Country,country,"Country field");
    };

    this.selectState = function(state){
        var  State =  element(by.xpath('//*[@id="state"]/option[.="' + state + '"]'));
        select.selectValue(State,state,"State field");
    };


    this.selectFamilyType = function(type){
        var  familyType =  element(by.xpath('//*[@id="family_type"]/option[.="' + type + '"]'));
        var  familyTypeDefault = element(by.xpath('//*[@id="family_type"]/option[.="Select a status"]'));
        if(type == '') {
            select.selectValue(familyTypeDefault,'Select a status',"Family type field");
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
        }
        else{
            select.selectValue(familyStatus,status,"Family status field");
        }
    };

};
module.exports = CommonSelectList;
