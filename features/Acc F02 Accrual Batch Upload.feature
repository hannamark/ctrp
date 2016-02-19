  Acc @global

Feature: Acc F02 Accrual Batch Upload
As a CTRP Accrual User, I can Upload Accrual Batch file 

  
  Scenario: #1 I can Upload Accrual Batch file
    Given I am logged into the CTRP Accrual Application 
    And I am on the Accrual Batch Upload screen
    And the message "Click Browse and select the ZIP or TXT file that contains the accrual data. Then click Submit." is displayed
    And "No file selected" will be displayed next to the Browse button for the Batch File
     When I click on the browse button to select the ZIP ot TXT file that contains the accrual data
     And I click on the Submit button
     Then the ZIP or TXT file that contains the accrual data will be linked to the selected trial
     When the selected file that contains the accrual data is not a ZIP or TXT file
     Then the error "The batch upload file must be either a plain text file or a zip file." will be displayed

