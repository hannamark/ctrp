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
|PO Organization ID|
|CTEP Organization ID|
|Organization Name|
|Family Name|
|City|
|State|
|Country|
|Zip|

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




