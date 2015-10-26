@Global
@PO
Feature: Create an organization

Scenario: 1 As a Curator, the Add Organization screen will have default values
Given I am a Curator and on the Add Organization screen
When I look at the default values
Then I will see "United States" as the default for Country
And I will see "Active" as the default for Source Status

Scenario: #2a As a Curator, I can request the creation of a new Organization in CTRP
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the organization I wish to create
When I provide the full name of the organization
And I provide the address1 of the organization
And I provide the address2 of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the country as "United States"
And I provide the zip code of the organization
And I provide the Phone number of the organization
And I provide the email of the organization
And I provide the Fax number of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|organization name|
|address1|
|address2|
|country|
|State or Province|
|City|
|Zip Code|
|Phone number|
|eMail|
|Fax number|
And the organization status should be Active

Scenario: #2b As a Curator, I can request the creation of a new Organization in CTRP without a zipcode entry
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the organization I wish to create
When I provide the full name of the organization
And I provide the address1 of the organization
And I provide the address2 of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the country other than the "United States"
And I provide the Phone number of the organization
And I provide the email of the organization
And I provide the Fax number of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|organization name|
|address1|
|address2|
|country|
|State or Province|
|City|
|Phone number|
|eMail|
|Fax number|
And the organization status should be Active

Scenario: #2c As a Curator, I can request the creation of a new Organization in CTRP with email only
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the organization I wish to create
When I provide the full name of the organization
And I provide the address1 of the organization
And I provide the address2 of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the zip code of the organization
And I provide the country as "United States"
And I provide the email of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|organization name|
|address1|
|address2|
|country|
|State or Province|
|City|
|Zip Code|
|eMail|
And the organization status should be Active

Scenario: #2d As a Curator, I can request the creation of a new Organization in CTRP with phone only
Given I am logged in to CTRP
And I have complete a Search for Organization
And I know the information for the organization I wish to create
When I provide the full name of the organization
And I provide the address1 of the organization
And I provide the address2 of the organization
And I select the country of the organization
And I select the state or province of the organization based on the country
And I provide the city of the organization
And I provide the zip code of the organization
And I provide the country as "United States"
And I provide the Phone number of the organization
And I provide the Fax number of the organization
And I submit my create request
Then the system should create an organization record that contains:
|unique PO ID|
|organization name|
|address1|
|address2|
|country|
|State or Province|
|City|
|Zip Code|
|Phone number|
|Fax number|
And the organization status should be Active

Scenario: #3 As any Curator, I can request the creation of a new Organization in CTRP that is a duplicate
Given I am logged in to CTRP
And I have complete a Search for Organization
And I am have selected the Add Organization function
And I know the name of the organization I wish to create
And I provide the full name of the organization I wish to create
And I submit my create request
Then the system should indicate with a warning that the organization is a duplicate name

Scenario: #4 As a Curator, I can clear any data I entered
Given I am on the create organization feature
When I select the Clear option
Then all values in all fields will be cleared
