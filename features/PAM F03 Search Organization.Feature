@Global @PA
Feature: PAM F03 Search Organization

As a CTRP PA User with the "Read Only" role or the "Abstractor" roles, I am able to Search Organizations by various criteria

Scenario: #1 I am able to search for organizations
Given I am logged into the CTRP as a PA user
And I have selected the option "Search Organizations"
When I selected one or more of the values to search all trials
|Organization Name|
|Family Name|
|Source Status|
|Source Context|
|Source ID|
|City|
|State|
|Country|
|Zip|
|Phone|
|E-mail|
|Processing Status (Pending, Complete)|
And I submit my search request by selecting search
Then the system should display the organizations that have those parameters
And the Organization Search Results will display:
      |CTRP Organization ID|
      |CTEP ID|
      |Organization Name|
      |Source Status|      
      |Source Context|
      |Source ID|
      |Organization Family|
      |Address 1|
      |Address 2|
      |City|
      |State|
      |Country|
      |Postal Code|
      |Email|
      |Phone Number|
      |Phone Extension|
      |Fax Number|
      |Aliases|
      |Processing Status (Pending, Complete)|
      |Last Updated By|
      |Last Updated Date|
And the system will display the list of organizations ordered assending alphanumeric by organization name

Scenario: #2 I am able to view organizations details
Given I am logged into the CTRP PA user
When I have selected an Organizations
Then the system should display the organizations details 
      |CTRP Organization ID|
      |CTEP ID|
      |Organization Name|
      |Aliases|
      |Organization Family|      
      |Source Status|      
      |Source Context|
      |Source ID|
      |Address 1|
      |Address 2|
      |City|
      |State|
      |Country|
      |Postal Code|
      |Email|
      |Phone Number|
      |Phone Extension|
      |Fax Number|
      |Processing Status (Pending, Complete)|
      |Last Updated By|
      |Last Updated Date|

