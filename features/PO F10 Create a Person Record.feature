@Global
Feature: PO F10 Create a Person Record
  @runthis
  
  Scenario: #1 As a Curator, the Add Person screen will have default values
    Given I am a Curator and on the Add Person screen
    When I look at the default values
    Then I will see "Active" as the default for Source Status
    And I will see "CTRP" as the default for Source Context
    And the Processing Status will be set to "Complete" 
  
  
  Scenario Outline:#1a As a Curator, I can create a new Person Record in CTRP
    Given I am logged in to CTRP PO application
    When I have selected the Add Person function
    And I provide the information Type of the Person I wish to create
    
    |Prefix|
    |First Name|
    |Middle Name|
    |Last Name|
    |Suffix|
    |Email|
    |Phone Number-Extension|
    
    And I can Add a Person Affiliated Organization by searching organizations
    When the added parameters are saved
    Then Then a unique CTRP Person ID <Source ID> will be assigned to the added person
    And a unique Context Person ID <ContextPersonID> will be assigned to the added person
    And a CTRP person record that contains information type will be created
    
    |CTRP Person ID|
    |Context Person ID (Primary Key)|
    |Prefix|
    |First Name|
    |Middle Name|
    |Last Name|
    |Suffix|
    |Processing Status|
    |Source Context (CTRP)|
    |Source ID|
    |Source Status Active|
    |Email|
    |Phone Number-Extension|
    |Created By Created By Date (ctrpcurator 14-Sep-2016 10:53:52 EDT)|
    |Updated By Updated By Date (ctrpcurator 14-Sep-2016 10:53:52 EDT)|
    |Affiliated Organization|
    
    
   Scenario:#1b I can Add a Person Affiliated Organization by searching organizations
    Given I am on the Add Person Screen
     When I search Organizations 
     Then an organization search screen will be displayed
     And I can search Organizations
     When I select an organization to be added as an affiliated Organization
     Then the added Organization will be added to the person record screen with infromaiton type displayed
     
     |CTRP Organization ID|
     |Organization(Hyperlink to the organization details)|
     |Effective Date:14-Sep-2016|
     |Expiration Date:NULL|
     And the Effective date will be populated as the added date 
     And the Effective date can be edited once on edit screen
     When the person is not affiliated with the added organization
     Then the Expiration date will added by the curator 
    And I can add more than one affiliated organization * I remember we want only one active affiliation?
    And I can filter selected organization details
    And the affiliation can be deleted by the curator


Scenario:#1c Create Person fields's character Limit 
    Given I can request the creation of a new Person in CTRP
     When I provide the field name <FieldName>
     Then a comment appears below the Field Type <fieldName> to display the number of characters available to enter into the field <FieldLength>
     And "x characters left" will be displayed as characters are added
     When the field Length <FieldLength> characters have been entered
    Then no additional text can be entered
     
     |FieldName        |FieldLength|
     |First Name       |62         |
     |Last Name        |62         |
     |Phone Number     |30         |
     |Phone Extension  |30         |
     |Email            |254        |
     
     Scenario: #1d Create Person Mandatory fields
    Given I am a curator
    And I am logged into the CTRP PO application
     When I have not entered a Person Parameters <PersonInfo>
     Then The error message <PersonError> will be displayed
     
     |<PersonInfo>           |<PersonError>|
     |First Name             |First Name is Required|
     |Last Name              |Last Name is Required|
     |Affiliated Organization|Affiliated Organization |
   
   
  Scenario:#2 As a curator, I will receive a warning message for duplicate names
    Given I am logged in to CTRP PO application
    And I am on Add Person
    And I enter person first name which is duplicate
    And I enter person last name which is duplicate
    Then I should get warning message "Warning: Person exists in the database. Please verify and create a new Person record." for duplicate Person
    When I click on the save button
    Then the created record will be saved

     Scenario: #3 As a curator, I can associate an existing CTEP Person record from CTRP Person Context
     Given I am on the CTRP Person Context
     And I can view CTRP Person Records 
     When I click on the "Associate Person Context" at the botton of the screen
     Then the Search person screen dispalys 
     When the CTRP system finds a match in a CTEP Context Person Parameters Type
     
     |First Name|
     |Last Name|
     |Email|
     |Phone Number- Extension|
     |Affiliation Address|
     
     Then Matching CTEP Person will be displayed with the information type
    
    |CTRP Person ID|
    |CTEP Person ID|
    |First|
    |Middle|
    |Last|
    |Source ID|
    |Context Person ID|
    |Source Status|
    |Source Context|
    |Processing Status|
    |Service Request|
    |Email|
    |Phone|
    |Affiliated Orgs|
    |Last Updated Date|
    |Last Updated By|
    |Prefix|
    |Suffix|
    
    And the curator will review the displayed options and select a person to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null
    And the CTEP CTRP association will be complete


   