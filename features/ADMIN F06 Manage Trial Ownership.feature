@Admin
Feature: ADMIN F06 Manage Trial Ownership

As a CTRP User with Administration privileges, I can grant Trial Ownership privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users that are affiliated with an Organization in my Family and manage their Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
Then I can select if I want to manage trial ownership on trials where the Lead Organization or Participating Site is affiliated with my Organizational family 
And I can select one or more CTRP User names that are affiliated with an Organization in my Family from a list with this information displayed:
| First Name |
| Last Name |
| Email |
And I can select from a list of trials where either the Lead Organization or Participating Site is affiliated with my Organizational family, displayed as:
|NCI Trial ID|
|Lead Org ID|
And I can assign one or more of the CTRP Users as trial owner, displayed as:
|Name|
|NCI Trial ID|
|Lead Org ID|


Scenario: #2 I can assign a CTRP Users that are affiliated with an Organization in my Family Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
And I have selected to manage ownership on trials where the Lead Organization is affiliated with my Organizational family
And I have selected one or more CTRP Users from the list of CTRP Users that are affiliated with an Organization in my Family
And I have selected one or more trials from a list of trials where either the Lead Organization is affiliated with my Organizational family
And I have selected the "Assign" trial ownership operation
Then the CTRP Users selected will be assigned trial ownership on the trials selected

Scenario: #2 I can remove Trial Ownership privileges from CTRP Users that are affiliated with an Organization in my Family
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Manage Trial Ownership feature
And I have selected to manage ownership on trials where the Lead Organization or Participating Site is affiliated with my Organizational family
And I have selected one or more trial ownership assignments, displayed as:
|Name|
|NCI Trial ID|
|Lead Org ID|
Then trial ownership privileges will be removed from the CTRP Users selected