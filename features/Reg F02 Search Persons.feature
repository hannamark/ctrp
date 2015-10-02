@Global @Reg
Feature: As any CTRP User, I am able to Search for Persons by various criteria

Scenario outline: #1 I am able to search for organizations in CTRP
Given I am logged into the CTRP Registration application
And I have selected the option "Search Persons"
When I provide the <CTRP Person ID> of the Person
And I provide the <CTEP Person ID> of the Person
And I provide the <First Name> of the Person
And I provide the <Last Name> of the Person
And I provide the <Email> of the Person
And I provide the <City> of the Person
And I provide the <State> of the Person
And I submit my search request
Then the system should display the organization with that PO Organization ID
And the Person Search Results will display the follwing sorted by Person Last Name:
|PO PersonID|
|CTEP Person ID|
|First Name|
|Last Name|
|Email|
|City|
|State|
|Country|
|Zip|

Example:
|CTRP Person ID	||CTEP Person ID||First Name	||Last Name	||Email         ||City		||State		||Result	|
|23880989	||		||		||		||		||		||		||True		|
|		||		||Jose		||Galvez	||		||		||		||True		|
|		||		||		||		||		||Rockville	||MD		||True		|
|		||		||		||		||galvezjj@mail.nih.gov||	||		||True		|
|		||		||		||		||		||		||CT		||		|

Scenario: #2 I can request the creation of a new Person record
Given I am logged into the CTRP Registration application
And I have selected the option "Search Person"
And I searched for the desired Person
When I do not find the Person that I need for registration
Then I can request the creation of a new Person record by providing the First Name, Last Name, Email, City, State of the Person
And requesting that a new Person record be created





