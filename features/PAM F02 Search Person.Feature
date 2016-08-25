@Global @PA
Feature: PAM F02 Search Person

As a CTRP PA User with the "Read Only" role or the "Abstractor" roles, I can search CTRP Person records by various criteria

Scenario: #1 I am able to search for persons
Given I am logged into the CTRP Protocol Abstraction
And I have selected the option "Search Persons"
When I select one or more of the following
|User Name|
|Email Address|
|Last Name|
|First Name|
|Status|
|Organization Name|
|Organization Family|
|Processing Status (Pending, Complete)|
And I submit my search request by selecting search
Then the system should display all persons that meet that criteria 
And the Person Search Results will display:
|User Name|
|First Name|
|Last Name|
|Email Address|
|Organization Affilliaton|
|Organization Family|
|E-mails|
|Processing Status (Pending, Complete)|
|Status|
|Status Date|
And the system will display the list of Persons ordered assending alphanumeric by Last Name and then assending alphanumeric by First Name and then assending alphanumeric by Middle name

Scenario: #2 I am able to view Person details
Given I am logged into the CTRP PA user
When I have selected a Person
Then the system should display the Person details 
|User Name|
|Status|
|Role|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffex|
|Phone Number|
|Phone Extension|
|Email Address|
|Receive E-Mail Notifications (yes, no)|
|PRS Organization Name|
|Organization Affiliations|
|Family Name|
|Processing Status (Pending, Complete)|