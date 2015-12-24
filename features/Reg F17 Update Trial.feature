@Global @Reg
Feature: Reg F17 Update Trial

As a CTRP User, I can update information on a trial that does not require IRB approval or an amendment

Scenario: #1 I search my trials and select the update option
Given I am in the CTRP Registration applicatin
And I have selected the option to search my trials in CTRP 
And I am the Trial Owner
When the Update option is enabled on one of my trials
And I have selected the Update option
Then all trial information will be displayed as in Registration with only Update fields enabled Type
      
      |Other Trial Identifier Field   |
      |NIH Grant Information Section  |
      |Trial Status Section           |
      |Trial Related Documents        |


And I will be able to add Other Protocol Identifiers
And I will be able to add Grant Information
And I will be able to update trial status and trial status dates and edit trial status history
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to update participating site status
And I will be able to review existing Trial Related Documents type

      |Original Protocol         |
      |Original IRB Approval     |
      |Original Informed Consent |
      |Other                     |
      |TSR                       |

And I will be able to add Trial Related Document type Other
And I will be able to review or cancel my update

Scenario: #2 I search my trials and select the update option
Given I am in the CTRP Registration application
And I have selected the option to search my trials in CTRP 
And I am the Trial owner
And I have selected the Update option
And I have made enabled Trial Updates
When I select the review option
Then CTRP will check the updated information 
And if there are no errors, I can submit the trial with indication of a successful submission
And the information updates will be registered in CTRP
And the CTRO will be able to acknowledge or reject the Update to trial information


  Scenario: #3 Documents Displayed during Update after an Original Submission
    Given I am in the CTRP Registration Application 
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option before when Submission Accepted milestone is entered
     Then the documents type will be displayed during update
     
     
      |Original Protocol  |
      |Original IRB Approval  |
      |Original Informed Consent  |
      |Other-A  |
      |Other-B  |

      When I have selected the Update option when initial Abstraction Verified Milestone is entered
      Then the documents type will be displayed during update
       
      |Original Protocol  |
      |Original IRB Aproval  |
      |Original Informed Consent  |
      |Other-A  |
      |TSR     |
      |Other-B  |


    
    
      Scenario:#4 Documents Displayed during Updated after an Amendment
    Given I am in the CTRP Registration Application 
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option when Amendment Submission Accepted is entered
     Then the documents type will be displayed during update
     
     
      |Revised Protocol  |
      |Change Memo  |
      |IRB Approval  |
      |Other-C |
      |Other-D  |

     When I have selected the Update option when Initial Abstraction Verified Milestone is entered for an Amendment
     Then the documents type will be displayed during update
     
      |Revised Protocol  |
      |Change Memo  |
      |IRB Approval  |
      |Other-C  |
      |TRS #2  |
      |Other-D  |

       