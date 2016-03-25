@Global @Reg
Feature: Reg F03 Search Organizations

As a CTRP User, I am able to Search Organizations by various criteria

Scenario outline: #1 I am able to search for organizations in CTRP
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the <Source ID> of the organization
And I provide the <Organization Name> of the organization
And I provide the <Family Name> of the organization
And I provide the <City> of the organization
And I provide the <State> of the organization
And I provide the <Country> of the organization where the default is "All Countries"
And I submit my search request
Then the system should display the organization with that PO Organization ID
And the <Organization Search Results> will display Organizations with an Active status in the CTRP Context sorted by Organization Name:
|CTRP ID|
|CTEP ID|
|Name|
|Source Status|
|Source Context|
|Source ID|
|Families|
|Phone|
|Email|
|City|
|State|
|Country|
|Postal Code|



Example:
|Source ID	||Organization Name	||Family Name	||City		||State		||Country	||Result	|
|		||			||		||		||		||All Countries	||At least one selection value must be entered prior to running the search|
|129345		||			||		||		||		||All Countries	||True		|
|		||Dana-Farber		||		||		||		||All Countries	||True		|
|MDA		||Dana-Farber		||		||		||		||All Countries	||False		|
|		||@123			||		||		||		||All Countries	||False		|
|		||			||Dana-Farber/Harvard Cancer Center||	||	||All Countries	||True		|
|		||			||		||		||California	||Unites States	||True		|
|		||			||		||CA		||		||Peru		||False		|


Scenario: #2 I am able to search for Organizations in CTRP as a Registry user
  Given I am logged into the CTRP Registration application
  And I have selected the option "Search Organizations” 
    And the Exact Search is checked by default
    And I can uncheck the Exact Search
    And the source context will be "CTRP"
    And the source status will be "Active"




