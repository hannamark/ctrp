@Global @Reg
Feature: Reg F04 Register Trial Study Source

As a CTRP User, I can select the Study Source of the trial I will register

Scenario Outline: #1 I can select the option to register a protocol for a National, Externally Peer-Reviewed, or Institutional trial
  Given I have selected the option to register a trial <trialType>
  Then I am on the Register Trial screen
  And CTRP will display the required registration elements for a complete protocol registration for the selected <Trial Type> (Features Reg F5 - Reg F15) (Feature F13)

  Examples:
  |trialType               |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |


Scenario: #2 I can select the option to import trial information for an Industrial, Other, or Expanded Access trial
  Given I am logged into the CTRP Registration application
  And I am on the Register Trial screen
  When I select the option to register an Industrial, Other, or Expanded Access trial
  Then I will be able to import the trial from ClinicalTrials.gov (Feature F16)


