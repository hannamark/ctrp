@Global
Feature: Search for persons

Scenario: As any CTRP User, I am able to search for persons by first name
Given I know the name of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the full or partial first name of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the first name
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by last name
Given I know the name of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the full or partial last name of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the last name
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by CTEP Person ID
Given I know the CTEP ID of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the CTEP Person ID of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the CTEP Person ID
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by PO Person ID
Given I know the PO Person ID of the person I wish to search for
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the PO Person ID of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the PO Person ID
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by email
Given I know the email of the person I am searching
And I am logged in to CTRP
And I have selected the option to search for a person
When I provide the email of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that have that email address
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by phone number
Given I know the phone number of the person
And I am logged in to CTRP
And I have selected the option to search for an person
When I provide the full or partial phone number of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons with matching phone number
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario: As any CTRP User, I am able to search for persons by affiliated organization
Given I know the name of the organization I want to use in the search
And I am logged in to CTRP
And I have performed an organization search 
When I select an organization for the affiliated organization search
And I submit my search request for Person Search
Then the system should display all persons who are affiliated with the selected organization
And the search results should display:
|CTRP Person ID|
|CTEP Person ID|
|First Name|
|Last Name|
|Middle Name|
|Email Address|
|Phone Number|
|Organizational Affiliations|
|Status|

Scenario Outline: As any CTRP User, search for persons with multiple parameters
Given I know multiple parameters of the person I wish to search for
And I am logged in to CTRP
And I am on the search persons screen
When I want to search with first name <first_name>
And I want to search with last name <last_name>
And I want to search with PO Person ID <PO_Person_ID>
And I want to search with CTEP Person ID <CTEP_Person_ID>
And I want to search with Person email <Person_email>
And I want to search with Person phone number <Person_phone_number>
And I want to search with Person affiliated organization <Person_affiliated_organization>
Then in the search result for first name <first_name>, last name <last_name>, PO Person ID <PO_Person_ID>, CTEP Person ID <CTEP_Person_ID>, Person email <Person_email>, and Person affiliated organization <Person_affiliated _organization> it shall return result <result>

Examples:
|<first_name>|<last_name>|<PO_Person_ID>|<CTEP_Person_ID>|<Person_email>|<Person_phone_number>|<Person_affiliated_organization>|result|
|Gisele      |Sarosy     |              |                |              |                     |                                |true|
|            |Sarosy     |              |                |              |                     |                                |true|
|            |           |1426655       |                |              |                     |                                |true|
|            |           |              |15179           |              |                     |                                |true|
|            |Sarosy     |              |15179           |              |                     |National Cancer Institute       |true|
|            |           |              |                |gsarosy@mail.nih.gov|               |                                |true|
|            |Sarosy     |              |                |              |                     |Dana-Farber Cancer Institute    |false|

@PO
Scenario: As a PO Curator, Search for persons by curator date
Given I know the name of the curator date I wish to search for
And I am logged in to CTRP PO application
And I am on the search persons screen
When I provide the curator date of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the curator date

@PO
Scenario: As a PO Curator, Search for persons by curator name
Given I know the name of the curator name I wish to search for
And I am logged in to CTRP PO application
And I am on the search persons screen
When I provide the curator name of the person I wish to search for
And I submit my search request for Person Search
Then the system should display all persons that contain the curator name

