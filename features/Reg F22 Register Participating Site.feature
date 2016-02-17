@Global @Reg
Feature: Reg F22 Register Participating Site

As a CTRP User, I can register my site participation on an Industrial, Other, or Expanded Access trial

Scenario: #1 As a CTRP User with Administrative Privileges, I can select an organization from my family as a participating site on an Industrial, Other, or Expanded Access Trial
Given I am logged into CTRP
And I have performed a trial search
And there is a trial in the search results with the Select Action to Add My Site
When I choose the Add My Site option
Then the following information will be displayed:
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
And I will be able to select any site from my Family Organization as a participating site or cancel the operation

Scenario Outline: #2 As a CTRP User with Administrative Privileges, I can enter my participating site information after selecting a site as participating on a trial
Given I am on the Add Participating Site feature
When I have selected a site from my Family Organization as a participating site
Then the following information will be displayed:
| NCI Trial Identifier |
| Lead Org Trial Identifier |
| Official Protocol Title |
| Organization Name of the selected participating site |
And I will be able to enter a Local Trial Identifier <Local Trial Identifier >
And I will be able to select a Site Principal Investigator <Site Principal Investigator>
And I will be able to enter a Site Specific Program Code <Site Specific Program Code>
And I will be able to enter one or more Site Recruitment Status <Site Recruitment Status> and Status Dates <Site Recruitment Status Date>
And I will be able to save the participating site information with response <Message>

Example:
|Local Trial Identifier || Site Principal Investigator 	|| Site Specific Program Code 	|| Site Recruitment Status 	|| Site Recruitment Status Date 	||Message                              	|
|Case123                || Galvez, Jose                	|| B2                         	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial	|
|			|| Galvez, Jose			|| B2				|| Active			|| 09/11/2015			||Local Trial Identifier is required	|				       
|Case123		|| 				|| B2				|| Active			|| 09/11/2015			||Please choose a Site Principal Investigator using the lookup	|
|Case123		|| Galvez, Jose			|| B2				|| Active			|| 				||A valid Recruitment Status Date is required	|
|Case123		|| Galvez, Jose			|| B2				|| 				|| 09/11/2015			||Please enter a value for Recruitment Status	|
|Case123                || Galvez, Jose                	||                          	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial |


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
And I will be able to enter a Site Specific Program Code <Site Specific Program Code>
And I will be able to enter one or more Site Recruitment Status <Site Recruitment Status> and Status Dates <Site Recruitment Status Date>
And I will be able to save the participating site information with response <Message>

Example:
|Local Trial Identifier || Site Principal Investigator 	|| Site Specific Program Code 	|| Site Recruitment Status 	|| Site Recruitment Status Date 	||Message                              	|
|Case123                || Galvez, Jose                	|| B2                         	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial	|
|			|| Galvez, Jose			|| B2				|| Active			|| 09/11/2015			||Local Trial Identifier is required	|				       
|Case123		|| 				|| B2				|| Active			|| 09/11/2015			||Please choose a Site Principal Investigator using the lookup	|
|Case123		|| Galvez, Jose			|| B2				|| Active			|| 				||A valid Recruitment Status Date is required	|
|Case123		|| Galvez, Jose			|| B2				|| 				|| 09/11/2015			||Please enter a value for Recruitment Status	|
|Case123                || Galvez, Jose                	||                          	|| Active                	|| 09/11/2015                   	||Your site has been added to the trial |

Scenario: #5 As a CTRP User, after entering my participating site information, CTRP will display a summary of trial and participating site information
Given I have saved by participating site information
Then CTRP will display Trial Details:
| Trial Identifiers | NCI Trial Identifier | Lead Organization Trial Identifer |
| Trial Details | Title | Phase | Trial Type | Primary Purpose | Secondary Purpose |
|Lead Organization | 
|Clinical Research Category |
|Funding Source |
|Participating Sites| Organization Name | Principal Investigator | Local Trial Identifer | Program Code | Recruitment Status | Recruitment Status Date | Opened for Accrual Date| Closed for Accrual Date |

Scenario: #6 As a CTRP User with Administrative Privileges, I can update any participating site I added on an Imported trial
Given I have added a participating site on an Imported trial
And I have selected the Available Action to Update My Site
Then a list of participating sites I have added on an Imported trial will be displayed
And I can select one of the participating sites
And I can update any of these data elements:
|Local Trial Identifier|
|Site Principal Investigator|
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
|Site Specific Program Code|
|Site Recruitment Status|
|Site Recruitment Status Date|
And I can edit Site Recruitment Status History
And I can Save any changes