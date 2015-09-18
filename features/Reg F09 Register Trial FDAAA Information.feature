@Global @Reg
Feature: As a CTRP User, I can enter FDAAA required data elements for a trial

Scenario: #1 I can select the trial's information for FDAAA required Regulatory Information for a FDA Regulated Interventional trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected either "Yes" for FDA Regulated Intervention Indicator
And I have selected either "Yes" or "No" for Section 801 Indicator
And I have selected either "Yes" or "No" for Data Monitoring Committee Appointed Indicator
Then the FDAAA required Regulatory Information for the trial will be complete

Scenario: #2 I can select the trial's information for FDAAA required Regulatory Information for a non-FDA Regulated Interventional trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Regulatory Information screen
When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
And I have selected either "No" for FDA Regulated Intervention Indicator
And I have selected either "Yes" or "No" for Data Monitoring Committee Appointed Indicator
Then the FDAAA required Regulatory Information for the trial will be complete
and the Section 801 Indicator will be set to "No"
