@PA @global
Feature: PAA F03 Add and Edit Regulatory Information

As any CTRP PA User, I can add and edit Regulatory Information (FDAAA)

Scenario: #1 I can add and edit Regulatory Information for a Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected either "Yes" for FDA Regulated Intervention Indicator
And I have selected either "Yes" or "No" for Section 801 Indicator
And I have selected either "Yes" or "No" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated with the trial

Scenario: #2 I can add and edit Regulatory Information for a non-Regulated Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected either "No" for FDA Regulated Intervention Indicator
And I have selected either "Yes" or "No" for Data Monitoring Committee Appointed Indicator
Then the required Regulatory Information for the trial will be associated with the trial
And the Section 801 Indicator will be set to "No"

Scenario: #3 Save Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When select save 
Then the information entered or edited on the Regulatory Information screen will be saved to the trial record

Scenario: #4 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information screen
When select Cancel
Then the information entered or edited on the Regulatory Information screen will not be saved to the trial record 
And the screen will be refreshed with the existing data
