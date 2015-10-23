@Global
@PO
Feature: Search for organizations

Scenario: As any Curator, I am able to search for organizations by name including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to include aliases
And I submit my search request
Then the system should display all organizations that contain the name or the alias
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by name without including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to not search Aliases
And I submit my search request
Then the system should display all organizations that contain the name
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by CTEP ID
Given I know the CTEP ID of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the CTEP ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the CTEP ID
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by PO Organization ID
Given I know the PO Organization ID of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the PO Organization ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the PO Organization ID
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by Family Name
Given I know the Family name to which the organization I wish to search for belongs to
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial Family name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that are members of the Family Name
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by city
Given I know the name of the city I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial city of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the city
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by state
Given I know the name of the state I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I select the state from a list of states displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the state
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by country
Given I know the name of the country I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I select the country from a list of countries displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the country
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by zip code
Given I know the name of the zip code I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial zip code of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the zip code
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by phone number
Given I know the organization phone number I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial phone number of the organization I wish to search for
And I submit my search request
Then the system should display all organizations with matching phone numbers
And the result should be sorted by Organization Name

Scenario: As any Curator, search for organizations with multiple parameters
Given I know multiple parameters of the organization I wish to search for
And I am logged in to CTRP
And I am on the search organizations screen
When I provide the parameters of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain all of the entered parameters
And the result should be sorted by Organization Name

Scenario: As a Curator, Search for organizations by curator date
Given I know the name of the curator date I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator date of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator date
And the result should be sorted by Organization Name

Scenario: As a Curator, Search for organizations by curator user name
Given I know the name of the curator user name I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator user name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator user name
And the result should be sorted by Organization Name

Scenario: As a Curator or a CTRP Administrator, I can search for organizations by status
Given I know the status of the organization I wish to search for
And I am logged in to CTRP
And I am on a search organizations screen
When I provide the status of the organization I wish to search for
|Organization Status|
|Active|
|Inactive|
|Pending|
|Nullified|
And I submit my search request
Then the system should display all organizations that have a matching organization status
And the result should be sorted by Organization Name

Scenario Outline: As a Curator, I am able to search for organizations by name including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the partial name with wild card '*' of the <Organization Name> I wish to search for
And I indicate to include or not include a <Search Aliases>
And I enter the <CTRP Organization ID>
And I enter the <Source Context>
And I enter the <Source ID>
And I enter the <Source Status>
And I enter the <Family Name>
And I enter the <Address>
And I enter the <City>
And I select the <State> from a list of state names
And I enter the <Country>
And I enter the <Phone Number>
And I enter the <Email>
And I enter the <Curator Name>
And I enter the <Curator Date>
And I submit my search request
Then the system should display <Result> with organizations that match the search criteria
And the following fields should be displayed:
|CTRP ID|
|Organization Name|
|Family Name - display first 5|
|CTEP ID|
|Source Context|
|Source ID|
|Source Status|
|City|
|State|
|Country|
|Zip Code|
|Email|
|Phone|
|Last Updated By|
|Last Updated Date|
And the result should be sorted by Organization Name

Examples:
|Organization Name	||Search Alias	||Source Context	||Source ID	||Source Status	||Family Name	||Address	||City	||State	||Country	||Phone Nuber	||Email	||Curator Name	||Curator Date	||Result|
|                 	||No           	||              	||         	||             	||           	||       	||    	||     	||       	||           	||     	||            	||            	||At least one selection value must be entered prior to running the search|
|*                	||No		||              	||		||             	||           	||       	||    	||     	||       	||           	||     	||            	||            	||True|
|Wake Forest*	  	||No	  	||			||		||		||		||		||	||	||		||		||	||		||		||True|
|Wake*			||Yes		||			||		||		||		||		||	||	||		||		||	||		||		||True|
|			||No		||CTEP			||TX035		||		||		||		||	||	||		||		||	||		||		||True|
|			||No		||			||		||		||Dana-Farber*	||		||	||	||		||		||	||		||		||True|
|			||No		||			||		||		||		||		||	||Maryland||		||		||	||		||		||True|
|			||No		||			||		||		||		||		||	||	||		||		||	||*Larco	||		||True|
		

Scenario: As a Curator, I can select any organization in a search result and display the detailed organization information
Given I am a CTRP Curator
And I have performed an organization search
When I select an organization name in the search results
Then the complete organization information will be displayed including:
|CTRP Organization ID|
|Organization Name|
|Source Context|
|Source ID|
|Source Status|
|Address 1|
|Address 2|
|City|
|State or Province 2 character ISO code|
|Country|
|Postal Code|
|Email|
|Phone Number|
|Fax Number|
|Family|
|Aliases|


Scenario: As a Curator, when I search I will enter "*" as a wild card 
Given I am a Curator
And I am on a Organization search screen
When I enter "*" in a search field
Then the search will perform a wild card search

Scenario: As a Curator, I can clear all my search selections
Given I am on the search organization feature
When I select the Clear option
Then all values in all fields will be cleared

