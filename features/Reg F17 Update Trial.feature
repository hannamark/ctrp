@Global @Reg
Feature: Reg F17 Update Trial

As a CTRP User, I can update information on a trial that does not require IRB approval or an amendment

Scenario: #1 I search my trials and select the update option
Given I am logged into the CTRP Registration application
And I have selected the option to search my trials in CTRP
And I am the Trial Owner
When the Update option is enabled on one of my trials
And I have selected the Update option
Then all trial information for the latest submission will be displayed as in Registration with only Update fields enabled Type
      
      |Other Trial Identifier Field   |
      |NIH Grant Information Section  |
      |Trial Status Section           |
      |Trial Dates                    | 
      |Trial Related Documents        |


And I will be able to Update Other Protocol Identifiers to allow both additional Other Protocol Identifiers as well as removing existing
And I will be able to Update Grant Information to allow both additional Grants as well as removing existing
And I can delete existing and add new Trial Status and Trial Status Dates
And I will be able to update trial start date, primary completion date, and completion date with actual or anticipated dates
And I will be able to review all existing Trial Related Documents type
And I will be able to add all Trial Related Documents 
And the added documents should be added to the existing documents
When the trial has errors 
Then the Review Button will be displayed to Review the errors
When the trial has no errors
Then the Submit button will be displayed
And I can click on the submit button
And  my trial will be updated in the CTRP application
And the Submission source is a Cancer Center 
And the Submission method is Registry
And Submission type is Update


  Scenario: #1a I can Update Participating Sites Recruitment Status and Date
Given I am logged into the CTRP Registration application
And I search for a Trial which has been accepted and has a Participating site added to it
And I have selected the Update option
Then I can view participating site section with Participating Name, Participating Sites Recruitment Status and Date
And I can Update Participating Sites Recruitment Status and Date

Scenario: #1b I can reset entered updates
Given I am logged into the CTRP Registration application
And I am on the Trial Update screen
When I update fields on the Trial Update screen
And I click on the reset button
Then all fields updated will be cancelled 
And the new changes will not be saved


Scenario: #2 I search my trials and select the update option
Given I am logged into the CTRP Registration application
And I have selected the option to search my trials in CTRP 
And I am the Trial owner
And I have selected the Update option
And I have made enabled Trial Updates
When I select the review option
Then CTRP will check the updated information 
And if there are no errors, I can submit the trial with indication of a successful submission
And the information updates will be registered in CTRP
And the CTRO will be able to acknowledge the Update to trial information
And the "Current Verification Date" will be updated in the Trial Data Verification Screen
And an email entitled "Updated Trial" will be sent to the trial owner (Locate Email list on the shared drive under Functional/registration as: CTRP System Generated Emails)


  Scenario: #3 Documents Displayed during Update after an Original Submission
    Given I am logged into the CTRP Registration application
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option before when Submission Accepted milestone is entered
     Then the documents type will be displayed during update
     
     
      |Original Protocol  |
      |Original IRB Approval  |
      |Original Informed Consent  |
      |Other-A  |
      |Other-B  |

      When I have selected the Update option when Trial Summary Report Date Milestone is entered
      Then the documents type will be displayed during update
       
      |Original Protocol  |
      |Original IRB Aproval  |
      |Original Informed Consent  |
      |Other-A  |
      |Original TSR     |
      |Other-B  |


    Scenario:#4 Documents Displayed during Updated after an Amendment
    Given I am logged into the CTRP Registration application
     When I have selected the option to search My Trials in CTRP
     And I am the Trial Owner
     When I have selected the Update option when Amendment Submission Accepted is entered
     Then the documents type will be displayed during update
      
      |Current Protocol |
      |Current Change Memo (or Highlighted Protocol Document) |
      |Current IRB Approval  |
      |Other-C |
      |Other-D  |
     When I have selected the Update option when Trial Summary Report Date Milestone is entered for an Amendment
     Then the documents type will be displayed during update
     
      |Current Protocol  |
      |Current Change Memo  |
      |Current IRB Approval  |
      |Other-C  |
      |Current TSR (Generated after Trial Summary report Date Milestone)   |   
      |Other-D  |

         Scenario:#5 Delete option should not be included for existing documents 
    Given I am logged into the CTRP Registration application
     When I update a trial 
     Then I can see the most current documents
     And the delete option should not be included for existing documents

