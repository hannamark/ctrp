@Global @Reg
Feature: Reg F22 Register Participating Site

As a CTRP User, I can register my site participation on an Industrial, Other, or Expanded Access trial

Scenario: #1 As a CTRP User with Administrative Privileges, I can select an organization from my family as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP
And I have performed a trial search
And there is a trial in the search results with the Select Action to Add My Site
When I choose the Add My Site option
Then the Add Participating Site screen will display with the following information 
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
| Participating Site|

And I will be able to select any site from my Family Organization as a participating site or cancel the operation

Scenario Outline: #2 As a CTRP User with Administrative Privileges, I can enter my participating site information after selecting a site as participating on a trial
Given I am on the Add Participating Site feature
When I have selected a site from my Family Organization as a participating site
And I have clicked on the Next button
Then the Add Participating site screen will open with the following information displayed:
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
| Organization Name of the selected participating site |
And I will be able to enter a Local Trial Identifier <Local Trial Identifier >
And I will be able to enter a Site Specific Program Code <Site Specific Program Code>
And I will be able to enter one or more Site Recruitment Status <Site Recruitment Status> and Status Dates <Site Recruitment Status Date>
When I click on the Save button
Then the added site will be associated with the trial

Scenario Outline: #2a As a CTRP User with Administrative Privileges, I can add Investigators 
Given I am on the Add Participating Site feature
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

Senario: #2b As a CTRP User with Administrative Privileges, I can a site contact
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


Scenario: #3 As a CTRP User without Administrative Privileges, I can select my affiliated organization as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP
And I have performed a trial search
And there is a trial in the search results with the Select Action to Add My Site
When I choose the Add My Site option
Then the following information will be displayed:
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
And I will be able to select my affiliated organization as a participating site or cancel the operation

Scenario Outline: #4 As a CTRP User without Administrative Privileges, I can enter my participating site information 
Given I am on the Add Participating Site feature
When I have selected my affiliated organization
Then the following information will be displayed:
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
| Organization Name of the selected participating site |
And I will be able to enter a Local Trial Identifier <Local Trial Identifier >
And I will be able to select a Site Principal Investigator <Site Principal Investigator>
And I will be able to enter a Site Target Accrual Number <Target Accrual>
And I will be able to enter a Site Specific Program Code <Site Specific Program Code>
And I will be able to enter one or more Site Recruitment Status <Site Recruitment Status> and Status Dates <Site Recruitment Status Date>
And I will be able to save the participating site information with response <Message>

Example:
|Local Trial Identifier || Site Principal Investigator 	||Target Accrual|| Site Specific Program Code 	|| Site Recruitment Status 	|| Site Recruitment Status Date 	||Message                              	|
|Case123                || Galvez, Jose                	||10            || B2                         	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial	|
|			|| Galvez, Jose			||10            || B2				|| Active			|| 09/11/2015			||Local Trial Identifier is required	|				       
|Case123		|| 				||              || B2				|| Active			|| 09/11/2015			||Please choose a Site Principal Investigator using the lookup	|
|Case123		|| Galvez, Jose			||              || B2				|| Active			|| 				||A valid Recruitment Status Date is required	|
|Case123		|| Galvez, Jose			||              || B2				|| 				|| 09/11/2015			||Please enter a value for Recruitment Status	|
|Case123                || Galvez, Jose                	||100           ||                          	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial |

Scenario: #5 As a CTRP User, after entering my participating site information, CTRP will display a summary of trial and participating site information
 Given I have saved by participating site information
And CTRP will display Trial Details:
| Trial Identifiers | NCI Trial Identifier | Lead Organization Trial Identifer |
| Trial Details | Title | Phase | Trial Type | Primary Purpose | Secondary Purpose |
|Lead Organization | 
|Clinical Research Category |
|Funding Source |
|Participating Sites| Organization Name | Principal Investigator | Local Trial Identifer | Program Code | Recruitment Status | Recruitment Status Date | Opened for Accrual Date| Closed for Accrual Date |

Scenario: #6 As a CTRP User with Administrative Privileges, I can update any sites associated with the admin's family on an Imported trial
Given I can view all participating sites added to an Imported trial
And I can update any sites associated with the admin's family on an Imported Trial
When I have selected the Available Action to Update Site
Then a list of all participating sites added on an Imported trial will be displayed
And I can select any one of the participating sites
And I can update any of these data elements:
|Local Trial Identifier|
|Site Principal Investigator|
|Site Target Accrual Number |
|Site Specific Program Code|
|Site Recruitment Status|
|Site Recruitment Status Date|
And I can edit Site Recruitment Status History
And I can Save any changes

Scenario: #7 As a CTRP User without Administrative Privileges, I can update my participating site I added on an Imported trial
Given I have added my participating site on an Imported trial
And I have selected the Available Action to Update My Site
Then a list of participating sites I have added on an Imported trial will be displayed
And I can select one of the participating sites
And I can update any of these data elements:
|Local Trial Identifier|
|Site Principal Investigator|
|Site Target Accrual Number |
|Site Specific Program Code|
|Site Recruitment Status|
|Site Recruitment Status Date|
And I can edit Site Recruitment Status History
And I can Save any changes