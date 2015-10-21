@Global
@PO
Feature: Create an organization

Scenario: #2 As a PO Curator, I can request the creation of a new Organization in CTRP
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the organization I wish to create
When I provide the full name of the organization
And I provide the address of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the zip code of the organization if the country is "United States"
And I provide either the Phone or email of the organization
And I optionally provide the Fax number of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|organization name|
|address|
|country|
|State or Province|
|City|
|Zip Code if United States|
|Phone number (or eMail)|
|eMail (or phone number)|
|Fax number (optional)|
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

@PO
Scenario: #4 As a PO Curator, I can request the creation of a CTEP Organization in CTRP
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the CTEP organization I wish to create
When I provide the full name of the organization
And I provide the CTEP Organization ID
And I provide the address of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the zip code of the organization if the country is "United States"
And I provide either the Phone or email of the organization
And I optionally provide the Fax number of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|CTEP Organzation Name|
|organization name|
|address|
|country|
|State or Province|
|City|
|Zip Code if United States|
|Phone number (or eMail)|
|eMail (or phone number)|
|Fax number (optional)|
And the organization status should be Active