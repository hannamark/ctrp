@Global @Reg
Feature: As any CTRP User, I can search CTRP Person records by various criteria

Scenario 1: I am able to search for persons by first name
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I provide the full or partial first name of the person I wish to search for
And I submit my search request
Then the system should display all persons that criteria as first name
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 2: I am able to search for persons by last name
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I provide the full or partial last name of the person I wish to search for
And I submit my search request
Then the system should display all persons that criteria as last name
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 3: I am able to search for persons by PO Person ID
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I provide the PO Person ID of the person I wish to search for
And I submit my search request
Then the system should display the person with that PO Person ID
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 4: I am able to search for persons by CTEP Person ID
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I provide the CTEP Person ID of the person I wish to search for
And I submit my search request
Then the system should display the person with that CTEP Person ID
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 5: I am able to search for persons by Organization Affiliation
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I select one or more organizations from an organization look-up
And I submit my search request
Then the system should display the persons that are affiliated with the selected organizations
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 6: I am able to search for persons by role
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I select the role as Principal Investigator
And I submit my search request
Then the system should display the persons that have the role Principal Investigator
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations

Scenario 7: I am able to search for persons by multiple criteria
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
And I have selected the option "Search Persons"
When I selected multiple criteria for the search
And I submit my search request
Then the system should display the persons that meet all the criteria selected
And the Person Search Results will display:
PO Person ID
CTEP Person ID
First Name
Last Name
Phone Number
Email Address
Organization Affiliations