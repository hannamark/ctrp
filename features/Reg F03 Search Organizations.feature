@Global @Reg
Feature: As any CTRP User, I am able to Search Organizations by various criteria

Scenario 1: I am able to search for organizations by PO Organization ID
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the PO Organization ID of the organization I wish to search for
And I submit my search request
Then the system should display the organization with that PO Organization ID
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 2: I am able to search for organizations by CTEP Organization ID
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the CTEP Organization ID of the organization I wish to search for
And I submit my search request
Then the system should display the organization with that CTEP Organization ID
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 3: I am able to search for organizations by organization name
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the full or partial name of the organization I wish to search for
And I submit my search request
Then the system should display the organizations with the selected organization name criteria
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 4: I am able to search for organizations by Family name
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I select the Family of the organization I wish to search for
And I submit my search request
Then the system should display the organizations that are associated with the selected Family
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 5: I am able to search for organizations by city
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the full or partial name of the city of the organization I wish to search for
And I submit my search request
Then the system should display the organizations with the selected city criteria
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 6: I am able to search for organizations by state
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I select the state of the organization I wish to search for
And I submit my search request
Then the system should display the organizations where the address matches the state selected
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 7: I am able to search for organizations by country
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I select the country of the organization I wish to search for
And I submit my search request
Then the system should display the organizations where the address matches the country selected
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 8: I am able to search for organizations by zip code
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I provide the full or partial zip code of the organization I wish to search for
And I submit my search request
Then the system should display the organizations that match the zip code criteria
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip

Scenario 9: I am able to search for organizations by multiple criteria
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
When I select multiple search criteria of the organization I wish to search for
And I submit my search request
Then the system should display the organizations that match all the search criteria
And the Organization Search Results will display:
PO Organization ID
CTEP Organization ID
Organization Name
Family Name
City
State
Country
Zip
