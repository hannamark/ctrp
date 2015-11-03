@Global
@PO
Feature: PO F2 Search for Organization 

Scenario: As any Curator,I am able to search for organizations by name including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to include aliases
And I submit my search request
Then the system should display all organizations that contain the name or the alias
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by name without including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to not search Aliases
And I submit my search request
Then the system should display all organizations that contain the name
And the result should be sorted by Organization Name


Scenario: As any Curator, I am able to search for organizations by Source Context and Source ID
Given I know the Source Context and Source ID of the organization I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the Source Context and Source ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the CTEP ID
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by PO Organization ID
Given I know the PO Organization ID of the organization I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the PO Organization ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the Source ID for the Source Context
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by Family Name
Given I know the Family name to which the organization I wish to search for belongs to
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial Family name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that are members of the Family Name
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by city
Given I know the name of the city I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial city of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the city
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by state
Given I know the name of the state I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I select the state from a list of states displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the state
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by country
Given I know the name of the country I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I select the country from a list of countries displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the country
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by zip code
Given I know the name of the zip code I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial zip code of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the zip code
And the result should be sorted by Organization Name

Scenario: As any Curator, I am able to search for organizations by phone number
Given I know the organization phone number I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the full or partial phone number of the organization I wish to search for
And I submit my search request
Then the system should display all organizations with matching phone numbers
And the result should be sorted by Organization Name


Scenario: As any Curator, search for organizations with multiple parameters
Given I know multiple parameters of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the parameters of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain all of the entered parameters
And the result should be sorted by Organization Name


Scenario: As a Curator, Search for organizations by curator date
Given I know the date of the curator date I wish to search for
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
And I am logged in to CTRP PO application
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
Given I know the parameters of organization I wish to search for
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I provide the partial name with wild card '*' of the <Organization Name> I wish to search for
And I indicate to include or not include a <Search Aliases>
And I enter the Source Context <Source Context>
And I enter the Source ID <Source ID>
And I enter the Source Status <Source Status>
And I enter the Family Name <Family Name>
And I enter the City <City>
And I enter the Country <Country> where the default will be "All Countries"
And I select the State <State> from a list of state names
And I enter the Phone Number <Phone Number>
And I enter the Email <Email>
And I enter the Curator Name <Curator Name>
And I enter the Curator Date <Curator Date>
And I submit my search request
Then the system should display <Result> with organizations that match the search criteria Organization Name <Organization Name>, Search Aliases <Search Aliases>, Source Context <Source Context>, Source ID <Source ID>, Source Status <Source Status>, Family Name <Family Name>, City <City>, Country <Country>, State <State>, Phone Number <Phone Number>, Email <Email>, Curator Name <Curator Name>, Curator Date <Curator Date>
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
|Organization Name	||Search Aliases||Source Context	||Source ID	||Source Status	||Family Name	||City	||State	||Country	||Phone Number	||Email	||Curator Name	||Curator Date	||Result|
|                 	||No           	||              	||         	||             	||           	||    	||     	||       	||           	||     	||            	||            	||At least one selection value must be entered prior to running the search|
|*                	||No		    ||              	||		    ||             	||           	||    	||     	||       	||           	||     	||            	||            	||true|
|Wake Forest*	  	||No	  	    ||			        ||	    	||		        ||      		||	    ||    	||		    ||		        ||	    ||		        ||		        ||true|
|Wake*			    ||Yes		    ||			        ||		    ||		        ||		        ||	    ||	    ||  		||		        ||  	||		        ||		        ||true|
|	        		||No		    ||CTEP  			||WAKE		||		        ||	        	||  	||	    ||		    ||		        ||	    ||      		||		        ||true|
|		        	||No		    ||		        	||	    	||		        ||*fam*	||	    ||	    ||		    ||		        ||	    ||	        	||		        ||true|
|			        ||No	    	||			        ||  		||		        ||		        ||	    ||New York||United States		||		        ||	    ||		        ||		        ||true|
|			        ||No    		||			        ||		    ||	        	||		        ||	    ||	    ||		    ||		        ||  	||*curator	    ||		        ||true|


Scenario: As a Curator, I can select any organization with Family in a search result and display the detailed organization information
Given I want to see the detail information of organization when linked with Family
And I am logged in to CTRP PO application
And I have selected the option to search for an organization
When I select an organization name in the search results
Then the complete family organization information will be displayed including:
|CTRP Organization ID|
|Organization Name|
|Source Context|
|Source ID|
|Source Status|
|Address 1|
|Address 2|
|City|
|State|
|Country|
|Postal Code|
|Email|
|Phone Number|
|Fax Number|
|Family|
|Aliases|


Scenario: As a Curator, I can select any organization in a search result and display the detailed organization information
 Given I want to see the detail information of organization
 And I am logged in to CTRP PO application
 And I have selected the option to search for an organization
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
 |State|
 |Country|
 |Postal Code|
 |Email|
 |Phone Number|
 |Fax Number|
 |Aliases|


Scenario: As a Curator, when I search I will enter "*" as a wild card
Given I want to search for an Organization with wild card
And I am logged in to CTRP PO application
And I am on a Organization search screen
When I enter "*" in a search field
Then the search will perform a wild card search

Scenario: As a Curator, I can clear all my search selections
Given I am logged in to CTRP PO application
And I have selected the option to search for an organization
And I want to clear the organization search fields
When  I select the Clear option
Then  all values in all fields will be cleared

