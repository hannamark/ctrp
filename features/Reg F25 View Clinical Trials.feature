@Reg @global
Feature: Reg F25 View Clinical Trials
As any CTRP User, I can view a CTRP clinical trial record after a Clinical Trial Search

  Scenario: #1 I can view my clinical trials registered in CTRP when initially submitted
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "My Trials"
      And CTRP displays all trials where I am listed as a Trial Owner 
      And the trials match the trial search criteria
      And I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
  
     
      |Trials Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor/Responsible Party  |
      |Data Table 4 Information  |
      |Status/Dates  |
      |FDA IND/IDE Information for applicable trials  |
      |NIH Grant Information (for NIH funded Trials)  |
      |Regulatory Information |
      |Trial Related Information  |
     
    
     
  
  Scenario: #2 I can search all clinical trials registered in CTRP when initially submitted
    Given I am logged into the CTRP Registration application
      And I am on the Search Clinical Trials Screen
     When I select the option to search "All Trials"
      And CTRP displays all trials that match the trial search criteria
      And I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details Type
     
      |Trials Identifiers  |
      |Trial Details  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Data Table 4 Information  |
      |Status/Dates  |
   
  Scenario: #3 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for trials where I am listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
      
      |Trials Identifiers  |
      |Amendments Details  |
      |Other Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Sponsor/Responsible Party  |
      |Data Table 4 Information  |
      |Status/Dates  |
      |FDA IND/IDE Information for applicable trials  |
      |NIH Grant Information (for NIH funded Trials)  |
      |Regulatory Information |
      |Trial Related Information  |
     
     Scenario: #4 Rules for Clinical Trial Record view after Amendment submission 
    Given I am on the Clinical Trial Search Results screen for all trials where I am not listed as a trial owner
    When I select a trial from the Clinical Trial Search Results
     Then I will be able to view the Trial Details type
     
      |Trials Identifiers  |
      |Amendment Details  |
      |Other Identifiers  |
      |Trial Details  |
      |Lead Organization/Principal Investigator  |
      |Data Table 4 Information  |
      |Status/Dates  |
      
      
       Scenario: #5 Trial Identifiers viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Identifiers type 
     
       
      |NCI Trial Identifier  |
      |Lead Organization Trial Identifier  |
      |ClinicalTrials.gov Identifier  |


     
       Scenario: #6 Amendment Details Viewed Fields
    Given I am on the Trial Details screen
     And I will view the Amendment Details type 
        
         
      |Amendment Number  |
      |Amendment Date  |
      
      
        Scenario: #7 Trial Details viewed fields
    Given I am on the Trial Details screen
     And I will view the Trial Details type
     
       
      |Title  |
      |Phase  |
      |Trial Type  |
      |Primary Purpose  |
      |Secondary Purpose  |
      |Accrual Disease Terminology |


  Scenario: #8 Lead Organization/Principal Investigator viewed fields
    Given I am on the Trial Details Screen
     And I will view the Lead Organization/ Principal Investigator type

       
      |Lead Organization  |
      |Principal Investigator  |


  Scenario: #9 Data Table 4 Information viewed fields
  Given I am on the Trial Details Screen
   And I will view Data Table 4 Information type
   
      |Data Table 4 Funding Sponsor Type  |
      |Data Table 4 Funding Sponsor/Source |
      |Program Code  |

     Scenario: #10 Status/Dates viewed fields
    Given I am on the Trial Details Screen
    And I will view Status/Dates type
    
    
      |Current Trial Status  |
      |Why the Study Stopped  |
      |Current Trial Status Date  |
      |Trial Start Date  |
      |Primary Completion Date  |
      |Completion Date  |

      Scenario: #11 FDA IND/IDE Information for applicable trials viewed fields
    Given I am on the trial Details screen
     And I will view the FDA IND/IDE Information for applicable trials type
     
      |IND/IDE Type  |
      |IND/IDE Number  |
      |IND Grantor  |
      |IND/IDE Holder Type  |
      |NIH Institution, NCI Division/Program Code  |
      |Has Expanded Access  |
      |Expanded Access Type  |
      |Exempt Indicator  |

     
      Scenario: #12 NIH Grant Information (for NIH funded Trials) viewed fields
    Given I am on the trial Details screen
     And I will view the NIH Grant Information (for NIH funded Trials) type
     
      |Funding Mechanism  |
      |NIH Institute Code  |
      |Serial Number  |
      |NCI Division/Program Code  |

       Scenario:#13 Regulatory Information Viewed fields 
    Given I am on the trial Details screen
    And I will view the Regulatory Information type
    
    
      |Trial Oversight Authority Country  |
      |Trial Oversight Authority Organization Name  |
      |FDA Regulated Intervention Indicator  |
      |Section 801 Indicator  |
      |Delayed Posting Indicator  |
      |Data Monitoring Committee Appointed Indicator  |

  Scenario: #14 Trial Related Documents viewed
    Given I am on the trial Details screen
     And I will view Trial Related Documents type
     
      |Protocol Document  |
      |IRB Approval Document  |
      |Change Memo Document  |
      |TSR  |

     




 

  



