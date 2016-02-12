@PA @global
Feature: PAM F15 Abstraction Dashboard - Workload

As a CTRP PA SuperUser, I can view and edit the CTRP Abstraction Dashboard Details

Scenario: #1 I can view Workload 
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard Workload screen
 Then all trials that have one of the following latest milestones will be displayed 
|Submission Received Date|
|Submission Acceptance Date|
|Submission Reactivated Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date|
|Administrative QC Completed Date|
|Scientific Processing Start Date|
|Scientific Processing Completion Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for TSR Date|
And will display the following fields
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|Submitted On|
|Submission Date Plus 10 Business Days|
|Expected Abstraction Completion Date (Defaulted to Submission Date Plus 10 Business Days and is editible) |
|Business Days Since Submitted|
|Business Days on Hold (CTRP)|
|Business Days on Hold (Submitter)|
|Current On-Hold Date|
|Accepted|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Ready for TSR|
|Checked Out By (Userid and check out i.e. smithj AD/SC)|
And defaul sort order is by NCI Trial id ordered from newest ID to oldest
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|Submitted On|
|Submission Date Plus 10 Business Days|
|Expected Abstraction Completion Date (Defaulted to Submission Date Plus 10 Business Days and is editible) |
|Business Days Since Submitted|
|Business Days on Hold (CTRP)|
|Business Days on Hold (Submitter)|
|Current On-Hold Date|
|Accepted|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Ready for TSR|
|Checked Out By (Userid and check out i.e. smithj AD/SC)|

Scenario: #2 I can edit Expected Abstraction Completion Date
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial Expected Abstraction Completion Date
Then I can edit the Expected Abstraction Completion Date
And the Expected Abstraction Completion Date will be associated with the trial

Scenario: #3 I can view trail details - Validate
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial ID
And the latest trial milestone is "Submission Received Date"
Then the trail validaiton sidebar menu will appear
And the trial details screen will be displayed (see PAM F17 Abstraction Dashboard - Details) 

Scenario: #4 I can view trail details - Abstract
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Workload screen
And I select a trial ID
And the latest trial milestone is not "Submission Received Date"
Then the trail abstraction sidebar menu will appear
And the trial details screen will be displayed (see PAM F17 Abstraction Dashboard - Details)

Scenario: #5 I can sort the Workload 
 Given I am logged into the CTRP Protocol Abstraction application
 And I am on the CTRP Abstraction Dashboard Workload screen
 Then all trials that have one of the following latest milestones will be displayed 
|Submission Received Date|
|Submission Acceptance Date|
|Submission Reactivated Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date|
|Administrative QC Completed Date|
|Scientific Processing Start Date|
|Scientific Processing Completion Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for TSR Date|
And the display fields can be sorted by the following fields
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|Submitted On|
|Submission Date Plus 10 Business Days|
|Expected Abstraction Completion Date (Defaulted to Submission Date Plus 10 Business Days and is editible) |
|Business Days Since Submitted|
|Business Days on Hold (CTRP)|
|Business Days on Hold (Submitter)|
|Current On-Hold Date|
|Accepted|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Ready for TSR|
|Checked Out By (Userid and check out i.e. smithj AD/SC)|

Scenario: #6 I can export Abstraction Dashboard WorkLoad into an Excel spreadsheet
Given I am logged into the CTRP Protocol Abstraction application
And I am on the CTRP Abstraction Dashboard WorkLoad
When I select the export to Excel option
Then the trials in the Abstraction Dashboard WorkLoad will be exported to an Excel format spreadsheet 
And will includ the following fields:
|NCI Trial Identifier|
|Submission Type (Original (Information Source = Protocol and Submission number = 0) , Amendment (Information Source = Protocol and Submission number > 0), Imported (Information Source = Imported)|  
|Submitted On|
|Submission Date Plus 10 Business Days|
|Expected Abstraction Completion Date (Defaulted to Submission Date Plus 10 Business Days and is editible) |
|Business Days Since Submitted|
|Business Days on Hold (CTRP)|
|Business Days on Hold (Submitter)|
|Current On-Hold Date|
|Accepted|
|Admin Abstraction Completed|
|Admin QC Completed|
|Scientific Abstraction Completed|
|Scientific QC Completed|
|Ready for TSR|
|Checked Out By|
|Lead Organization|
|Lead Org PO ID|
|ClinicalTrials.gov Identifier|
|CTEP ID|
|DCP ID|
|CDR ID|
|Amendment #|
|Funding Source|
|On Hold Date (Latest)|
|Off Hold Date (for latest On Hold date)|
|On Hold Reason (for latest On Hold date)|
|On Hold Description (for latest On Hold date)|
|Information Source|
|NCI Sponsored (Yes if the sponsor is NCI, No if the sponsor is not NCI|
|Processing Status (latest)|
|Processing Status Date (for latest Processing status)|
|Admin Check out Name|
|Admin Check out Date (for admin checkout name)|
|Scientific Check out Name|
|Scientific Check out Date (for Scientific checkout name)|
|CTEP/DCP|*
|Submitting Organization|
|Submission Date|
|Last Milestone|
|Last Milestone Date|
|Submission Source|
|Submission Method|
|Processing Priority|
|Trial Processing Comments|
|This Trial is (LOV based on processing status, information source, Submission # and Milestone (list below))|*
|Submission Received Date|
|Submission Received Date Added By|
|Submission Received Date Added On|
|Submission Acceptance Date|
|Submission Acceptance Added By|
|Submission Acceptance Added On|
|Submission Rejection Date|
|Submission Rejection Added By|
|Submission Rejection Added On|
|Submission Terminated Date|
|Submission Terminated Added By|
|Submission Terminated Added On|
|Submission Reactivated Date|
|Submission Reactivated Added By|
|Submission Reactivated Added On|
|Administrative Processing Completed Date|
|Administrative Processing Completed Date Added By|
|Administrative Processing Completed Date Added On|
|Administrative QC Completed Date|
|Administrative QC Completed Date Added By|
|Administrative QC Completed Date Added On|
|Scientific Processing Completed Date|
|Scientific Processing Completed Date Added By|
|Scientific Processing Completed Date Added On|
|Scientific QC Completed Date|
|Scientific QC Completed Date Added By|
|Scientific QC Completed Date Added On|
|Trial Summary Report Date|
|Trial Summary Report Date Added By|
|Trial Summary Report Date Added On|
|Submitter Trial Summary Report Feedback Date|
|Submitter Trial Summary Report Feedback Date Added By|
|Submitter Trial Summary Report Feedback Date Added On|
|Initial Abstraction Verified Date|
|Initial Abstraction Verified Date Added By|
|Initial Abstraction Verified Date Added On|
|On-going Abstraction Verified Date|
|On-going Abstraction Verified Date Added By|
|On-going Abstraction Verified Date Added On|
|Late Rejection Date|
|Late Rejection Date Added By|
|Late Rejection Date Added On|




