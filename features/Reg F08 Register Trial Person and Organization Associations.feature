 @Global @Reg 
 Feature: Reg F08 Register Trial Person and Organization Associations 
 As a CTRP User, I can associate a Lead Organization/Principal Investigator with a Clinical Trial

   Scenario Outline:#1 I can associate a Lead Organization/Principal Investigator with a Clinical Trial
    Given I have selected the option to register a trial <trialType>
     And I am on the Register Trial Lead Organization/Principal Investigator screen
     When I have performed a Lead Organization look-up in Search Organization
     And I have selected an Organization as the trial's Lead Organization
     And I have selected a person look-up in Search persons
     And Selected persons name will be displayed as Last Name, First Name as the trial's Principal Investigator
     Then the Register Lead Organization/Principal Investigator section will not indicate any errors during Trial Review

  Examples:
      |trialType              |
      |National                 |
      |Externally Peer-Reviewed  |
      |Institutional            |

    Scenario Outline:#2 I must associate a Lead Organization/Principal Investigator with a Clinical Trial
   	 Given I have selected the option to register a trial <trialType>
     And I am on the Register Trial Lead Organization/Principal Investigator screen 
     When I have not selected an Organization as the trial's Lead Organization
     And I have not selected a person as the trial's Principal Investigator 
     Then the Register Trial Lead Organization/Principal Investigator screen will indicate errors as:
     
      |Lead Organization is required         |
      |Principal Investigator is required |

  Examples:
    |trialType              |
    |National                 |
    |Externally Peer-Reviewed  |
    |Institutional            |

   Scenario Outline:#3 I can associate an organization ad the Sponsor/Responsible Party on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Sponsor/Responsible Party screen
     When I have performed a Sponsor organization look-up in Search Organizations
     And I have selected an organization as the trial's Sponsor
     And I have selected the Responsible Party type as:
     
      |Sponsor               |
      |Principal Investigator|
      |Sponsor-Investigator  |

     Then the Register Trial Sponsor/Responsible Party section will not indicate any errors during Trial Review
     
     Examples:
     
     |trialType              |
     |National                 |
     |Externally Peer-Reviewed  |
     |Institutional            |
   @runthis
    Scenario Outline:#4 I must associate an organization ad the Sponsor/Responsible Party on a clinical trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Sponsor/Responsible Party screen
    When I have not selected an organization as the trial's Sponsor from the lookup
    And I have not selected the Responsible Party type as:
    
      |Sponsor               |
      |Principal Investigator|
      |Sponsor-Investigator  |
     
    Then the Register Trial Sponsor/Responsible Party section will indicate errors during Trial Review as:
    
    
      |Sponsor is required|
      | "Responsible Party is required"              |

     When I select the Responsible Party type as the Sponsor
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
  
     |trialType              |
     |National                 |
     |Externally Peer-Reviewed  |
     |Institutional            |


     

    Scenario Outline:#5 I can associate an organization as the Funding Source on a clinical trial
    Given I have selected the option to Register a trial <trialType>
    And I am on the Register Trial Funding Source screen
     When I have perfomed an organization look-yp
     And I have selected one or more organizations as the trial's Funding Source
     And I have entered a trial's Program Code
     Then the Register Trial Funding Source screen will not indicate any errors during Trial Review

  Examples:
      
     |trialType              |
     |National                 |
     |Extenally Peer-Reviewed  |
     |Institutional            |

     Scenario Outline:#6 I must associate one or more organizations as the Funding Source on a clinical trial
    Given I have selected the option to Register a trial <trialType>
    And I am on the Register Trial Funding Source screen 
    When I have not entered one or more organizations as the trial's Funding Source 
     Then The Register Trial Funding Source will indicate a error as "Select the Funding Source"

  Examples:

     |trialType              |
     |National                 |
     |Extenally Peer-Reviewed  |
     |Institutional            |




