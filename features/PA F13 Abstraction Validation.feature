@PA @global
Feature: PA F13 Abstraction Validation

As a CTRP PA Abstractor, I can access the Abstraction Validation View the Trial History Information Audit Trail

Scenario: #1 Successful Abstraction Validation for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I select the Abstraction vaidation option
When there are no warnings or errors
Then the 'Abstraction is valid' message displays
And the <ViewButtons> display
|ViewButtons|
|View XML|
|View TSR|
And the milestone????? is set


Scenario: #2 Abstraction Validation with warnings or errors
Given I have selected a Trial
And I select the Abstraction vaidation option
When there are warnings or errors
Then the warning/error with comment displays



