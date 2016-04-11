@Global @Reg
Feature: Reg F23 Request New Organization

 As a CTRP User I can request a new organization in CTRP

Scenario: #2 I can request the creation of a new organization
Given I am logged into the CTRP Registration application
And I have selected the option "Search Organizations"
And I searched for the desired organization
When I do not find the organization that I need for registration
Then I can find the information to request the creation of a new organization by providing the Organization Name, Street Address, City, State, Country, phone, and email
|To request the creation of a new organization record, please contact the Clinical Trials Reporting Office (CTRO) at ncictro@mail.nih.gov |
|The required information is Organization Name, Street Address, City, State, Country, phone, and email |