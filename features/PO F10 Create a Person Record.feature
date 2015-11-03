@Global
Feature: PO F10 Create a Person Record

Scenario Outline: As a Curator, I can request the creation of a new Person Record in CTRP
Given I am logged in to CTRP PO application
And I know the first name, last name, middle name, with any prefix or suffix, phone or email, and organization affiliation of the Person
And I have complete a Search for Person and not found the Person in CTRP
When I have selected the Add Person function
And I provide the name information of the Person I wish to create
And I provide either the Phone <Phone> or email <Email> of the Person I wish to create
And I have searched Organizations and selected an affiliated organization
And I submit my create request for Person
Then the system should create a Person record that contains a unique PO ID, the person first name, last name, middle name, prefix, suffix, the CTEP ID as Null, the phone <Phone> and/or email <Email>, and the affiliated organization
And the Person status should be Active and the status date should be the current date and time

Examples:
  |Phone      		|  |Email          	|
  |444-555-6666    	|  |test_cuke@PR.com  	|
  |                   	|  |test_cuke@PR.com  	|
  |444-555-6666    	|  |                    |



@PO
Scenario: As a curator, I will receive a warning message for missing fields
  Given I am logged in to CTRP PO application
  And I am on Add Person
  And I click on save person
  Then I should get validation message "First name is Required" for First Name
  And I should get validation message "Last name is Required" for Last Name
  And I should get validation message "Either Phone or Email is Required" for either Phone or Email

@PO
Scenario: As a curator, I will recive a warning message for duplicate names
  Given I am logged in to CTRP PO application
  And I am on Add Person
  And I enter person first name which is duplicate
  And I enter person last name which is duplicate
  Then I should get warning message "Warning: Person exists in the database. Please verify and create a new Person record." for duplicate Person

