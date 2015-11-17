/**
 * Created by singhs10 on 7/31/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var util = require('util');


/**
 * Usage: wait(element, label)
 * element : It will wait for this element to come into view
 * label : just used for the error message
 */
var helper = function() {

    this.verifyLoginName = element(by.binding('headerView.username'));

    var exp_del_bttn_pg_hdr = 'Delete button on Organization page';
    var header_Page_Text = 'Clinical Trials Reporting Program';
    this.header_Page = element(by.css('.sub-title')); //element(by.css('span[style="font-size:large;font-weight:bold;"]'));

    this.wait = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.setValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.clear();
        fieldName.sendKeys(fieldValue);
        if(fieldValue == '[object Object]'){    //Shilpi: This has been added here to resolve the promise return by dynamic creation of value
        var store = fieldName.getAttribute('value');
        fieldValue.then(function(value){
            console.log(errorMessage + ' ' + value + " Value entered");
            expect(store).to.eventually.equal(value);});
        }
        else {
            console.log(errorMessage + ' ' + fieldValue + " Value entered");
            expect(fieldName.getAttribute('value')).to.eventually.equal((fieldValue));
        }
    };

/*
    this.selectValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.$('[value="' + fieldValue + '"]').click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
      //  element(by.model('orgDetailView.curOrg.country')).$('option:checked').getText()
     //   expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);

    }; */

    this.selectValueFromList = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.element(by.cssContainingText('option', fieldValue)).click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);
    };

    this.selectValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.click();
        console.log(errorMessage + ' ' + fieldValue + " Value selected");
        expect(fieldName.getText()).to.eventually.equal(fieldValue);
    };

    this.clickLink = function (link, errorMessage){
        this.wait(link, errorMessage);
        link.click();
        console.log(errorMessage + " was clicked");
        expect(this.header_Page.getText()).to.eventually.equal(header_Page_Text);
    };

    this.clickButton = function (button, errorMessage){
        this.wait(button, errorMessage);
        button.click();
        console.log(errorMessage + " was clicked");
        if (errorMessage === exp_del_bttn_pg_hdr){
            console.log("Page header does not exists on the popup dialog box");
        } else {
          //  expect(this.header_Page.getText()).to.eventually.equal(header_Page_Text);
            //expect(this.verifyLoginName.getText()).to.eventually.equal(browser.params.login.user_admin);
        }
    };

    this.clickButtonNoHeader = function (button, errorMessage){
        this.wait(button, errorMessage);
        button.click();
        console.log(errorMessage + " was clicked");
    };

    this.clickRadioButton = function (button, value, errorMessage){
        this.wait(button, errorMessage);
        if (value === '0') {
            button.get(0).click();
            console.log(errorMessage + " was clicked");
            expect((button.get(0).isSelected).to.eventually.equal(true));
        }
        else if (value === '1') {
            button.get(1).click();
            console.log(errorMessage + " was clicked");
            expect((button.get(1).isSelected).to.eventually.equal(true));
        }
    };

    this.getValue = function (fieldName, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.getAttribute('value');
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyListValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.$('option:checked').getText()).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - Got value");
    };

    this.getVerifyheader = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        expect(fieldName.getText()).to.eventually.equal(fieldValue);
        console.log(errorMessage + " - header value");
    };

    function objToStringAll (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    }

    function objToString (obj) {
        var j=''+obj+'';
        JSON.stringify(j);
        return j;
    }

};
module.exports = helper;
