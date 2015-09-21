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
        select.selectValue(SourceContext,sourceContext,"Organization by Source Context field");
    };


    this.selectSourceStatus = function(sourceStatus){
        var  SourceStatus =  element(by.xpath('//*[@id="source_status"]/option[.="' + sourceStatus + '"]'));
        select.selectValue(SourceStatus,sourceStatus,"Organization by Source Status field");
    };


    this.selectCountry = function(country){
        var  Country =  element(by.xpath('//*[@id="country"]/option[.="' + country + '"]'));
        select.selectValue(Country,country,"Organization by Country field");
    };

    this.selectState = function(state){
        var  State =  element(by.xpath('//*[@id="state"]/option[.="' + state + '"]'));
        select.selectValue(State,state,"Organization by State field");
    };


};
module.exports = CommonSelectList;
