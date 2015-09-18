@Global @PA
Feature: As a CTRP PA User, I can search CTRP Person records by various criteria

Scenario: #1 I am able to search for persons
Given I am logged into the CTRP Protocol Abstraction
And I have selected the option "Search Persons"
When I select one or more of the following
|PO Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Phone Number|
|Email Address|
|Organization Affiliations|
And I submit my search request
Then the system should display all persons that meet that criteria 
And the Person Search Results will display:
|PO Person ID|
|CTEP Person ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffex|
|Phone Number|
|Email Address|
|Organization Affiliations|

Scenario: #2 I am able to view Person details
Given I am logged into the CTRP PA user
When I have selected a Person
Then the system should display the Person details 
|PO Person ID|
|CTEP Person ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffex|
|Phone Number|
|Email Address|
|Organization Affiliations|
|Family Name|
|City|
|State|
|Country|
|Zip|
|Web address|
|Status|