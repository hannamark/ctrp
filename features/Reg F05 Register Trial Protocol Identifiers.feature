  Feature: Reg F05 Register Trial Protocol Identifiers

As a CTRP User, I can Register a Trial's Protocol Identifiers

Scenario Outline: #1 I can enter the different protocol identifiers for a trial
  Given I have selected the option to register a trial <trialType>
  And I am on the Register Trial Protocol Identifiers screen
  When I have entered the lead organization trial identifier
  And I have entered more than one Other Trial Identifiers and identified the Other Trial Identifier Types:
  |ClinicalTrials.gov Identifier          |
  |CTEP Identifier                        |
  |DCP Identifier                         |
  |CCR Identifier                         |
  |Duplicate NCI Identifier               |
  |Obsolete ClinicalTrials.gov Identifier |
  |Other Identifier                       |
  Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

  Examples:
    |trialType|
    |National                 |
    |Externally Peer-Reviewed |
    |Institutional            |


Scenario Outline: #2 I must enter the lead organization trial identifier
Given I have selected the option to register a trial <trialType>
And I am on the Register Trial Protocol Identifiers screen
When I have not entered the lead organization trial identifier
When I click on the Review Trial button
Then the Register Trial Protocol Identifiers section will indicate an error "Lead Organization Trial Identifier is Required"

Examples:
  |trialType|
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |

    Scenario Outline: #3 Duplicate and format rules for Other Trial Identifier 
    Given I have selected the option to register a trial <trialType>
     And I am on the Register Trial Protocol Identifiers screen
     Then I should not be allowed to enter Duplicate Identifiers of the same type
     And I should not be allowed to enter the "Other Identifier" with duplicate Protocol ID
     And I should check for valid ClinicaTrials.gov Identifier format as NCT followed by 8 numeric characters <NCT00000000>

  Examples:
    |trialType|
    |National                 |
    |Externally Peer-Reviewed |
    |Institutional            |

