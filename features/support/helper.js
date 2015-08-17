/**
 * Created by singhs10 on 7/31/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

/**
 * Usage: wait(element, label)
 * element : It will wait for this element to come into view
 * label : just used for the error message
 */
var helper = function() {

    this.wait = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state == true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 == true;
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
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
    };

    this.selectValue = function (fieldName, fieldValue, errorMessage) {
        this.wait(fieldName, errorMessage);
        fieldName.$('[value="' + fieldValue + '"]').click();
        expect(fieldName.getAttribute('value')).to.eventually.equal(fieldValue);
    };

    this.clickLink = function (link, errorMessage){
        this.wait(link, errorMessage);
        link.click();
    };

    this.clickButton = function (button, errorMessage){
        this.wait(button, errorMessage);
        button.click();
    };
};
module.exports = helper;
