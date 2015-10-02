@Global @Reg
Feature: As any CTRP User, I am able to Search Organizations by various criteria

Scenario outline: #1 I am able to search for organizations in CTRP
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the <CTRP Organization ID> of the organization
And I provide the <CTEP Organization ID> of the organization
And I provide the <Organization Name> of the organization
And I provide the <Family Name> of the organization
And I provide the <City> of the organization
And I provide the <State> of the organization
And I submit my search request
Then the system should display the organization with that PO Organization ID
And the <Organization Search Results> will display sorted by Organization Name:
|PO Organization ID|
|CTEP Organization ID|
|Organization Name|
|Family Name|
|City|
|State|
|Country|
|Zip|

Example:
|CTRP Org ID	||CTEP Org ID	||Organization Name	||Family Name	||City		||State		||Result	|
|129345		||		||			||		||		||		||True		|
|		||		||Dana-Farber*		||		||		||		||True		|
|		||MDA		||Dana-Farber*		||		||		||		||False		|
|		||		||@123			||		||		||		||False		|
|		||		||			||Dana-Farber/Harvard Cancer Center||	||	||True		|
|		||		||			||		||		||CA		||True		|
|		||		||			||		||CA		||		||False		|








