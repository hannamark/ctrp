@Global
Feature: Create an organization

Scenario: #1 As any CTRP User, I can request the creation of a new Organization in CTRP
Given I am logged in to CTRP
And I have complete a Search for Organization
And I am have selected the Add Organization function
And I know the name of the organization I wish to create
And I provide the full name of the organization I wish to create
And I provide the city of the organization I wish to create
And I provide the state of the organization I wish to create
And I provide the country of the organization I wish to create
And I provide the zip code of the organization I wish to create
And I provide either the Phone or email of the organization I wish to create
And I submit my create request
Then the system should create an organization record that contains a unique PO ID, the organization name, the CTEP ID as Null, the city, the state, the country, and the zip code
And the organization status should be Pending

@PO
Scenario: #2 As a PO Curator, I can request the creation of a new Organization in CTRP
Given I am logged in to CTRP
And I have complete a Search for Organization
And I am have selected the Add Organization function
And I know the name of the organization I wish to create
And I know the CTEP ID of the organization I wish to create, which may be null
And I provide the full name of the organization I wish to create
And I provide the city of the organization I wish to create
And I provide the state of the organization I wish to create
And I provide the country of the organization I wish to create
And I provide the zip code of the organization I wish to create
And I provide either the Phone or email of the organization I wish to create
And I submit my create request
Then the system should create an organization record that contains a unique PO ID, the organization name, the CTEP ID as Null, the city, the state, the country, and the zip code
And the organization status should be Active

Scenario: #3 As any CTRP User, I can request the creation of a new Organization in CTRP that is a duplicate
Given I am logged in to CTRP
And I have complete a Search for Organization
And I am have selected the Add Organization function
And I know the name of the organization I wish to create
And I provide the full name of the organization I wish to create
And the name is a the same as an existing organization or the alias of an existing organization
And I provide the city of the organization I wish to create
And I provide the state of the organization I wish to create
And I provide the country of the organization I wish to create
And I provide the zip code of the organization I wish to create
And I provide either the Phone or email of the organization I wish to create
And I submit my create request
Then the system should indicate that the organization is a duplicate name and reject the request and require re-entry of all fields

