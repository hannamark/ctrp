@Global @PA
Feature: As a CTRP PA User, I am able to Search Organizations by various criteria

Scenario: #1 I am able to search for organizations
Given I am logged into the CTRP as a PA user
And I have selected the option "Search Organizations"
When I selected one or more of the values to search all trials
|PO Organization ID|
|CTEP Organization ID|
|Organization Name|
|Family Name|
|City|
|State|
|Country|
|Zip|
And I submit my search request
Then the system should display the organizations that have those parameters
And the Organization Search Results will display:
|PO Organization ID|
|CTEP Organization ID|
|Organization Name|
|Family Name|
|City|
|State|
|Country|
|Zip|
And the system will display the list of organizations ordered assending alphanumeric by organization name

Scenario: #2 I am able to view organizations details
Given I am logged into the CTRP PA user
When I have selected an Organizations
Then the system should display the organizations details 
|PO Organization ID|
|CTEP Organization ID|
|Organization Name|
|Family Name|
|City|
|State|
|Country|
|Zip|
|Phone #|
|e-Mail|
|Web address|
|Status|