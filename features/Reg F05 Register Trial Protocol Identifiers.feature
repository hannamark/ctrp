@Global @Reg
Feature: Reg F05 Register Trial Protocol Identifiers

As a CTRP User, I can Register a Trial's Protocol Identifiers
  @runthis
Scenario Outline: #1c I can enter the different protocol identifiers for a trial
  Given I have selected the option to register a trial <trialType>
  When I have entered the lead organization trial identifier
  And I have entered more than one Other Trial Identifiers and identified the Other Trial Identifier Types:
  |CTEP                        |
  |DCP                         |
  |CCR                         |
  |Other                       |

  Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

  Examples:
    |trialType|
    |National                 |
Scenario Outline: #2 I must enter the lead organization trial identifier
Given I have selected the option to register a trial <trialType>
And I am on the Register Trial Protocol Identifiers screen
When I have not entered the lead organization trial identifier
And I have optionally entered the clinicaltrials.gov trial identifier
And I have optionally entered one or more Other Trial Identifiers
When I click on the Review Trial button
Then the TRegister Trial Protocol Identifiers section will indicate an error "Lead Organization Trial Identifier is Required"

Examples:
  |trialType|
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |