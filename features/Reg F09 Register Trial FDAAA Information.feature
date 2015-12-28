@Global @Reg
Feature: Reg F09 Register Trial Regulatory Information FDAAA

  As a CTRP User, I can enter FDAAA required data elements for a trial

  Scenario Outline:#1 I can select the Trial's information for FDAAA required Regulatory Information for an FDA Regulated Interventional trial
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Regulatory Information screen
    And I have noted that the information in this section is required to enable "upload from NCI CTRP" IN ClinicalTrials.gov
    When I have selected the Responsible Party type as:

      |Sponsor               |
      |Principal Investigator|
      |Sponsor Investigator  |

    And I have selected one or more of the Trial Oversight Authority Country from a list of all Trial Oversight Authority Country
    And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
    And I have selected"yes"for FDA Regulated Intervention Indicator
    And I have select either "yes" or "No" for Section 801 Indicator
    And I have entered a <entry> for Data Monitoring Committee Appointed Indicator

      |entry |
      |Yes   |
      |No    |
      |Null  |

    Then the Register Trial Regulatory Information section will not indicate any errors during Trial Review

    Examples:


      |TrialType                |
      |National                 |
      |Externally Peer-reviewed |
      |Institutional            |

  Scenario Outline: #2 Responsible Party Rules
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Regulatory Information screen
    When When I select the Responsible Party type as the Sponsor
    Then the Sponsor Organization will be recorded as the Responsible Party
    When I select the Responsible Party type as the Principal Investigator
    Then the Principal Investigator selected will be recorded as the Responsible Party Investigator
    And the Investigator Title will be displayed as Principal Investigator
    And the Title may be edited
    And the Investigator Affiliation will be the Principal Investigator's organization affiliation
    And the Investigation Affiliation can be changed

    When I select the Responsible Party type as the Sponsor-Investigator
    And I have performed a person search in Search Persons
    And I have selected a person as an Investigator
    Then the person selected will be recorded as the Sponsor-Investigator
    And the Investigator Title will be displayed as "Principal Investigator"
    And the Investigator Title may be edited
    And the Investigation Affiliation will be the Sponsor Organization
    And the Investigation Affiliation cannot be changed


    Examples:

      |<TrialType>              |
      |National                 |
      |Extenally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#3 I can select the Trial's information for FDAAA required Regulatory Information for a non FDA Regulated Interventional trial
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Regulatory Information screen
    When I have selected one or more of the Trial Oversight Authority Country from a list of all Trial Oversight Authority Country
    And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
    And I have selected"No"for FDA Regulated Intervention Indicator
    And I have noted that Section 801 Indicator is set to "No"
    And I have selected an <entry> for Data Monitoring Committee Appointed Indicator


      |entry |
      |Yes   |
      |No    |
      |Null  |

    Then the Register Trial Regulatory Information section will not indicate any errors during Trial Review


    Examples:


      |TrialType                |
      |National                 |
      |Externally Peer-reviewed |
      |Institutional            |
     


