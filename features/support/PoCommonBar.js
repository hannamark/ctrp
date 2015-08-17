/**
 * Created by singhs10 on 7/30/15.
 */

var helper = require('../support/helper');

var PoCommonBar = function(){
    this.home = element(by.css('a[href="#/main/welcome"]'));
    this.organizations = element(by.linkText('Organizations & Families'));
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
    var menuItem = new helper();

    this.clickHome = function(){
        menuItem.clickLink(this.home, "Home link");
    };

    this.clickOrganizations = function(){
        menuItem.clickLink(this.organizations, "Organization link");
     //   menuItem.wait(this.organizations,"Organization link");
       // this.organizations.click();
    };

    this.clickListOrganizations = function(){
        menuItem.clickLink(this.listOrganizations, "List of Organization link");
       // helperm.wait(this.listOrganizations,"List of Organization link");
        //this.listOrganizations.click();
    };

    this.clickAddOrganizations = function(){
        menuItem.clickLink(this.addOrganizations, "Add Organization link");
      //  helper.wait(this.addOrganizations,"Add Organization link");
       // this.addOrganizations.click();
    };

    this.clickPeople = function(){
        menuItem.clickLink(this.people, "People link");
      //  helper.wait(this.people,"People link");
      //  this.people.click();
    };

    this.clickListPeople = function(){
        menuItem.clickLink(this.listPeople, "List of People link");
      //  helper.wait(this.listPeople,"List of People link");
       // this.listPeople.click();
    };

    this.clickAddPerson = function(){
        menuItem.clickLink(this.addPerson, "Add Person link");
     //   helper.wait(this.addPerson,"Add Person link");
      //  this.addPerson.click();
    };

 /*   this.clickFamily = function(){
        helper.wait(this.family,"Family link");
        this.family.click();
    };
*/
    this.clickListFamily = function(){
        menuItem.clickLink(this.listFamily, "List of Family link");
       // helper.wait(this.listFamily,"List of Family link");
       // this.listFamily.click();
    };

    this.clickAddFamily = function(){
        menuItem.clickLink(this.addFamily, "Add Family link");
       // helper.wait(this.addFamily,"Add Family link");
      //  this.addFamily.click();
    };

    this.clickSignIn = function(){
        menuItem.clickLink(this.signIn, "Sign in link");
      //  helper.wait(this.signIn,"Sign in link");
       // this.signIn.click();
    };

    this.clickSignOut = function(){
        menuItem.clickLink(this.signOut, "Sign Out link");
       // helper.wait(this.signOut,"Sign Out link");
      //  this.signOut.click();
    };

};

module.exports = PoCommonBar;
