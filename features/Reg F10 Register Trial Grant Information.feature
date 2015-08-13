@Global @Reg
Feature: As a CTRP User, I can indicate if a trial has an associated grant and if so, enter information about the grant

Scenario: #1 I can indicate that the trial does not have an associated grant
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
When I have selected "No" for the question "Is this trial funded by a NCI Grant?"
Then the FDAAA required Grant Information for the trial will be complete

Scenario: #2 I can enter the NCI Grant information for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
And I have selected "Yes" for the question "Is this trial funded by a NCI Grant?"
When I have selected the Funding Mechanism from a list
And I have selected the Institute Code from a list
And I have selected the NCI Division/Program Code from a list
And I have entered the Grant Serial Number
Then the FDAAA required Grant Information for the trial will be complete

Scenario: #3 I can enter the NCI Grant information for a trial using a Grant Serial Number look-up
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
And I have selected "Yes" for the question "Is this trial funded by a NCI Grant?"
When I have selected the Funding Mechanism from a list
And I have selected the Institute Code from a list
And I have selected the NCI Division/Program Code from a list
And I have entered a partial Grant Serial Number and selected a Serial Number from the list
Then the FDAAA required Grant Information for the trial will be complete

Scenario: #4 I can enter the NCI Grant information for multiple Grants for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
And I have selected "Yes" for the question "Is this trial funded by a NCI Grant?"
When I have entered the information for a NCI Grant
Then I will be able to select "Add Grant" and enter the information for multiple Grants
