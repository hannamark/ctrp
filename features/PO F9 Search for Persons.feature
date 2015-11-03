@Global
Feature: PO F9 Search for Persons

Scenario Outline: As a Curator, search for persons with multiple parameters
Given I know multiple parameters of the person I wish to search for
  |Person First Name| |Person last name| |Affiliation| |Source Status| |email| |phone|
  |shiFName         | |shiLName        | |shiPerOrgAff| |Active      | |shiPercuke@pr.com| |420-567-8906|
And I am logged in to CTRP PO application
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
Then the search results <result> should display the following sorted by Last Name:
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
|shiFName    ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|shiFNa*     ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||shiLName   ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||shiL*      ||              ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           || CTEP         ||         ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           || CTRP         ||65000000 ||              ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||Active        ||            ||                   ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||shiPercuke@pr.com||                  ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||shiPercuke* ||                   ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||            ||                   ||    shiPerOrgAff              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||            ||                   ||    shiPerOrg*                ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||            ||  420-567-8906     ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||            ||   420-567*        ||                              ||          ||        ||        ||true|
|            ||           ||              ||         ||              ||            ||                   ||                              ||  today   ||  today ||        ||true|
|            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        ||ctrpcurator  ||true|
|            ||           ||              ||         ||              ||            ||                   ||                              ||          ||        || ctrpcu*  ||true|
|            ||shiLName   ||              ||         ||              ||shiPercuke@pr.com||420-567*      || shiPerOrgAff                 ||          ||        ||        ||true|



