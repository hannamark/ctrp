@Global @Reg
Feature: Reg F02 Search Persons

As any CTRP User, I am able to Search for Persons by various criteria

Scenario outline: #1 I am able to search for organizations in CTRP
Given I am logged into the CTRP Registration application
And I have selected the option "Search Persons"
When I provide the <Source ID> of the Person
And I provide the <First Name> of the Person
And I provide the <Last Name> of the Person
And I provide the <Email> of the Person
And I provide the <Phone> of the Person
And I provide the <Organization Affiliation> of the Person
And I submit my search request
Then the system should display Active Person records in the CTRP context matching the search criteria
And the Person Search Results will display the following sorted by Person Last Name:
|CTRP PersonID|
|CTEP Person ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffix|
|Email|
|Phone|
|Organization Affiliation|

Example:
|Source ID	||First Name	||Last Name	||Email         ||Phone		||Organization Affiliation||Result	|
|		||		||		||		||		||			  ||At least one selection value must be entered prior to running the search|
|23880989	||		||		||		||		||			  ||True	|
|		||Jose		||Galvez	||		||		||			  ||True	|
|		||Jos		||Gal    	||		||		||			  ||True	|
|		||		||		||		||2402766239	||			  ||True	|
|		||		||		||galvezjj@mail.nih.gov||	||			  ||True	|
|		||		||		||		||		||			  ||True	|
|		||		||		||		||		||National Cancer Institute||True	|




