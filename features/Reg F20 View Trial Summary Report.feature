@Global @Reg
Feature: Reg F20 View Trial Summary Report

As a CTRP User, I can view my trial Trial Summary Report (TSR)

Scenario: #1 I search My trials and select the View TSR 
Given I am in the CTRP Registration applicatin
And I have selected the option to view My trials in CTRP (trials where I am listed as owner)
When I select Action from the Available Actions
And the current processing status type is displayed

      |Abstraction Verified Response   |
      |Abstraction Verified No Response  |

Then I the View TSR option will available
When I click on the view TSR option
Then the TSR document will downloaded 

TSR Document listed under the functional/Registration file in the shared drive

