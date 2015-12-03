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
var helperFunctions = require('../support/helper');
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');
var loginPage = require('../support/LoginPage');
var moment = require('moment');


var projectMethods = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var selectValue = new selectValuePage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var helper = new helperFunctions();

    /**********************************
     * Method: Create Organization
     * @param orgName
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
    this.createOrganization = function(orgName, alias ,address1, address2, country, state, city, postalCode, email, phone, fax){
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        addOrg.setAddOrgName(orgName + moment().format('MMMDoYY hmmss'));
        cukeOrganization = addOrg.addOrgName.getAttribute('value');
        if(alias !== ''){addOrg.setAddAlias(alias);addOrg.clickSaveAlias();}
        addOrg.setAddAddress(address1);
        addOrg.setAddAddress2(address2);
        selectValue.selectCountry(country);
        selectValue.selectState(state);
        addOrg.setAddCity(city);
        addOrg.setAddPostalCode(postalCode);
        addOrg.setAddEmail(email);
        addOrg.setAddPhone(phone);
        addOrg.setAddFax(fax);
        addOrg.clickSave();
    };
    /***********************************************
     * Method:This will create a unique alias in Organization page
     * @param alias
     **************************************************/
    this.createUniqueOrgAlias = function(alias){
        addOrg.setAddAlias(alias + moment().format('MMMDoYY hmmss'));
        cukeAlias = addOrg.addAlias.getAttribute('value');
        addOrg.clickSaveAlias();
    };

    /**********************************
     * Method: Create Person
     * @param prefix
     * @param fName
     * @param mName
     * @param lName
     * @param suffix
     * @param email
     * @param phone
     ***********************************/
    this.createPerson = function(prefix, fName, mName, lName, suffix, email, phone){
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        addPeople.setAddPersonPrefix(prefix);
        addPeople.setAddPersonFirstName(fName + moment().format('MMMDoYY hmmss'));
        cukePerson = addPeople.addPersonFirstName.getAttribute('value');
        addPeople.setAddPersonSecondName(mName);
        addPeople.setAddPersonLastName(lName);
        addPeople.setAddPersonSuffix(suffix);
        addPeople.setAddPersonEmail(email);
        addPeople.setAddPersonPhone(phone);
        addPeople.clickSave();
    };

    /**********************************
     * Method: Create Person with Affiliated Organization
     * @param prefix
     * @param fName
     * @param mName
     * @param lName
     * @param suffix
     * @param email
     * @param phone
     * @param affOrgName
     * @param affOrgEffectiveDate
     * @param affOrgExpirationDate
     ***********************************/
    this.createPersonWithAffiliatedOrg = function(prefix, fName, mName, lName, suffix, email, phone, affOrgName, affOrgEffectiveDate, affOrgExpirationDate){
        this.createOrganization(affOrgName,'cukeAlias','Shady Grove', 'Rockville','United States','Maryland','Rockville','20675','singh@cuke.com','240-276-5555','240-276-6338');
        this.createPerson(prefix,fName,mName,lName,suffix,email,phone);
    /*    menuItem.clickPeople();
        menuItem.clickListPeople();
        searchPeople.setPersonFirstName(cukePerson);
        searchPeople.clickSearch();
        element(by.linkText(cukePerson)).click();*/
        searchOrg.clickOrgSearchModel();
        searchOrg.setOrgName(cukeOrganization);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        searchOrg.setAffiliatedOrgEffectiveDate(affOrgEffectiveDate);
        searchOrg.setAffiliatedOrgExpirationDate(affOrgExpirationDate);
        addPeople.clickSave();
    };

    /**********************************
     * Method: Create Family
     * @param familyName
     * @param familyStatus
     * @param familyType
     ***********************************/
    this.createFamily = function(familyName, familyStatus, familyType){
        menuItem.clickOrganizations();
        menuItem.clickAddFamily();
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        cukeFamily = addFamily.addFamilyName.getAttribute('value');
        selectValue.selectFamilyStatus(familyStatus);
        selectValue.selectFamilyType(familyType);
        addFamily.clickSave();
    };

    /**********************************
     * Method: Create Family with members
     * @param familyName
     * @param familyStatus
     * @param familyType
     * @param orgMember
     * @param orgRelationship
     * @param orgEffectiveDate
     * @param orgExpirationDate
     ***********************************/
    this.createFamilyWithMembers = function(familyName, familyStatus, familyType, orgMember, orgRelationship, orgEffectiveDate, orgExpirationDate){
        this.createOrganization(orgMember,'cukeAlias','Shady Grove', 'Rockville','United States','Maryland','Rockville','20675','singh@cuke.com','240-276-6338','240-276-6978');
        this.createFamily(familyName,familyStatus,familyType);
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        searchFamily.setFamilyName(cukeFamily);
        searchFamily.clickSearchButton();
        element(by.linkText(cukeFamily)).click();
        searchOrg.clickOrgSearchModel();
        searchOrg.setOrgName(cukeOrganization);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        selectValue.selectOrgFamilyRelationship(orgRelationship)
        searchOrg.setAffiliatedOrgEffectiveDate(orgEffectiveDate);
        searchOrg.setAffiliatedOrgExpirationDate(orgExpirationDate);
        addFamily.clickSave();
    }

    /**********************************
     * Method: Verify the item in Search Results
     * @param searchString
     ***********************************/

    this.inSearchResults = function(searchString) {
        return menuItem.searchResult.filter(function(name) {
            return name.getText().then(function(text) {
                return text === searchString ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if (filteredElements.length > 0) {
                return 'false';
            }
            else {
                return 'true';
            }
        });
    };

    this.inOrgSearchResults = function(searchString) {
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
            if (state === true) {
                return menuItem.orgSearchResult.filter(function(name) {
                    return name.getText().then(function(text) {
                       // console.log('value of text : ' + text + 'and value of searched string' + searchString);
                        return text === searchString;
                    });
                }).then(function(filteredElements) {
                    console.log('value of filteredElements' + filteredElements);
                    // Only the elements that passed the filter will be here. This is an array.
                    if (filteredElements.length > 0) {
                        return 'true';
                    } else {
                        element(by.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/ctrp-advanced-org-search-form2/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/i')).click();
                        element(by.xpath('//*[@id="menuitem-4"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-8"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-10"]/button')).click();
                        element(by.xpath('//*[@id="menuitem-14"]/button')).click();
                        element(by.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/ctrp-advanced-org-search-form2/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/i')).click();
                         return menuItem.orgSearchResult.filter(function(name) {
                            return name.getText().then(function(text) {
                            //    console.log('value of text : ' + text + 'and value of searched string' + searchString);
                                return text === searchString;
                            });
                        }).then(function(filteredElements) {
                         //   console.log('value of filteredElements' + filteredElements);
                             element(by.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/ctrp-advanced-org-search-form2/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/i')).click();
                            element(by.xpath('//*[@id="menuitem-5"]/button')).click();
                            element(by.xpath('//*[@id="menuitem-9"]/button')).click();
                            element(by.xpath('//*[@id="menuitem-11"]/button')).click();
                            element(by.xpath('//*[@id="menuitem-15"]/button')).click();
                             element(by.xpath('/html/body/div[2]/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/ctrp-advanced-org-search-form2/div[1]/div/div[3]/div/div/div[1]/div[1]/div[1]/i')).click();
                            // Only the elements that passed the filter will be here. This is an array.
                            if (filteredElements.length > 0) {
                                return 'true';
                            } else {
                                return 'false';
                            }
                        });
                    }
                });
            } else {
                return 'false';
            }
        });
    };



    /*****************************************************************
     * Method: Verify the organization Created Name Date in Edit Organization page
     * @param dateTimeSaved
     *****************************************************************/
    this.orgVerifyCreatedNameDate = function(dateTimeSaved) {
        var userLoggedIn = menuItem.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userCreatedDate = value2 + ' (' + dateTimeSaved + ')';
            console.log('user-date created value is: ' + userCreatedDate);
            (addOrg.orgCreatedBy.getText()).should.eventually.equal(userCreatedDate);
        });
    };

    /*****************************************************************
     * Method: Verify the organization Last Updated Name Date in Edit Organization page
     * @param module
     * @param dateTimeEdited
     *****************************************************************/
    this.verifyLastUpdatedNameDate = function(module, dateTimeEdited) {
            if (module === 'organization') {
                var userLoggedIn = menuItem.loginName.getText();
                userLoggedIn.then(function (value2) {
                    var userUpdatedDate = value2 + ' (' + dateTimeEdited + ')';
                    console.log('user-date last updated value is: ' + userUpdatedDate);
                    (addOrg.orgLastUpdatedBy.getText()).should.eventually.equal(userUpdatedDate);
                });
            } else if (module === 'person') {
           // var userLoggedIn = menuItem.loginName.getText();
            userLoggedIn.then(function (value2) {
                var userUpdatedDate = value2 + ' (' + dateTimeEdited + ')';
                console.log('user-date last updated value is: ' + userUpdatedDate);
                (addPeople.personLastUpdatedBy.getText()).should.eventually.equal(userUpdatedDate);
            });
        } else {
                return false;
               // console.log('Select a proper module');
            }
    };

    /*****************************************************************
     * Method: Verify the person Created Name Date in Edit Person page
     * @param dateTimeSaved
     *****************************************************************/
    this.personVerifyCreatedNameDate = function(dateTimeSaved) {
        var userLoggedIn = menuItem.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userCreatedDate = value2 + ' (' + dateTimeSaved + ')';
            console.log('user-date created value is: ' + userCreatedDate);
            (addPeople.personCreatedBy.getText()).should.eventually.equal(userCreatedDate);
        });
    };

    /*****************************************************************
     * Method: Verify the person Last Updated Name Date in Edit Person page
     * @param dateTimeEdited
     *****************************************************************/
    this.personVerifyLastUpdatedNameDate = function(dateTimeEdited) {
        var userLoggedIn = menuItem.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userUpdatedDate = value2 + ' (' + dateTimeEdited + ')';
            console.log('user-date last updated value is: ' + userUpdatedDate);
            (addPeople.personLastUpdatedBy.getText()).should.eventually.equal(userUpdatedDate);
        });
    };

    /*****************************************************************
     * Method: Add the Affiliated Organization Effective Date
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.setOrgAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.effective_date')).clear();
            rows[0].element(by.model('org.effective_date')).sendKeys(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Add the Affiliated Organization Expiration Date
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.setOrgAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.expiration_date')).clear();
            rows[0].element(by.model('org.expiration_date')).sendKeys(expirationDate);
        });
    };

    /*****************************************************************
     * Method: Add the Affiliated Organization Effective Date for Person
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.setOrgPersonAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.effective_date')).clear();
            rows[0].element(by.model('org.effective_date')).sendKeys(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Add the Affiliated Organization Expiration Date for Person
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.setOrgPersonAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.expiration_date')).clear();
            rows[0].element(by.model('org.expiration_date')).sendKeys(expirationDate);
        });
    };
    /*****************************************************************
     * Method: Verify the affiliated Organization
     * @param affiliatedOrg
     *****************************************************************/
    this.verifyOrgAffiliated = function(affiliatedOrg) {
        return searchOrg.orgPersonAffiliatedTable.filter(function(name) {
            return name.getText().then(function(text) {
                return text === affiliatedOrg ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /*****************************************************************
     * Method: Verify the warning message
     * @param warningText
     *****************************************************************/
    this.verifyWarningMessage = function(warningText) {
        return menuItem.addWarningMessage.filter(function(name) {
            return name.getText().then(function(text) {
              //  console.log('value of text : ' + text + 'and value of searched string' + warningText);
                return text === warningText ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
           // console.log(filteredElements);
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /*****************************************************************
     * Method: Verify the alias in Org page
     * @param orgAlias
     *****************************************************************/
    this.verifyOrgAlias = function(orgAlias) {
        return addOrg.verifyAddedOrgAlias.filter(function(name) {
            return name.getText().then(function(text) {
                return text === orgAlias ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /*****************************************************************
     * Method: Verify the affiliated Organization Effective Date
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.verifyOrgAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            // rows[0].element(by.model('org.effective_date')).getAttribute('value');
            expect(rows[0].element(by.model('org.effective_date')).getAttribute('value')).to.eventually.equal(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Verify the affiliated Organization Expiration Date
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.verifyOrgAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            expect(rows[0].element(by.model('org.expiration_date')).getAttribute('value')).to.eventually.equal(expirationDate);
        });
    };

    /*****************************************************************
     * Method: Verify the affiliated Organization Effective Date for Person
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.verifyOrgPersonAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            // rows[0].element(by.model('org.effective_date')).getAttribute('value');
            expect(rows[0].element(by.model('org.effective_date')).getAttribute('value')).to.eventually.equal(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Verify the affiliated Organization Expiration Date for Person
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.verifyOrgPersonAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            expect(rows[0].element(by.model('org.expiration_date')).getAttribute('value')).to.eventually.equal(expirationDate);
        });
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
    }

    /*********************************
     * Method: Convert Object value to a String
     * @param obj
     * @returns {string}
     *********************************/
    function objToString (obj) {
        var j=''+obj+'';
        JSON.stringify(j);
        return j;
    }

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
    /*****************************************************************
     * Method: Verify in search results
     * @param searchedItem
     *****************************************************************/
    this.inSearchResults = function(searchedItem) {
        return menuItem.searchResult.getText().filter(function(name) {
            return name.getText().then(function(text) {
                //  console.log('value of text : ' + text + 'and value of searched string' + warningText);
                return text === searchedItem ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Organization for Search, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforSearch = function(){
        browser.get('ui/#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName('shiOrgNameSearch' + moment().format('MMMDoYY h'));
            orgSearch = searchOrg.orgName.getAttribute('value');
            searchOrg.clickSearchButton();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Organization exists');
                    orgSearch.then(function(value){
                        element(by.linkText(value)).click();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                        cukeFamily = addOrg.addVerifyOrgFamilyName.getText();
                    });
                }
                else {
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 4000).then(function() {
                        menuItem.clickOrganizations();
                        menuItem.clickAddOrganizations();
                        orgSearch.then(function(value){
                            console.log('Add org Name' + value);
                            addOrg.setAddOrgName(value);
                        });
                        addOrg.setAddAlias('shAlias');
                        addOrg.clickSaveAlias();
                        addOrg.setAddAddress('9609 Medical Center Drive');
                        addOrg.setAddAddress2('9609 Medical Center Drive');
                        selectValue.selectCountry('Benin');
                        selectValue.selectState('Donga');
                        addOrg.setAddCity('searchCity');
                        addOrg.setAddPostalCode('46578');
                        addOrg.setAddEmail('searchOrg@email.com');
                        addOrg.setAddPhone('222-487-8956');
                        addOrg.setAddFax('222-487-4242');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                        menuItem.clickOrganizations();
                        menuItem.clickAddFamily();
                        addFamily.setAddFamilyName('famforOrgSearch' + moment().format('MMMDoYY hmmss'));
                        cukeFamily = addFamily.addFamilyName.getAttribute('value');
                        selectValue.selectFamilyStatus('Active');
                        selectValue.selectFamilyType('NIH');
                        searchOrg.clickOrgSearchModel();
                       searchOrg.setOrgName(orgSearch);
                        searchOrg.clickSearchButton();
                        searchOrg.selectOrgModelItem();
                        searchOrg.clickOrgModelConfirm();
                        selectValue.selectOrgFamilyRelationship('Affiliation');
                        searchOrg.setAffiliatedOrgEffectiveDate('02-Nov-2015');
                        searchOrg.setAffiliatedOrgExpirationDate('02-Nov-2020');
                        addFamily.clickSave();
                    });
                }
            });
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Organization for Edit, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforEdit = function(){
        browser.get('ui/#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName('shiOrgNameEdit' + moment().format('MMMDoYY h'));
            cukeOrganization = searchOrg.orgName.getAttribute('value');
            searchOrg.clickSearchButton();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Organization exists');
                    cukeOrganization.then(function(value){
                        element(by.linkText(value)).click();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
                else {
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 4000).then(function() {
                        menuItem.clickOrganizations();
                        menuItem.clickAddOrganizations();
                        cukeOrganization.then(function(value){
                            console.log('Add org Name' + value);
                            addOrg.setAddOrgName(value);
                        });
                        addOrg.setAddAlias('shEditAlias');
                        addOrg.clickSaveAlias();
                        addOrg.setAddAddress('9609 Medical Center Drive Edit');
                        addOrg.setAddAddress2('9609 Medical Center Drive Edit');
                        selectValue.selectCountry('United States');
                        selectValue.selectState('Idaho');
                        addOrg.setAddCity('editCity');
                        addOrg.setAddPostalCode('42589');
                        addOrg.setAddEmail('editOrg@email.com');
                        addOrg.setAddPhone('589-687-8956');
                        addOrg.setAddFax('898-420-4242');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
            });
        });
    };

    /********************************************
    * Method: inPersonSearchResults
    * @param searchString
    * @returns {*}
    ********************************************/
    this.inPersonSearchResults = function(searchString) {
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
            if (state === true) {
                return menuItem.personSearchResult.filter(function(name) {
                    return name.getText().then(function(text) {
                           var getAllTextToString = text.replace(/\n\s*\n/g, '\n');
                           console.log('Search Result Value:['+getAllTextToString+']');
                           return text === searchString;
                    });
                }).then(function(filteredElements) {
                    console.log('value of filteredElements' + filteredElements);
                          if (filteredElements.length > 0) {
                              return 'true';
                          } else {
                                return menuItem.orgSearchResult.filter(function(name) {
                                       return name.getText().then(function(text) {
                                              return text === searchString;
                                       });
                                }).then(function(filteredElements) {
                                    if (filteredElements.length > 0) {
                                        return 'true';
                                    } else {
                                        return 'false';
                                    }
                                });
                          }
                });
            } else if(state === false) {
                return 'false';
            }
        });
    };

    /********************************************
     * Method: isTextPresent
     * @param textToVerify
     * @returns {boolean}
     ********************************************/
    this.isTextPresent = function(textToVerify){
      return element.all(by.xpath('//*[contains(text(),'+textToVerify+')]')).isPresent().then(function(state){
        if (state === true){
            return 'true';
        } else{
            return 'false';
        }
      });
    };

    this.isTextPresentA = function(textToVerify){
        var anyTxt = element(by.binding(''+textToVerify+''));
        //return anyTxt.getText();
        if (expect(anyTxt.getText()).toEqual(''+textToVerify+'')){
            return true;
        } else {
            return false;
        };
    };

    this.getAlertMsg = function(){
        return alert.then(function(alert){
           return alert.getText();
        });
    };

    // UI Grid Testing Methods

    /**
     * @ngdoc function
     * @name clickGridButton
     * @methodOf functional_common.api:pageObject.grids
     *
     */
    this.clickGridButton = function ( rowNum, buttonId ) {
        this.tableRow( rowNum ).element( by.id(buttonId) ).click();
    };

    /**
     * @ngdoc function
     * @name clickRow
     * @methodOf functional_common.api:pageObject.grids
     * @description Clicks on a row.  We used to just go tableRow.click(),
     * but with ui-grid 3.0 it doesn't like that, so we do this instead.
     * @param {integer} rowNum the row number you want to click on
     *
     * @example
     *   risksPage.clickRow( 1 );
     *
     */
    this.clickRow = function( rowNum ) {
        row = this.tableRow( rowNum );
        row.element(by.repeater('(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name').row(element(by.cssContainingText('.ui-grid-cell-contents', '')).then(function(cell){cell.click();})));
    };



};
module.exports = projectMethods;
