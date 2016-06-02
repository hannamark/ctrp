@Admin @Global  
Feature: ADMIN F04 Site Administration 

As a CTRP User with Site Administration privileges, I can grant Site Administrator privileges to CTRP Users with the same site affiliation

Scenario: #1 I can view CTRP Users with as a Site Admin
Given I am logged into CTRP 
And I have Site Administrator privileges for my organization
When I select the Site Administration feature (User Management)
Then I will see a list of all CTRP Users that have organization Affiliation to the same Family as my organization affiliation:
|Username|
|First Name |
|Last Name |
|Email |
|Organizational Affiliation |
|Organization Family|
|display an indicator if the CTRP Users have Site Administrator privileges |
|display an indicator if the CTRP Users will receive e-mails|
|Status|


Scenario: #2 I can search for CTRP Users as a Site Admin
Given I am logged into CTRP 
And I have Site Administrator privileges for my organization
When I select the Site Administration feature (User Management)
And I enter search criteria as
|Username|
|Last Name |
|First Name |
|Email |
|Organization (using the organization Type Ahead and includes only organizations in the same Family as my organization affiliation)|
|Family|
|Site Admin Privilege|
|Status|
And I select the Search option
Then I will see a list of all CTRP Users that have organization Affiliation to the same Family as my organization affiliation that match the search criteria, and are Active, and are Not Expired
And the list will be ordered by Last Name and then First name
And the list can be sorted by
|Username|
|Last Name |
|First Name |
|Email |
|Organization|
|Family|
|Site Admin Privilege|
|Status|

Scenario: #3 I can enable Site Administrative privileges for CTRP Trial Submitters with the same site affiliation
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administration feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Site Administrator|
And the CTRP User will be able to access the Administrative features in CTRP.
And an e-mail will be sent to the user (Admin Access e-mail)

Scenario: #4 I can disable Site Administrative privileges for CTRP Site Administrators with the same site affiliation
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administration feature
And I will see a list of all CTRP Users with the same Site Affiliation as I have 
When I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the privileges for the CTRP User to 
|Trial Submitter|
And the CTRP User will not have access the Site Administrative features in CTRP

Scenario: #5 I can inactivate a Trial Submitter when I am a CTRP Site Administrator with the same site affiliation as the trial submitter
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administration feature
And I select a site user
Then the CTRP system will display the user profile for the CTRP User
And I can change the status to inactive
And the system will display a warning message that "The User will no longer be able to Access CTRP"
And the system will determine if the user is an owner of any trials
And display the message that "The trial(s) owned by this user will need to be reassigned to a new owner"
And the system will display the following action buttons
|Save without transferring ownership|
|Transfer ownership|
When I can Select Save without Transferring ownership
Then the account will be inactivated
And the trials owned by the user will have their ownership expired
When I select Transfer Ownership
Then the system will open the trial management screen to allow the site admin to reassign the trials (Feature Admin F06)
And the trials displayed will be for selected user
And the account will not be inactivated

Scenario: #6 Change site affiliation 
Given I am logged into CTRP 
And I have Site Administrator privileges
When I select the Site Administration feature (User Management)
Then I will see a list of all CTRP Users with the same Site Affiliation as I have listing:
And I select a user that has site administrator privileges
Then the CTRP system will display the user profile for the CTRP User
And I can change the organization affiliation for the CTRP User to a different organization by selecting organization look up
And the system will determine if the user is an owner of any trials
And display the message that "The trial(s) owned by this user will need to be reassigned to a new owner"
And the system will display the following action buttons
|Save without transferring ownership|
|Transfer ownership|
When I can Select Save without Transferring ownership
Then the new organization will be assigned to the user
And the user account status will be pending 
When I select Transfer Ownership
Then the system will open the trial management screen to allow the admin to reassign the trials (Feature Admin F06)
And the trials displayed will be for selected user
And the new organization will be assigned to the user

