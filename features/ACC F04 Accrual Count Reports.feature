@Acc @global

Feature: Acc F04 Accrual Count Reports
As a CTRP Accrual Submitter, I can download Accrual Count Reports in the CTRP Accrual Application 

  Scenario: #1 I can Download Accrual Count Reports
    Given I am on the CTRP Accrual Application
     When I click on the Accrual Counts on the toolbar
     Then the Accrual Count page displays trials to which I have access with "Accrual Count type"
     And Trials are sorted by NCI Id with newest Trials first
     
     
      |NCI Trial Identifier  |
      |Lead Org Trial Identifier  |
      |ClinicaTrials.gov ID  |
      |Lead Organization  |
      |Participating Site|
      |Participating Site Accrual Count|
      |Trial Accrual Count  |
      |Last Accrual Update Submitted  |
      
      
     And I can filter Accrual Count types by using the filter capabilities on the right end of the column headings
     And I can sort column data by clicking on the arrow displayed on every cloumn heading
     And I can click "CVS" at the botton of the list to download the Accrual Count report as a comma-separated-value text file
     And I can click "Excel" to download the Accrual Count report as an Excel spreadsheet
	 
     
     
  Scenario:#2 Particiapting Site Accrual Count Rules
    Given I am on the Accrual Counts Screen
     When The user is a Trial Owner
     Then Only the Trial owner participating site accrual count will be displayed
     And the trial accrual count will be blank


  Scenario:#3 Trial Accrual Count Rules
     Given I am on the Accrual Counts Screen
     When The user is a site admin
     Then Accrual count will be displayed for all participating sites for all trials in the family
     And the trial accrual count will be display the total accrual for the family





