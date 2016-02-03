@PA @global
Feature: PAA F04 Add and Edit Regulatory Information Human Subject Safety

As any CTRP PA User, I can add and edit Regulatory Information � Human Subject Safety

Scenario: #1 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status approved
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I have selected the Board Approval Status of �Submitted, Approved� from the list of :
|Submitted, Approved|
|Submitted, Exempt|
|Submission Not Required|
|Submitted, Pending|
|Submitted, Denied|
And I have entered a Board Approval Number
And I have entered a Board Name
And I have selected a Board Affiliation using the organization lookup
Then the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address

Scenario: #2 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status pending, board status denied, or board status exempt
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information - Human Subject Safety screen
When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted, Denied�, or �Submitted, Exempt� from the list of:
When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted, Denied�, or �Submitted, Exempt� from the list of:
|Submitted, Approved|
|Submitted, Exempt|
|Submission Not Required|
|Submitted, Pending|
|Submitted, Denied|
And I have entered a Board Name
And I have selected a Board Affiliation using the organization lookup
Then the Board Approval Status , Board Approval Number, Board Name, Board Affiliation will be associated with the trial along with the Board Affiliation�s address (street, city, state, zip, country), Phone # and e-mail address

Scenario: #3 I can add and edit Regulatory Information - Human Subject Safety for a Regulated Trial with board status of Not Required
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information - Human Subject Safety screen
When I have selected the Board Approval Status of �Submission Not Required� from the list of :
|Submitted, Approved|
|Submitted, Exempt|
|Submission Not Required|
|Submitted, Pending|
|Submitted, Denied|
Then the Board Approval Status will be associated with the trial

Scenario: #4 Save Regulatory Information - Human Subject Safety 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information - Human Subject Safety screen
When select save 
Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will be saved to the trial record

Scenario: #5 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information - Human Subject Safety screen
When I select Reset
Then the information entered or edited on the Regulatory Information - Human Subject Safety screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #6 Regulatory Information - Human Subject Safety screen Information must be complete for status of approved
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information - Human Subject Safety screen
When I have selected a Board Approval Status of �Submitted, Approved�
And the trial is not Imported (Trials.internal_source_id Internal_Sources.name is not "imported")
And I have not entered an Approval Number
And I have not entered a Board Name
And I have not selected a Board Affiliation 
And selected Save
Then the system will display an Error that Approval Number, Board Name, Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial 

Scenario: #7 Regulatory Information - Human Subject Safety screen Information must be complete � �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information - Human Subject Safety screen
When I have selected either of the Board Approval Status� of �Submitted, Pending�, �Submitted. Denied�, or �Submitted, Exempt�
And the trial is not Imported
And I have not entered a Board Name
And I have not selected a Board Affiliation 
And selected Save
Then the system will display an Error that Board Name and Board Affiliation must be entered in order to associate the Regulatory Information - Human Subject Safety Information for the trial 

Scenario: #8 I can add and edit the Board Affiliation 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information - Human Subject Safety screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will associated with the trial as the Board Affiliation along with the Board 

Scenario: #9 Hide non required fields for  Regulatory Information - Human Subject Safety 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information� Human Subject Safety screen
When I have selected the Board Approval Status of <status> from the list of:
Then the following fields will be displayed:

|Examples|
|<Status>               |Board Approval Status|	Board Approval Number |Board Affiliation and Address|Board Name|
|<null>                 |Displayed            |Hidden  		      |Hidden                       |Hidden|
|Submitted, Approved    |Displayed            |Displayed              |Displayed                    |Displayed|
|Submitted, Exempt      |Displayed            |Hidden                 |Displayed                    |Displayed|
|Submitted, Pending     |Displayed            |Hidden                 |Displayed                    |Displayed|
|Submitted, Denied      |Displayed            |Hidden                 |Displayed                    |Displayed|
|Submission Not Required|Displayed            |Hidden                 |Hidden                       |Hidden|