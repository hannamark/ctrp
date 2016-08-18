@Global @Reg
Feature: Reg F22 Register Participating Site

As a CTRP User, I can register my site participation on an Industrial, Other, or Expanded Access trial

Scenario: #1 As a CTRP User with Administrative Privileges, I can select an organization from my family as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP
And I have performed a trial search
And there is a trial in the search results with the Select Action to Add My Site
When I choose the Add My Site option
Then the Add Participating Site screen will display with the following information 

|Add organization  |
|Program Code |
|Local Trial Identifier  |
|Site Recruitment|

And I will be able to view a list of sites of my Family Organizations in the Add Organization Field
And I can select a participating site I would like to add

Scenario: #3 As a CTRP User without Administrative Privileges, I can select my affiliated organization as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP
And I have performed a trial search
And there is a trial in the search results with the Select Action to Add My Site
When I choose the Add My Site option
Then the Add Participating Site screen will display with the following information


|Add organization  |
|Program Code |
|Local Trial Identifier  |
|Site Recruitment|


And I will be able to view my affiliated organization in the Add Organization Field
And I can select my affiliated organization to add as a participating site


Scenario Outline: #2 As a CTRP User, I can enter my participating site information after selecting a site as participating on a trial
Given I am on the Add Participating Site screen
When I have selected a participating site
And I have clicked on the Next button
Then the Add Participating site screen will open 
And I can select a participating site from Add Organization drop list <Organization>
And I can add a program code <Program Code>
And I can add a Local Trial Identifier <Identifier >
When I enter one or more Site Recruitment Status type

 |Site Recruitment|
 |Status Date|
 |Status|
 |Comment|
 
 Then I can click on the add button to add the entered site status
 When I click on the Save button
 Then the added site will be associated with the trial
 And I must add one or more Investigators
 And I can add a contact
 When I click on View Summary
 Then the View Trial Screen will display with details below
 
 |Trial Identifiers|
 |Trial Details|
 |Lead Organization/Principal Investigator|
 |Sponsor|
 |Data Table 4 Information|
 |Trial Status|
 |Trial Dates|
 |Trial Realted Documents|
 |Paticipating Sites Table|
 
   Scenario:#2'' Participating Sites Table Columns description
    Given I am on the View Trial Screen
     And I can view Participating Site Table
     And the table displays the columns type
     
     |CTRP ID|
     |CTRP Organization Name|
     |Investigators|
     |Primary Contact|
     |Local Trial Identifier|
     |Program Code|
     |Current Site Recruitment Status|
     |Current Site Recruitment Status Date|
     |Date opened for Accrual|
     |Date Closed for Accrual|
     

Scenario: #2' Add Participating Site Mandatory Fields
    Given I am on the Add Participating Site screen
     When Add Participating site fields <PSType> id not added
     Then the error message <PSError> will be displayed
     
     |<PSType>        |<PSError>|
     |Organization    |Organization is Required|
     |Site Recruitment|At least one Site Recruitment Status is Required |


Scenario Outline: #2a As a CTRP User, I can add Investigators 
Given I am on the Add Participating Site screen
When I click on the Investigator tab
Then the Investigator screen opens
And I can add one or more Investigators
And I can complete a Person search by clicking on the search persons button
When I can select a person from the search person results list
Then the field types will be populated
|PO ID|
|Last Name|
|First Name|
And I must select a Role type

|Principal Investigator|
|Sub-Investigator|

When I can click on the confirm button
Then the added investigator will be displayed with data type
|PO ID|
|Last Name|
|First Name|
|Role|
|Primary Contact|
|Edit|
|Delete|
And I have to click on the save button to associate added investigators to the participating site

Senario: #2b As a CTRP User, I can add a site contact
Given I am on the Add Participating Site feature
When I click on the Contact tab
Then the General Contact screen opens
And I can select Contact Type 
|Site Investigator|
|Person|
|General|
And I must enter a contact information
And I must enter Email Address
And I must enter Phone Number and Extension
When I click on the save button
Then the added contact will be associated with the participating site


Scenario: #2c I can add contact when contact type is Site investigator
Given I am on the Contact Screen
When the contact type selected is Site Investigator 
Then I can select a contact form a list of added Investigators
And I must enter an Email Address
And I must enter a Phone Number and Extention

Senario: #2d I can add contact when contact type is Person
Given I am on the Contact Screen
When the contact type selected is Person 
Then I can select a person by conducting a Person Search 
And I must enter an Email Address
And I must enter a Phone Number and Extention

Senario: #2c I can add contact when contact type is General
Given I am on the Contact Screen
When the contact type selected is General
Then I must enter a contact information
And I must enter an Email Address
And I must enter a Phone Number and Extention

Scenario: #6 As a CTRP User with Administrative Privileges, I can update any added site associated with the admin's family on an Imported trial
Given I can view all participating sites added to an Imported trial
And I can update any sites associated with the admin's family on an Imported Trial
When I have selected the Available Action to Update Site
Then a list of all participating sites added on an Imported trial will be displayed
And I can select any one of the added participating sites
And I can update any of these data elements:

|Program Code |
|Local Trial Identifier  |
|Site Recruitment|

And I can update Investigators
And I can update contact Information

Scenario: #7 As a CTRP User without Administrative Privileges, I can update my participating site I added on an Imported trial
Given I have added my participating site on an Imported trial
And I have selected the Available Action to Update My Site
Then the participating site I have added on an Imported trial will be displayed
And I can update any of these data elements:

|Program Code |
|Local Trial Identifier  |
|Site Recruitment|

And I can update Investigators
And I can update contact Information
