@Global @Reg
Feature: Reg F12 Register Trial IND IDE

As a CTRP User, I can indicate if a trial has an associated IND or IDE and if so, enter information about the IND or IDE

Scenario: #1 I can indicate that the trial does not have an associated IND or IDE
Given I have selected the option to register a trial <TrialType>
And I am on the Register Trial IND/IDE Information screen
When I have selected "No" for the question "Does this trial have an associated IND or IDE?"
Then the IND/IDE Information section for the trial registration will not indicate any errors during trial review
      
      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |

Scenario: #2 I can enter the IND or IDE information for a trial
Given I have selected the option to register a trial <TrialType>
And I am on the Register Trial IND/IDE Information screen
And I have selected "Yes" for the question "Does this trial have an associated IND or IDE?"
When I have selected the IND/IDE Type:
  
      |IND|
      |IED|
  
And I have entered the IND/IDE number
And I have selected the IND/IDE Grantor <Grantor> based on IND/IDE type selected <IND/IDE>
      
      |<IND/IDE>  |<Grantor>  |
      | IND       | CDER      |
      | IND       | CBER      |
      | IDE       | CDRH      |
      | IDE       | CBER      |

And I have selected the IND/IDE Holder Type:
      
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
      
      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


Scenario:#2 FDA IND/IDE Information Validation check rule
    Given I am on The FDA IND/IDE Information for applicable trials
    When I have NOT entered <IND/IDETypes>
      |<IND/IDETypes>  |
      |IND/IDE Types  |
      |IND/IDE Number  |
      |IND/IDE Grantor  |
      |IND/IDE Holder Type  |

     And I have clicked on the Add IND/IDE Button
     Then A message will be displayed "Please choose an IND/IDE Type,enter an IND/IDE Number, select an IND/IDE Grantor and select an IND/IDE Holder Type"

      
Scenario Outline: #3 I must enter FDA IND/IDE Information for applicable trials
    Given I have selected the option to register a trial <TrialType>
    And I am on the FDA IND/IDE Information for applicable trials
    When I have not selected an IND/IDE Types
    And I have not entered IND/IDE Number
    And I have not selected an IND/IDE Grantor
    And I have not selected an IND/IDE Holder Type
     Then the Register Trial FDA IND/IDE Information for applicable trials section will indicate an error type" FDA IND/IDE Information Required"

Examples: 


      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |




Scenario: #4 I can enter the IND and IDE information for multiple IND or IDE registrations for a trial
Given I have selected the option to register a trial <TrialType>
And I am on the Register Trial IND/IDE Information screen
And I have selected "Yes" for the question "Does this trial have an associated IND or IDE?"
When I have entered the information for an IND/IDE Type
        |IND|
        |IED|
Then I will be able to select "Add IND/IDE" and enter the information for multiple IND/IDEs

      |TrialType                 |
      |National                  |
      |Externally Peer-Reviewed  |
      |Institutional             |


  

