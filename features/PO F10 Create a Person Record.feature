@Global
Feature: Create a Person Record

Scenario: As any CTRP User, I can request the creation of a new Person Record in CTRP
Given I am logged in to CTRP
And I know the name, phone or email, and organization affiliation of the Person
And I have complete a Search for Person and not found the Person in CTRP
When I have selected the Add Person function
And I provide the name of the Person I wish to create
And I provide either the Phone or email of the Person I wish to create
And I have searched Organizations and selected an affiliated organization
And I submit my create request
Then the system should create a Person record that contains a unique PO ID, the person name, the CTEP ID as Null, the phone and/or email, and the affiliated organization
And the organization status should be Pending and the status date should be the current date and time

@PO
Scenario: As a PO Curator, I can request the creation of a new Person Record in CTRP
Given I am logged in to CTRP
And I know the name, phone or email, and organization affiliation of the Person
And I have complete a Search for Person and not found the Person in CTRP
When I have selected the Add Person function
And I provide the name of the Person I wish to create
And I provide either the Phone or email of the Person I wish to create
And I have searched Organizations and selected an affiliated organization
And I submit my create request
Then the system should create a Person record that contains a unique PO ID, the person name, the CTEP ID as Null, the phone and/or email, and the affiliated organization
And the organization status should be Active and the status date should be the current date and time

Scenario: As a PO Curator, I can request the creation of a new Person Record in CTRP that is a duplicate
Given I am logged in to CTRP
And I know the name, phone or email, and organization affiliation of the Person
And I have complete a Search for Person and not found the Person in CTRP
When I have selected the Add Person function
And I provide the name of the Person I wish to create
And I provide either the Phone or email of the Person I wish to create
And I have searched Organizations and selected an affiliated organization
And I submit my create request
Then the system should indicate that the person name is a duplicate name and reject the request and require re-entry of all fields



		|


