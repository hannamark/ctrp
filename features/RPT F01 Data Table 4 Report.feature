@Report @global
Feature: RPT F01 Data Table 4 Report

As a NCI staff member, I can generate Data Table 4 Reports for each NCI-designated Cancer Center

  Scenario: NCI Staff member selects a Cancer Center for a Data Table 4 Report
    Given I have access to the CTRP Reporting Utility
     When I select "Data Table 4 Report" report option
     Then the "Input Controls" screen opens
      And I must select a Cancer Center Family from a list 
      And I can enter a report starting date "MM/DD/YYYY" or "leave empty to see 12 month report"
      And I must enter report ending date "MM/DD/YYYY"
      And I must enter a Fiscal Year "YYYY"
      And I request a Data Table 4 report ??? available buttons : ok apply reset cancel save
     Then a Data Table 4 report for the Cancer Center Family and the Reporting Period selected will be displayed
     And Data Table 4 report headings will display the elements type at the top of the report page
     
      |Title: Data Table 4 Report  |
      |Cancer Center: Name of Cancer Center selected for the report  |
      |Date Range: [Report Start Date] to [Report End Date]  |
      |Report Date: Date report was created  |
    
     When the Trial condition types are met
    
    
      |The Trial Status is approved, Active, Temporarily Closed to Accrual, Temporarily Closed to Accrual and Intervention, or Enrolling by Invitation during the reporting period  |
      |Any active organization in the Cancer Center Family is a participating site on the trial with a participating site status of Approved, Active, Temporarily Closed to Accrual, Temporarily Closed to Accrual and Intervention, or Enrolling by Invitation during the reporting period   |
      |The trial does not have a processing status of Rejected or Submission Terminated|

     Then the trial is considered open to accrual at a cancer center 
     And the CTRP Data Table 4 Report will display one row of each trial where the selected Cancer Center is accruing subjects during the selected reporting periods, including report start date and report end date
     And CTRP Data Table 4 Report will contain the information type
     
      |Fiscal Year|
      |Grant Number|
      |Reporting Start Date|
      |Reporting End Date|
      |Clinical Research Category|
      |Study Source|
      |Funding Source|
      |PrimarySite|
      |NCT Number|
      |Protocol ID|
      |Other Protocol IDs|
      |Multi Institutional|
      |Last Name|
      |First Name|
      |Middle Name|
      |Program Code|
      |Open Date|
      |Close Date|
      |Phase|
      |Primary Purpose|
      |Official Title|
      |Entire Study|
      |Your Center Total|
      |Center 12 Months|
      |Center To Date|
      |Other 12 Months|
      |Other To Date|
      |Comments| 
      
      And I will be able to export the report to Excel or PDF 
