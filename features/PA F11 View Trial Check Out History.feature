@PA @global
Feature: PA F11 View Trial Check Out History
Description:  As any CTRP PA User, I can view the Trail Check out history

Scenario: #1 I can View Trial Check Out History for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected View Trial Check Out History
Then the View Trial Check Out History will be displayed and include the following fields ordered accending by by Check Out Date/Time (oldest Date first):
|Check Out Type (administrative or Scientific)|
|Checked Out Date/Time|
|Checked Out User|
|Checked In Date/Time|
|Checked In User|
|Check In Comment|

