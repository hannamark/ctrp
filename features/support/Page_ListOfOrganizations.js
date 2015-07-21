/**
 * Created by singhs10 on 7/20/15.
 */
var Supports = function(){
};

/*function action_Fill_SearchField_Org_Name(identifier_type, identifier_value, action_to_take, value_to_enter) {
    element(by.identifier_type(identifier_value)).action_two_take(value_to_enter);
    return element;
}*/
/*

Supports.prototype.action_Fill_SearchField_Org_Name = function(identifier_value, value_to_enter){
    element(by.model(identifier_value)).sendKeys(value_to_enter);
};
*/



Supports.prototype.action_Fill_SearchField_Org_Name = function(Name, Search_Alias_CheckBox, PO_ID, Source, Source_Status_ListBox, Address, Address_2, Family_Name, Email, Country_ListBox, State_ListBox, City, Postal_Code){
    element(by.model('orgsView.searchParams.name')).sendKeys(Name);
    var CheckBoxState = element(by.model('orgsView.searchParams.alias')).getAttribute('checked');
    if (CheckBoxState != Search_Alias_CheckBox)
    {
        element(by.model('orgsView.searchParams.alias')).click();
    }
    element(by.model('orgsView.searchParams.id')).sendKeys(PO_ID);
    element(by.model('orgsView.searchParams.source_id')).sendKeys(Source);
    element(by.model('orgsView.searchParams.source_status')).$("[value="+Source_Status_ListBox+"]").click();
    element(by.model('orgsView.searchParams.address')).sendKeys(Address);
    element(by.model('orgsView.searchParams.address2')).sendKeys(Address_2);
    element(by.model('orgsView.searchParams.family_name')).sendKeys(Family_Name);
    element(by.model('orgsView.searchParams.email')).sendKeys(Email);



    element(by.model('orgsView.searchParams.city')).sendKeys(City);
    element(by.model('orgsView.searchParams.postal_code')).sendKeys(Postal_Code);
  //  setTimeout(callback, 10000);
};


/*
Supports.prototype.findByBinding = function(sut, item, callback){
    sut.browser.findElement(sut.by.binding(item)).then(function(result) {
        callback(result);
    });
};*/

module.exports = new Supports();