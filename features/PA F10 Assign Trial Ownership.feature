@Admin @Global 
Feature: PA F10 Assign Trial Ownership

As a CTRP User with Abstractor, Super or Admin privileges, I can grant Trial Ownership privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users that owners of this trial
Given I am logged into CTRP 
And I have Abstractor, Super or Admin privileges
And I have selected a trial
When I select the Assign Trial Ownership feature
Then the system will display all the CTRP User names that are owners of this trial including 
|Last Name, First Name |
|Email |
|Phone, Phone Ext|
|Organization, Address (street, City, State, zip)|
|Family|
|Action (Remove Ownership)|

Scenario: #2 I can assign CTRP Users as owners
Given I am logged into CTRP 
And I have Abstractor, Super or Admin privileges
And I have selected a trial
When I select Assign users as Trial Owners 
Then the system will display a search screen to search for users including 
|Last Name|
|First Name |
|Email |
|Organization|
|Family|
And when I select search
Then the system will display list of active users including
|Last Name|
|First Name |
|Email |
|Organization|
|Family|
|Action (Assign Ownership)|
And I can select one or more users to be assigned owners
And the users will be owners of this trial


Scenario: #3 I can remove CTRP Users as Trial Owners
Given I am logged into CTRP 
And I have Abstractor, Super or Admin privileges
And I have selected a trial
When I select the remove action for one or more users 
Then trial ownership privileges will be removed from the CTRP Users selected for this trial.

