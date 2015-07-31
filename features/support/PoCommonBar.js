/**
 * Created by singhs10 on 7/30/15.
 */

var helper = require('../support/helper');

var PoCommonBar = function(){
    this.home = element(by.css('a[href="#/main/welcome"]'));
    this.organizations = element(by.linkText('Organizations'));
    this.listOrganizations = element(by.css('a[href="#/main/organizations"]'));
    this.addOrganizations = element(by.css('a[href="#/main/new_organization"]'));
    this.people = element(by.linkText('People'));
    this.listPeople = element(by.css('a[href="#/main/people"]'));
    this.addPerson = element(by.css('a[href="#/main/new_person"]'));
    this.family = element(by.linkText('Families'));
    this.listFamily = element(by.css('a[href="#/main/families"]'));
    this.addFamily = element(by.css('a[href="#/main/new_family"]'));
    this.signIn = element(by.css('a[href="#/main/sign_in"]'));
    this.signOut = element(by.css('a[ng-click="headerView.logOut()"]'));

    this.clickHome = function(){
        helper.wait(this.home,"Home link");
        this.home.click();
    };

    this.clickOrganizations = function(){
        helper.wait(this.organizations,"Organization link");
        this.organizations.click();
    };

    this.clickListOrganizations = function(){
        helper.wait(this.listOrganizations,"List of Organization link");
        this.listOrganizations.click();
    };

    this.clickAddOrganizations = function(){
        helper.wait(this.addOrganizations,"Add Organization link");
        this.addOrganizations.click();
    };

    this.clickPeople = function(){
        helper.wait(this.people,"People link");
        this.people.click();
    };

    this.clickListPeople = function(){
        helper.wait(this.listPeople,"List of People link");
        this.listPeople.click();
    };

    this.clickAddPerson = function(){
        helper.wait(this.addPerson,"Add Person link");
        this.addPerson.click();
    };

    this.clickFamily = function(){
        helper.wait(this.family,"Family link");
        this.family.click();
    };

    this.clickListFamily = function(){
        helper.wait(this.listFamily,"List of Family link");
        this.listFamily.click();
    };

    this.clickAddFamily = function(){
        helper.wait(this.addFamily,"Add Family link");
        this.addFamily.click();
    };

    this.clickSignIn = function(){
        helper.wait(this.signIn,"Sign in link");
        this.signIn.click();
    };

    this.clickSignOut = function(){
        helper.wait(this.signOut,"Sign Out link");
        this.signOut.click();
    };

};

module.exports = PoCommonBar;
