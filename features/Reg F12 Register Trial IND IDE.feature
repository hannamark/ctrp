@Global @Reg
Feature: Reg F12 Register Trial IND IDE

  As a CTRP User, I can indicate if a trial has an associated IND or IDE and if so, enter information about the IND or IDE
@runthis
  Scenario Outline: #1 I can indicate that the trial does not have an associated IND or IDE
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial IND/IDE Information screen
    When I have selected "No" for the question "Does this trial have an associated IND/IDE?"
    Then the IND/IDE Information section for the trial registration will not indicate any errors during trial review

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  Scenario Outline: #2 I can enter the IND or IDE information for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial IND/IDE Information screen
    And I have selected "Yes" for the question "Does this trial have an associated IND/IDE?"
    When I have selected the IND/IDE Type:
      |IND|
      |IDE|
    And I have entered the IND/IDE number
    And I have selected the IND/IDE Grantor <Grantor> based on IND/IDE type selected <INDIDE>
      |INDIDE  |Grantor  |
      | IND       | CDER      |
      | IND       | CBER      |
      | IDE       | CDRH      |
      | IDE       | CBER      |
    And I have selected the INDIDE Holder Type:
      |Investigator |
      |Organization |
      |Industry     |
      |NIH          |
      |NCI          |
    And I have selected the NIH Institution or NCI Division/Program from a list if the IND/IDE Holder type
      |NIH  |
      |NCI  |
    And I will click on the add button to register IND/IDE information
    Then the IND/IDE Information for the trial registration will not indicate any errors during Trial Review

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  Scenario Outline: #3 I can enter the IND and IDE information for multiple IND or IDE registrations for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial IND/IDE Information screen
    And I have selected "Yes" for the question "Does this trial have an associated IND/IDE?"
    When I have entered the information for an IND/IDE Type
    Then I will be able to select "Add IND/IDE" and enter the information for multiple IND/IDEs

    Examples:
      |trialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |



