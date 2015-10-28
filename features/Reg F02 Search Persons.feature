@Global @Reg
Feature: As any CTRP User, I am able to Search for Persons by various criteria

Scenario outline: #1 I am able to search for organizations in CTRP
Given I am logged into the CTRP Registration application
And I have selected the option "Search Persons"
When I provide the <Source ID> of the Person
And I provide the <First Name> of the Person
And I provide the <Last Name> of the Person
And I provide the <Email> of the Person
And I provide the <City> of the Person
And I provide the <State> of the Person
And I provide the <Organization Affiliation> of the Person
And I submit my search request
Then the system should display the organization with that PO Organization ID
And the Person Search Results will display the following active Person records sorted by Person Last Name:
|PO PersonID|
|CTEP Person ID|
|First Name|
|Last Name|
|Email|
|City|
|State|
|Country|
|Zip|
|Organization Affiliation|

Example:
|Source ID	||First Name	||Last Name	||Email         ||City		||State		||Organization Affiliation||Result	|
|		||		||		||		||		||		||			  ||At least one selection value must be entered prior to running the search|
|23880989	||		||		||		||		||		||			  ||True	|
|		||Jose		||Galvez	||		||		||		||			  ||True	|
|		||Jos		||Gal    	||		||		||		||			  ||True	|
|		||		||		||		||Rockville	||Maryland	||			  ||True	|
|		||		||		||galvezjj@mail.nih.gov||	||		||			  ||True	|
|		||		||		||		||		||CT		||			  ||True	|
|		||		||		||		||		||		||National Cancer Institute||True	|




