@Global
Feature: Search for organizations

Scenario: As any CTRP User, I am able to search for organizations by name including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to include aliases
And I submit my search request
Then the system should display all organizations that contain the name or the alias

Scenario: As any CTRP User, I am able to search for organizations by name without including aliases
Given I know the name of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial name of the organization I wish to search for
And I indicate to not search Aliases
And I submit my search request
Then the system should display all organizations that contain the name

Scenario: As any CTRP User, I am able to search for organizations by CTEP ID
Given I know the CTEP ID of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the CTEP ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the CTEP ID

Scenario: As any CTRP User, I am able to search for organizations by PO Organization ID
Given I know the PO Organization ID of the organization I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the PO Organization ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the PO Organization ID

Scenario: As any CTRP User, I am able to search for organizations by Family Name
Given I know the Family name to which the organization I wish to search for belongs to
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial Family name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that are members of the Family Name

Scenario: As any CTRP User, I am able to search for organizations by city
Given I know the name of the city I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial city of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the city

Scenario: As any CTRP User, I am able to search for organizations by state
Given I know the name of the state I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I select the state from a list of states displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the state

Scenario: As any CTRP User, I am able to search for organizations by country
Given I know the name of the country I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I select the country from a list of countries displayed by CTRP
And I submit my search request
Then the system should display all organizations whose address contains the country

Scenario: As any CTRP User, I am able to search for organizations by zip code
Given I know the name of the zip code I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial zip code of the organization I wish to search for
And I submit my search request
Then the system should display all organizations whose address contains the zip code

Scenario: As any CTRP User, I am able to search for organizations by phone number
Given I know the organization phone number I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I provide the full or partial phone number of the organization I wish to search for
And I submit my search request
Then the system should display all organizations with matching phone numbers

Scenario: As any CTRP User, search for organizations by organization_trial_relationship
Given I know the name of the organization_trial_relationship I wish to search for
And I am logged in to CTRP
And I have selected the option to search for an organization
When I select the organization_trial_relationship of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that have the organization_trial_relationship
|organization_trial_relationship values| 
|lead organization| 
|sponsor organization| 
|participating site|

Scenario: As any CTRP User, search for organizations with multiple parameters
Given I know multiple parameters of the organization I wish to search for
And I am logged in to CTRP
And I am on the search organizations screen
When I provide the parameters of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain all of the entered parameters

@PO
Scenario: As a PO Curator, Search for organizations by curator date
Given I know the name of the curator date I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator date of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator date

@PO
Scenario: As a PO Curator, Search for organizations by curator name
Given I know the name of the curator name I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator name

