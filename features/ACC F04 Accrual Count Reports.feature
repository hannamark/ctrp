@Acc @global

Feature: Acc F04 Accrual Count Reports
As a CTRP Accrual Submitter, I can download Accrual Count Reports in the CTRP Accrual Application 

  Scenario: #1 I can Download Accrual Count Reports
    Given I am on the CTRP Accrual Application
     When I click on the Accrual Counts on the toolbar
     Then the Accrual Count page displays trials to which I have access with "Accrual Count type"
     
     
      |NCI Trial Identifier  |
      |Lead Org Trial Identifier  |
      |ClinicaTrials.gov ID  |
      |Lead Organization  |
      |Site Accrual Count  |
      |Trial Accrual Count  |
      |Last Accrual Update Submitted  |

     And I can search the accrual count list by entering specific data related to "Accrual Count type"
     And I can click "CVS" at the botton of the list to download the Accrual Count report as a comma-separated-value text file
     And I can click "Excel" to download the Accrual Count report as an Excel spreadsheet
	 


