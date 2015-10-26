/**
 * Created by singhs10 on 9/4/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
//var chaiParam = require('chai-param');
var should = chai.should();
// var   param = chaiParam.param;
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var LoginPage = require('../support/LoginPage.js');
var MenuItem = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var personPage = require('../support/AddPersonPage');
var searchPersonPage = require('../support/ListOfPeoplePage');
var projectFunctionsPage = require('../support/projectMethods');

module.exports = function() {
    var menuItemList = new MenuItem();
    var searchFamily = new listFamilyPage();
    var Search = new ListOfOrganizationPage();
    var Login = new LoginPage();
    var addPerson = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var searchPerson = new searchPersonPage();
/*
    this.Given(/^I want to test the Login page$/, function (callback) {
        browser.get('angular#/main/sign_in').then(function(){callback();});
      //  setTimeout(callback,1000);
    });

    this.When(/^I enter username (.*)$/, function (username, callback) {
        element(by.model('userView.userObj.user.username')).sendKeys(username).then(function(){callback();});
    //    callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^I enter password (.*)$/, function (password, callback) {
        element(by.model('userView.userObj.user.password')).sendKeys(password).then(function(){callback();});
    //    callback();
      //  setTimeout(callback,1000);
    });

    this.Then(/^i did a submit$/, function (callback) {
        element(by.css('.glyphicon.glyphicon-log-in')).click().then(function(){callback();});
        //   callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^I should see welcome (.*)$/, function (username, callback) {
        expect(element(by.binding('headerView.username')).getText()).to.eventually.equal(username).then(function(){callback();});
        //  callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^the URL should be "([^"]*)"$/, function (arg1, callback) {
        expect(browser.getCurrentUrl()).to.eventually.equal(arg1).then(function(){callback();});
      //  callback();
       // setTimeout(callback,1000);
    });

    this.When(/^I select the option to search Organization Family$/, function (callback) {
        element(by.linkText('Organizations & Families')).click();
        element(by.css('a[href="#/main/families"]')).click();
        setTimeout(callback,1000);
    });

    this.Given(/^I select the (.*) in search Organization family$/, function (searchFamilyCriteria, callback) {
        if (searchFamilyCriteria = 'Family Name'){element(by.model('familyView.searchParams.name')).click();}
        if (searchFamilyCriteria = 'Family Status'){element(by.model('familyView.searchParams.family_status')).click();}
        if (searchFamilyCriteria = 'Family ID'){element(by.model('familyView.searchParams.po_id')).click();}
        if (searchFamilyCriteria = 'Family Type'){element(by.model('familyView.searchParams.family_type')).click();}
        setTimeout(callback,1000);
    });

    this.Given(/^I enter (.*) for the family search criteria$/, function (searchFamilyValue, callback) {
        if (searchFamilyCriteria = 'Family Name'){element(by.model('familyView.searchParams.name')).click();}
        if (searchFamilyCriteria = 'Family Status'){element(by.model('familyView.searchParams.family_status')).click();}
        if (searchFamilyCriteria = 'Family ID'){element(by.model('familyView.searchParams.po_id')).click();}
        if (searchFamilyCriteria = 'Family Type'){element(by.model('familyView.searchParams.family_type')).click();}
        callback.pending();
    });

    this.Then(/^I click on "([^"]*)" button$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a list of Family Organization Information that matches the (.*) will be displayed in the search result$/, function (searchFamilyValue, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I searched with family name "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^In the search results it shall display these Family fields$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });*/

 /*   this.Given(/^I am logged in to CTRP PO applicationss$/, function (callback) {
        browser.get('ui#/main/sign_in');
        Login.login('ctrpadmin', 'Welcome01');
        /*
        element(by.css('a[ng-click="headerView.logOut()"]')).isDisplayed().then(function(result) {
            if (result) {
                //Whatever if it is true (displayed)
                element(by.css('a[ng-click="headerView.logOut()"]')).click();
                element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
                element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
                element(by.css('.glyphicon.glyphicon-log-in')).click();
            } else {
                element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
                element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
                element(by.css('.glyphicon.glyphicon-log-in')).click();
            }
        });
       // element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
       // element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
      //  element(by.css('.glyphicon.glyphicon-log-in')).click();
        setTimeout(callback,8000);
    });

    this.Given(/^I select the option to search Organization Family$/, function (callback) {
        element(by.linkText('Organizations & Families')).click();
        element(by.css('a[href="#/main/families"]')).click();
        setTimeout(callback,2000);
    });

    this.Then(/^I want to search with family name (.*)$/, function (familyName, callback) {
        element(by.model('familyView.searchParams.name')).sendKeys(familyName);
        setTimeout(callback,2000);
    });

    this.Given(/^I click on Search button$/, function (callback) {
        element(by.css('.glyphicon.glyphicon-search')).click();
        setTimeout(callback,2000);
    });


    this.Then(/^In the search result for family name (.*) it shall return result (.*)$/, function (familyName, result, callback) {
        expect(Search.inResults(familyName)).to.become(result).then(function(){callback();});
        //  setTimeout(callback,4000);
    });

    this.Then(/^I want to search with family type (.*)$/, function (familyType, callback) {
        element(by.model('familyView.searchParams.family_type')).sendKeys(familyType);
        setTimeout(callback,4000);
    });

    this.Then(/^In the search result for family type (.*) it shall return result (.*)$/, function (familyType, result, callback) {
        expect(Search.inResults(familyType)).to.become(result).then(function(){callback();});
      //  setTimeout(callback,4000);
    });

    this.Then(/^In the search result for family name (.*) ,family type (.*) and family status (.*) it shall return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
      callback.pending();//  expect(Search.inResults('Active' , 'NCTN')).to.become(result).then(function(){callback();});
    });




    this.Then(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        element(by.model('familyView.searchParams.family_status')).sendKeys(familyStatus);
        setTimeout(callback,4000);
    });


        this.Then(/^In the search result for family status (.*) it shall return result (.*)$/, function (familyStatus, result, callback) {
            expect(Search.inResults(familyStatus)).to.become(result).then(function(){callback();});
            //  setTimeout(callback,4000);
        });


    this.Given(/^I want to search with family type (.*)$/, function (familyType, callback) {
        // Write code here that turns the phrase above into concrete actions
        setTimeout(callback,4000);
    });

    this.Given(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        // Write code here that turns the phrase above into concrete actions
        setTimeout(callback,4000);
    });


    this.Given(/^logout$/, function (callback) {
        element(by.css('a[ng-click="headerView.logOut()"]')).click();
        setTimeout(callback,4000);
    });*/

    this.Given(/^I have selected the option to search for a family shilpi$/, function (callback) {
        menuItemList.clickOrganizations();
    //    menuItemList.clickListFamily();
        menuItemList.clickAddFamily();
   //     clickRole = function(role) {
     //       element(by.css('label[btn-radio="\\\''+ role +'\\\'"]')).click();
       // }
        //clickRole('CURATOR');
        menuItemList.clickWriteMode();
    //    By.cssSelector("label[btn-radio=\"\\' CURATOR \\'\"]")
      //  element(by.css('label[btn-radio="\\\'CURATOR\\\'"]')).click();
        browser.sleep(5000).then(callback);
    });

    this.When(/^I provide search item$/, function (callback) {
      /*  searchFamily.setFamilyName('*');
        searchFamily.clickSearchButton();
        var getTableValues = function(tableSelector, columnSelector, colNames) {
            return element.all(by.css(tableSelector)).map(function(row, index) {
                var columns = row.all(by.css(columnSelector));console.log('row here' + columns) ;
                return columns.then(function(cols){
                    var result = {};
                    cols.forEach(function(col, idx) {
                        result[colNames[idx]] = col.getText();
                        result.rowElm = row;
                    });
                    return result;
                });
            });
        };
        var tableDataPromise = getTableValues('.ui-grid-render-container.ui-grid-render-container-body', '.ngCellText .ng-binding', ["Family Name", "balance", "creditLimit"]);
        tableDataPromise.then(function(){console.log('This is the table value' + tableDataPromise);});*/
        browser.sleep(250).then(callback);
    });

    this.Given(/^Login in CTRP$/, function (callback) {
        browser.get('ui#/main/sign_in');
        Login.login('ctrpcurator', 'Welcome01');
        menuItemList.clickWriteMode();
        //  setTimeout(callback, 5000);
        browser.sleep(250).then(callback);
    });




    this.Given(/^Creaye person with Organization$/, function (callback) {
        menuItemList.clickOrganizations();
           menuItemList.clickListOrganizations();
        Search.checkAlias(false);
    //    searchPerson.setPersonFirstName('Christopher');
    //    searchPerson.clickSearch();
    //    element(by.linkText('Christopher')).click();
    //    projectFunctions.setOrgAffiliatedEffectiveDate('ACORN Research, LLC', '06-Oct-2015' );
   /*     var name = 'ACORN Research, LLC';
        return element.all(by.repeater('org in personDetailView.savedSelection')).getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === name;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.effective_date')).clear();
            rows[0].element(by.model('org.effective_date')).sendKeys('01-Oct-2015');//element(by.css('input[ng-model="org.effective_date"]')
         //   addPerson.clickSave();
            element(by.css('#save_btn')).click();
            browser.sleep(2000);
        }); */
      //  element(by.css('#save_btn')).click();
       // addPerson.clickSave();
    browser.sleep(5000).then(callback);
    });

    this.Then(/^verify person$/, function (callback) {
       //   element(by.model('searchParams.fname')).sendKeys(per4);
               //   per4.then(function(vv){console.log('value'+vv);searchPerson.setPersonFirstName(vv);searchPerson.clickSearch();expect(menuItemList.inResults(vv)).to.become('true');});
        browser.sleep(250).then(callback);
    });


//element.all(by.css('.ui-grid-viewport'))
}

//     projectFunctions.createFamilyWithMembers('ssingh','Active','NIH','orgmem','Organizational','08-Oct-2015','25-Oct-2020');
//  projectFunctions.createFamily('singh','Active','NIH');
//   projectFunctions.createPersonWithAffiliatedOrg('pp','fnm','mnam','lnam','suff','eml@link.com','222-4444-555','afforg','08-Oct-2015','25-Oct-2020');
// projectFunctions.personDefaultCreate('Jr','Shilpi','mName','lName','jk','s@s.com','444-5555-666');
//.personCreateWithAffiliatedOrg('tp','fname','','lnmae','','','','tt');
//    menuItemList.clickPeople();
//   menuItemList.clickListPeople();
//   searchPerson.setPersonFirstName(per4);
//  element(by.model('searchParams.fname')).sendKeys(per4);
//  per4.then(function(vv){console.log('value'+vv);searchPerson.setPersonFirstName(vv);searchPerson.clickSearch();expect(menuItemList.inResults(vv)).to.become('true');});
