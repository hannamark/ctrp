@Reg @global
Feature: Reg F26 Available Action Rules
As any CTRP User, I can select available Actions

  Scenario:#1 Available rules for Registered Trials when I am a Trial Owner 
    Given I am logged into the CTRP Registration application
    And I am on My Clinical Trials search Results
    When the Trial Processing Status is Any Processing Status type
     
     
      |Submitted  |
      |Amendment Submitted  |
      |Accepted  |
      |Rejected  |
      |Abstracted  |
      |Verification Pending  |
      |Abstraction Verified Response  |
      |Abstraction Verified No Response  |
      |On-Hold  |
      |Submission Terminated  |
      |Submission Reactivated  |

     Then The available Actions
     
      |Update	  |
      |Change Status  |

     When the Trial Processing Status is
     
     
      |Abstraction Verified |
      
      Then the Available Actions type display
      
      |Update  |
      |Amend  |
      |Change Status  |
      |View TSR  |
      |View XML  |
      |Verify Data  |

      

     
       Scenario:#2 Available Rules for Registered Trials when I am not the Trial Owner
    Given I am logged into the CTRP Registration application
    And I am on the Clinical Trials search Results 
    And I am not the Trial Owner
    When I select Trial Actions
    And the Trial Processing Status is any processing status type
      
      |Submitted  |
      |Amendment Submitted  |
      |Accepted  |
      |Rejected  |
      |Abstracted  |
      |Verification Pending  |
      |Abstraction Verified Response  |
      |Abstraction Verified No Response  |
      |On-Hold  |
      |Submission Terminated  |
      |Submission Reactivated  |
    
    Then No actions will be available 



  Scenario: #3 Available Actions when Trial is Imported from ClinicalTrials.gov
    Given I am logged into the CTRP Registration application
    And I am on the Clinical Trials search Results
    And the the Trial Processing Status is any processing status type
      
      |Submitted  |
      |Amendment Submitted  |
      |Accepted  |
      |Rejected  |
      |Abstracted  |
      |Verification Pending  |
      |Abstraction Verified Response  |
      |Abstraction Verified No Response  |
      |On-Hold  |
      |Submission Terminated  |
      |Submission Reactivated  |
    
     When my participating Site is added to the trial
     Then the only available action is to update my participating site in the trial
     When my participating site is not added to the Trial 
     Then the only available Action is to add my participating Site to the trial

