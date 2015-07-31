/**
 * Created by singhs10 on 7/30/15.
 */


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
        this.home.click();
    };

    this.clickOrganizations = function(){
        this.organizations.click();
    };

    this.clickListOrganizations = function(){
        this.listOrganizations.click();
    };

    this.clickAddOrganizations = function(){
        this.addOrganizations.click();
    };

    this.clickPeople = function(){
        this.people.click();
    };

    this.clickListPeople = function(){
        this.listPeople.click();
    };

    this.clickAddPerson = function(){
        this.addPerson.click();
    };

    this.clickFamily = function(){
        this.family.click();
    };

    this.clickListFamily = function(){
        this.listFamily.click();
    };

    this.clickAddFamily = function(){
        this.addFamily.click();
    };

    this.clickSignIn = function(){
        this.signIn.click();
    };

    this.clickSignOut = function(){
        this.signOut.click();
    };

};

module.exports = PoCommonBar;
