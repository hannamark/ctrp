@Global @Reg
Feature: Reg F23 Request New Organization

 As a CTRP User I can request a new origanization in CTRP

Scenario: #2 I can request the creation of a new organization
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
And I searched for the desired organization
When I do not find the organization that I need for registration
Then I can request the creation of a new organization by providing the Organization Name, Street Address, City, State, Country, phone, and email
And requesting that a new organization be created