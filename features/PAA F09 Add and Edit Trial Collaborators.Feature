@PA @global
Feature: PAA F09 Add and Edit Trial Collaborators

As any CTRP PA User, I can add and edit Trial Collaborators

Scenario: #1 I can add a Collaborators to a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
And I have selected organization look-up at the Trial Collaborators screen
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, Org, IRB) are displayed
Then I can select an organization from the list of organization
And the selected organization will be associated to the trail as a Trial Collaborator
And the system will list 
  |PO ID|
  |Name|
  |Deletion|
And the organizations will be displyed orderd assending alphanumeric by Collaborator Name

Scenario: #2 I can edit a Collaborator for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
And the list of collaborators is displayed
Then I can edit the name of a collaborator that does not have a CTRP organization ID
And the system will list
  |PO ID|
  |Name|
  |Deletion|
And the organizations will be displyed orderd assending alphanumeric by Collaborator Name

Scenario: #3 I can Delete one or more Collaborators for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I have selected one or more collaborators
And have selected Delete Collaborator 
Then the collaborator(s) will be unassociated with the trial

Scenario: #4 Save Trial Collaborators 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When select save Collaborator
Then the information entered or edited on the Trial Collaborators screen will be saved to the trial record

Scenario: #5 Cancel Trial Collaborators
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Collaborators screen
When I select Reset Collaborator
Then the information entered or edited on the Collaborators screen will not be saved to the trial record 
And the Trial Collaborators screen will be refreshed with the existing data
