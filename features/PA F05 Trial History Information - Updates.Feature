@PA @global
Feature: PA F05 Trial History Information - Updates.Feature

As any CTRP PA User, I can View and Acknowledge Trial History Information for Updates

Scenario: #1 I can view Trial History Information for Updates
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information for Updates Screen
Then I can view the Trial History Information each Update for a trial ordered by date with newest update first:
|Submission Number|
|Update Date|
|Update Source|
|Updated Field|
|Old Value|
|New Value|
|Issue Type|
|Issue Description|
|Issue Description Comment|
|Action (Acknowledge Update)|
|Comment|
|Update Acknowldegement Date|
|User ID (of reviewer)|

Scenario: #2 I can Acknowledge the trial update 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial History Information Updates Screen
When I select the action "Acknowledge"
Then the update will be acknowledged 
And the date of acknowldegement will be recorded
And the User ID will be recorded
And I can optionally add a Comment


