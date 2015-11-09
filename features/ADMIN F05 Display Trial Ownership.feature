@Admin @Global 
Feature: ADMIN F05 Display Trial Ownership

As a CTRP User with Administration privileges, I can grant Trial Ownership privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users that are affiliated with an Organization in my Family and their Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Display Trial Ownership feature
Then I will see a list of all CTRP Users that are affiliated with an Organization in my Family with this information:
| First Name |
| Last Name |
| Email |
| NCI ID of trial where they are a trial owner |
| Lead Organization Trial ID of the trial |
And the list will display an indicator if the CTRP User will receive eMail notification due to trial processing events
And the list with have the option to remove the person as trial owner

Scenario: #2 I can view CTRP Users that are affiliated with an Organization in my Family and their Trial Ownership privileges
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Display Trial Ownership feature
And I see a list of all CTRP Users that are affiliated with an Organization in my Family with this information:
| First Name |
| Last Name |
| Email |
| NCI ID of trial where they are a trial owner |
| Lead Organization Trial ID of the trial |
Then I will be able to search this list of users by these search criteria:
| First Name |
| Last Name |
| Email |
| NCI ID of trial |
And the list will display on the Trial Owners that match the search criteria

Scenario: #3 I can remove Trial Ownership priviledges from CTRP Users that are affiliated with an Organization in my Family
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Display Trial Ownership feature
And I will see a list of all CTRP Users that are affiliated with an Organization in my Family with this information:
| First Name |
| Last Name |
| Email |
| NCI ID of trial where they are a trial owner |
| Lead Organization Trial ID of the trial |
| Email notificatio indicator |
When I select the option to remove the CTRP User as a trial owner
Then the CTRP User will no longer be listed as a trial owner in CTRP for the selected trial

Scenario: #4 I can remove email notification from CTRP Users that are affiliated with an Organization in my Family
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Display Trial Ownership feature
And I will see a list of all CTRP Users that are affiliated with an Organization in my Family with this information:
| First Name |
| Last Name |
| Email |
| NCI ID of trial where they are a trial owner |
| Lead Organization Trial ID of the trial |
| Email notificatio indicator |
When I select the option to remove email notification for a CTRP Trial Owner on the list
Then the CTRP User will no longer receive eMail notification due to trial processing events


