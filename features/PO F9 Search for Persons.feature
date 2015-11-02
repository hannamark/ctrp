@Global
Feature: PO F9 Search for Persons

Scenario Outline: As a Curator, search for persons with multiple parameters
Given I know multiple parameters of the person I wish to search for
And I am logged in to CTRP
And I am on the search persons screen
When I want to search with first name <first_name>
And I want to search with last name <last_name>
And I want to search with Person affiliated organization <Person_affiliated_organization>
And I want to search with Source Context <Source Context>
And I want to search with Source ID <Source ID>
And I want to search with Source Status <Source Status>
And I want to search with Person email <Person_email>
And I want to search with Person phone number <Person_phone_number>
And I want to search for Person Records last updated by <Start Date> and <End Date>
And I want to search for Person records last updated by <Username>
And I submit my search request for Person Search
Then the search results should display the following sorted by Last Name:
|CTRP Person ID|
|Prefix|
|First Name|
|Middle Name|
|Last Name|
|Suffix|
|Source Context|
|Source ID|
|Source Status|
|Email Address|
|Phone Number|
|Affiliated Organizations as a pop-up display|
|Last Updated|

Examples:
|first_name  || last_name ||Source Context||Source ID|| Source Status||Person_email||Person_phone_number||Person_affiliated_organization||Start Date||End Date||Username||result|
|            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||At Least one selection value must be entered prior to running the search|
|Gisele      ||Sarosy     ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||Sar*       ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           ||CTRP          ||1426655  ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           ||CTEP          ||15179    ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||Sarosy     ||CTEP          ||15179    ||              ||            ||                   ||National Cancer Institute     ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||gsarosy@mail.nih.gov||           ||                              ||          ||        ||        ||true|
|            ||Sarosy     ||              ||         ||              ||            ||                   ||Dana-Farber Cancer Institute  ||          ||        ||        ||false|
|            ||           ||              ||         ||              ||            ||                   ||Dana-Farber*                  ||          ||        ||        ||True|
|            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||singhs10||True|
|            ||           ||              ||         ||              ||            ||                   ||                              ||1/1/2015  ||6/1/2015||        ||True|

