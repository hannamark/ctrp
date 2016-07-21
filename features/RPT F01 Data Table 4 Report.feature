@Report @global
Feature: REG F01 Data Table 4 Report

As a NCI staff member, I can generate Data Table 4 Reports for each NCI-designated Cancer Center

  Scenario: NCI Staff member selects a Cancer Center for a Data Table 4 Report
    Given I access to the CTRP Reporting Utility
     When I select the Data Table 4 Report option
     And I select a Cancer Center Family from a list
     And I enter a report starting date and a report ending date
     And I enter a Fiscal Year
     And I request a Data Table 4 report
     Then a Data Table 4 report for the Cancer Center Family and the Reporting Period selected will be displayed
     And I will be able to export the report to Excel or PDF

