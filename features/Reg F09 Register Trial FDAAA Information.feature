  @Global @Reg
Feature: Reg F09 Register Trial Regulatory Information FDAAA

As a CTRP User, I can enter FDAAA required data elements for a trial
  
  Scenario Outline:#1 I can select the Trial's information for FDAAA required Regulatory Information for an FDA Regulated Interventional trial
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Regulatory Information screen
     When I must select one or more of the Trial Oversight Authority Country from a list of all Trial Oversight Authority Country
     And I must select one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And I must have selected"yes"for FDA Regulated Intervention Indicator
     And I must select either "yes" or "No" for Section 801 Indicator
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


Scenario Outline:#2 I can select the Trial's information for FDAAA required Regulatory Information for a non FDA Regulated Interventional trial
   	 Given I have selected the option to register a trial <TrialType>
     And I am on the Register Trial Regulatory Information screen
     When I must have selected one or more of the Trial Oversight Authority Country from a list of all Trial Oversight Authority Country
     And I must have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And I must have selected"No"for FDA Regulated Intervention Indicator
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
     
 

