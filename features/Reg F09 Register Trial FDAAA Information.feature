@Global @Reg
Feature: Reg F09 Register Trial Regulatory Information FDAAA

  As a CTRP User, I can enter FDAAA required data elements for a trial

  Scenario Outline:#1 I can select the Trial's information for FDAAA required Regulatory Information for an FDA Regulated Interventional trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Regulatory Information screen
    And I have noted that "The information in this section is REQUIRED to enable ""Upload from NCI CTRP"" in ClinicalTrials.gov:"
    When I have selected the Responsible Party type as:
      |Sponsor               |
      |Principal Investigator|
      |Sponsor-Investigator  |
    And I have selected one or more of the Trial Oversight Authority Country and Organization Names from the provided list
    And the FDA Regulated Intervention Indicator will be defaulted to the "N/A" setting
    And I have the option to change the defaulted "NA" setting to either "yes" or "No"for FDA Regulated Intervention Indicator
   And I have selected "Yes", "No", "NA" for Section 801 Indicator
   And I have selected "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
    Then the Register Trial Regulatory Information section will not indicate any errors during Trial Review

    Examples:
      |trialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #2 Responsible Party Rules - When the Responsible Party is the Sponsor
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Regulatory Information screen
    When I select the Responsible Party type as the "Sponsor"
    Then the Sponsor Organization will be recorded as the Responsible Party

    Examples:
      |trialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#3 When the Responsible Party is the Principal Investigator rule
    Given I have selected the option to register a trial <trialType>
    When I select the Responsible Party type as the "Principal Investigator"
    Then the Principal Investigator selected will be recorded as the Responsible Party Investigator
    And the Investigator Title will be displayed as "Principal Investigator"
    And the Investigator Title may be edited
    And the Investigator Affiliation will be the Sponsor Organization
    And the Investigation Affiliation can be changed

    Examples:
      |trialType                |
      |National                 |


  Scenario Outline:#3a Principal Investigator Rule
    Given I have selected the option to register a trial <trialType>
    When I select the Responsible Party type as the "Principal Investigator"
    Then The field type must be entered
      |The Investigator            |
      |The Investigator Title      |
      |The Investigator Affiliation|
    When the field type is not entered
    Then the error type will be displayed
      |Investigator is required            |
      |Investigator Title is required      |
      |Investigator Affiliation is required|

    Examples:
      |trialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#4 When the Responsible Party is the Sponsor-Investigator
    Given I have selected the option to register a trial <trialType>
    When I select the Responsible Party type as the "Sponsor-Investigator"
    Then the Principal Investigator will be populated in Investigator field as default
    And I have performed a person search in Search Persons for Investigator
    And I have selected a person as an Investigator
    Then the person selected will be recorded as the Sponsor-Investigator
    And the Investigator Title will be displayed as "Principal Investigator"
    And the Investigator Title may be edited
    And the Investigation Affiliation will be the Sponsor Organization
    And the Investigation Affiliation cannot be changed

    Examples:
      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline: #4a The Sponsor-Investigator Rules
    Given I have selected the option to register a trial <trialType>
    When I select the Responsible Party type as the "Sponsor-Investigator"
    Then The field type must be entered
      |Investigator            |
      |Investigator Title      |
      |Investigator Affiliation|
    When the field type is not entered
    Then the error type will be displayed
      |Investigator is required            |
      |Investigator Title is required      |
      |Investigator Affiliation is required|

    Examples:
      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |


  Scenario Outline:#5 I can select the Trial's information for FDAAA required Regulatory Information for a non FDA Regulated Interventional trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Regulatory Information screen
    When I have selected "No" for FDA Regulated Intervention Indicator
    And I have selected "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
    Then the required Regulatory Information for the trial will be associated with the trial
    And the Section 801 Indicator will be set to "No"
    When I have selected "Yes" for FDA Regulated Intervention Indicator
    And I have selected "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
    Then I can select "Yes" or "No" for Section 801 Indicator
    
    
   
    Examples:
      |trialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#6 Rules for Duplicate Trial Oversight Authority Country and Organization Names
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Regulatory Information screen
    And I have selected one or more of the Trial Oversight Authority Country and Organization Names from the provided list
    When I add a duplicate Trial Oversight Authority and Organization Names
    Then the Register Trial Regulatory Information section will indicate duplicate errors during Trial Review

    Examples:
      |trialType                |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

