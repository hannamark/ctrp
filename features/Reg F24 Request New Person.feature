Feature: As a CTRP User I can request the creation of a new person record

Scenario: #1 I can request the creation of a new Person record
Given I am logged into the CTRP Registration application
And I have selected the option "Search Person"
And I searched for the desired Person
When I do not find the Person that I need for registration
Then I can request the creation of a new Person record by providing the First Name, Last Name, Email, City, State/Province, Country and Organization Affiliation of the Person
And requesting that a new Person record be created