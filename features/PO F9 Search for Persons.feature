@Global
Feature: Search for persons

Scenario: As any CTRP User, I am able to search for persons by first name
Given I know the name of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the full or partial first name of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the first name

Scenario: As any CTRP User, I am able to search for persons by last name
Given I know the name of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the full or partial last name of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the last name

Scenario: As any CTRP User, I am able to search for persons by middle name
Given I know the name of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the full or partial middle name of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the middle name

Scenario: As any CTRP User, I am able to search for persons by CTEP Person ID
Given I know the CTEP ID of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the CTEP Person ID of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the CTEP Person ID

Scenario: As any CTRP User, I am able to search for persons by PO Person ID
Given I know the PO Person ID of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the PO Person ID of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the PO Person ID

Scenario: As any CTRP User, I am able to search for persons by email
Given I know the email of the person I am searching
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the email of the person I wish to search for
And I submit my search request
Then the system should display all persons that have that email address

Scenario: As any CTRP User, I am able to search for persons by phone number
Given I know the phone number of the person
And I am logged in to CTRP
And I have selected the option to search for an person
When I provide the full or partial phone number of the person I wish to search for
And I submit my search request
Then the system should display all persons with matching phone number

Scenario: As any CTRP User, I am able to search for persons by affiliated organization
Given I know the name of the organization I want to use in the search
And I am logged in to CTRP
And I have performed an organization search 
When I select an organization for the affiliated organization search
And I submit my search request
Then the system should display all persons who are affiliated with the selected organization

Scenario: As any CTRP User, search for persons by person_trial_relationship
Given I know the name of the person_trial_relationship I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I select the person_trial_relationship of the person I wish to search for
And I submit my search request
Then the system should display all persons that have the person_trial_relationship
|Example: person_trial_relationship|
|Principal Investigator| 
|Responsible Party|

Scenario: As any CTRP User, search for persons with multiple parameters
Given I know multiple parameters of the person I wish to search for
And I am logged in to CTRP
And I am on the search persons screen
When I provide the parameters of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain all of the entered parameters

@PO
Scenario: As a PO Curator, Search for persons by curator date
Given I know the name of the curator date I wish to search for
And I am logged in to CTRP PO application
And I am on the search persons screen
When I provide the curator date of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the curator date

@PO
Scenario: As a PO Curator, Search for persons by curator name
Given I know the name of the curator name I wish to search for
And I am logged in to CTRP PO application
And I am on the search persons screen
When I provide the curator name of the person I wish to search for
And I submit my search request
Then the system should display all persons that contain the curator name

