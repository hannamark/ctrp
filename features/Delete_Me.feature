@PO @Global
Feature: Search for organizations

Scenario: Search for organizations by name including aliases
Given as a PO Curator, I know the name of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial name of the organization I wish to search for
And I indicate to include aliases
And I submit my search request
Then the system should display all organizations that contain the name or the alias

Scenario: Search for organizations by name without searching aliases
Given as a PO Curator, I know the name of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial name of the organization I wish to search for
And I indicate to not search Aliases
And I submit my search request
Then the system should display all organizations that contain the name

Scenario: Search for organizations by aliases
Given as a PO Curator, I know the alias of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial alias of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the alias

Scenario: Search for organizations by CTEP ID
Given as a PO Curator, I know the CTEP ID of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the CTEP ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that exactly match the CTEP ID

Scenario: Search for organizations by PO ID
Given as a PO Curator, I know the PO ID of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the PO ID of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that match the PO ID

Scenario: Search for organizations by Family Name
Given as a PO Curator, I know the Family name to which the organization I wish to search for belongs to
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial Family name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that are returned from Search Organization by Family Name

Scenario Outline: Search Organizations by Family Name
Given that <Family_name> is the name of an existing family
And <Family_name> is associated with <organization_name>
And I know the <Family name> I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the <Family name> of the organization I wish to search for
And I submit my search request
Then the system should display all <organization_name> associated with <Family Name>

Examples:
|family_name				|organization_name			|functionaltype	|family_id	|organization_id	|
|Dana-Farber/Harvard Cancer Center	|Beth Israel Deaconess Medical Center	|ORGANIZATIONAL	|16473888	|120807		|
|Dana-Farber/Harvard Cancer Center	|Brigham and Women's Hospital		|ORGANIZATIONAL	|16473888	|120778		|
|Dana-Farber/Harvard Cancer Center	|Children's Hospital Boston		|ORGANIZATIONAL	|16473888	|120894		|
|Dana-Farber/Harvard Cancer Center	|Dana-Farber Cancer Institute		|ORGANIZATIONAL	|16473888	|120748		|
|Dana-Farber/Harvard Cancer Center	|Dana-Farber Harvard Cancer Center	|ORGANIZATIONAL	|16473888	|3456936		|
|Dana-Farber/Harvard Cancer Center	|Mass General/North Shore Cancer Center|ORGANIZATIONAL	|16473888	|9594250		|
|Dana-Farber/Harvard Cancer Center	|Massachusetts General Hospital	|ORGANIZATIONAL	|16473888	|123441		|

Scenario: Search for organizations by city
Given as a PO Curator, I know the name of the city I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial city of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the city

Scenario: Search for organizations by state
Given as a PO Curator, I know the name of the state I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial state of the organization I wish to search for
And I do not modify the U.S. country default
And I submit my search request
Then the system should display all organizations that contain the state in the U.S.

Scenario: Search for organizations by country
Given as a PO Curator, I know the name of the country I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full or partial country of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the country

Scenario: Search for organizations by zip code
Given as a PO Curator, I know the name of the zip code I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the full zip code of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the zip code

Scenario: Search for organizations by phone number
Given as a PO Curator, I know the phone number I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the phone number of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the phone number

Scenario: Search for organizations by <organization_trial_relationship>
Given as a PO Curator, I know the name of the < organization_trial_relationship>> I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I select the < organization_trial_relationship>> of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that have the < organization_trial_relationship>>

| organization_trial_relationship>|
|lead organization    |
|sponsor organization |
|participating site   |

Scenario: Search for organizations with multiple parameters
Given as a PO Curator, I know multiple parameters of the organization I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the parameters of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain all of the entered parameters

Scenario: Search for organizations by curator date
Given as a PO Curator, I know the name of the curator date I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator date of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator date

Scenario: Search for organizations by curator name
Given as a PO Curator, I know the name of the curator name I wish to search for
And I am logged in to CTRP PO application
And I am on the search organizations screen
When I provide the curator name of the organization I wish to search for
And I submit my search request
Then the system should display all organizations that contain the curator name

