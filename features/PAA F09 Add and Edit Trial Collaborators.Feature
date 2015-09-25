@PA @global
Feature: As any CTRP PA User, I can add and edit Trial Collaborators

Scenario: #1 I can add a Collaborators to a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, Org, IRB) are displayed
Then I can select an organization from the list or search for an organization
And the selected organization will be associated to the trail as a Trial Collaborators
And the system will list 
|CTRP Organization ID|
|Collaborator Name|
|Funding Source| 

Scenario: #2 I can Edit a Collaborator for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I have selected a collaborator 
Then I can select a functional role for the collaborator from the list:
|Funding Source|
|Agent Source| 
|Laboratory|
Then the collaborator and the functional role will be associated with the trial along with the collaborator status and CTRP Organization ID
And the system will list 
|CTRP Organization ID|
|Collaborator Name|
|Funding Source| 

Scenario: #3 I can Delete one or more Collaborator for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I have selected one or more collaborators
And have selected Delete  
Then the collaborator(s) will be unassociated with the trial

Scenario: #4 Save Trial Collaborators 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When select save 
Then the information entered or edited on the Trial Collaborators screen will be saved to the trial record

Scenario: #5 Cancel Trial Collaborators
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When select Cancel
Then the information entered or edited on the Collaborators screen will not be saved to the trial record 
And the screen will be refreshed with the existing data
