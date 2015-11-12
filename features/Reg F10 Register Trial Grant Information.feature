@Global @Reg
Feature: Reg F10 Register Trial Grant Information

As a CTRP User, I can indicate if a trial has an associated grant and if so, enter information about the grant

Scenario: #1 I can indicate that the trial does not have an associated grant
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
When I have selected "No" for the question "Is this trial funded by a NCI Grant?"
Then the required Grant Information for the trial will be complete

Scenario: #2 I can enter the NCI Grant information for a trial using a Grant Serial Number look-up
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
And I have selected "Yes" for the question "Is this trial funded by a NCI Grant?"
When I have selected the Funding Mechanism from a list
And I have selected the Institute Code from a list
And I have selected the NCI Division/Program Code from a list
And I have entered a partial Grant Serial Number
Then CTRP will search the IMPACII database view of Grant Information for serial numbers that contain the institute code and partial Grant Serial Number
And CTRP will display Grant Serial Number, Organization, Project Title, and Contact Principal Investigator that match the partial Grant Serial Number
And I can select from the Grant Serial Numbers displayed or I can enter a different Grant Serial Number

Scenario: #3 I can enter the NCI Grant information for multiple Grants for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Grant Information screen
And I have selected "Yes" for the question "Is this trial funded by a NCI Grant?"
When I have entered the information for a NCI Grant
Then I will be able to select "Add Grant" and enter the information for multiple Grants
