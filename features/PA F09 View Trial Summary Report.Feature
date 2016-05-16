@Global @PA
Feature: PA F09 View Trial Summary Report

As a CTRP User, I can view a trial Trial Summary Report (TSR)

Scenario: #1 I can view a Trial Summary Report (TSR)
Given I am in the CTRP application
And I have selected a trial in CTRP 
When I select the View TSR option
Then the TSR document will downloaded 
And the file name will be "TSR_""CTRP Trial ID""_""Current Date YYYY-MM-DD""-"Current Time HHMM(24hr)""_""Current Submission Type (O for original and A for amendment""_""Amendment Number (for amendments)"<examples>

|Examples:|
|TSR_NCI-2014-00171_2016-05-03-1230_O.rtf| 
|TSR_NCI-2014-00171_2015-05-11-1812_A12.rtf| 
|TSR_NCI-2016-01111_2016-05-02-0230_Aamendment#4b.rtf| 