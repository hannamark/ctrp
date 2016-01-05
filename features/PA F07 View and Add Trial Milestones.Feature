@PA @global
Feature: PA F07 View and Add Trial Milestones

As any CTRP PA User, I can View and Add Milestones

Scenario: #1 I view current trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
Then I can view the trail milestone information for the current (most recent) submission number Ordered by Milestone Date and Time with the oldest Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Username)|
|Creation Date (Date and Time)|

Scenario: #2 I view any submission trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected a submission number
Then I can view the trail milestone information for the selected submission number Ordered by Milestone Date and Time with the oldest  Date and Time first:
|Submission Number| 
|Milestone|
|Milestone Date and Time| 
|Comment|
|Creator (Username)|
|Creation Date (Date and Time)|

Scenario: #3 I can add trial milestones
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I am on the Trial Milestones Screen
And I have selected the current submission number
And I can view the trail milestone information for the current 
And I can select a Milestone from the list:
| Submission Received Date|
|Submission Acceptance Date|
|Validation Processing Start Date              |
|Validation Processing Completed Date          |
|Ready for Validation QC Date                  |
|Validation QC Start Date                      |
|Validation QC Completed Date                  |
|Submission Terminated Date|
|Submission Reactivated Date|
|Submission Rejection Date|
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
|Trial Summary Report Date|
|Submitter Trial Summary Report Feedback Date|
|Initial Abstraction Verified Date|
|On-going Abstraction Verified Date|
|Late Rejection Date| 
And I can enter the date
And I can enter a comment
Then the information will be associated with the trial


Scenario Outline:#4 Trial Milestones Recording Rules
  Given : I am logged into the CTRP Protocol Abstraction Application
    And I have selected a Trial
    And I am on the Trial Milestones Screen
    When Some Trial Milestones <Milestones> will be System Generated automaticaly <SystemGeneratedRule>
    And Some Trial Milestones <Milestones> will be Recorded by the PA application user manualy <UserRecordedRule>
   Then The trial Miletones section will complete

  Examples: 

|Milestones                                    |SystemGeneratedRules                                                                                                                                                                   |    |UserRecordedRules                                                                                                                  |
|Submission Received Date                      |Triggered by Trial Submission                                                                                                                                                          |    |Recorded as an exception at submission validation and after the "Submission Reactivated Date" milestones                           |                   
|Submission Received Date                      |Triggered By an Amendment Submission                                                                                                                                                   |    |Recorded as an exception at submission validation and after the "Submission Reactivated Date" milestones                           |
|Validation Processing Start Date              |N/A                                                                                                                                                                                    |    |Recorded when starting Submission Validation                                                                                       |
|Validation Processing Completed Date          |N/A                                                                                                                                                                                    |    |Recorded when completing Submission Validation                                                                                     |               
|Ready for Validation QC Date                  |triggered by Validation Processing Completed Date Milestone                                                                                                                            |    |Recorded as an exception (original or amendment submission)                                                                        |
|Validation QC Start Date                      |N/A                                                                                                                                                                                    |    |Recorded when starting Submission Validation QC                                                                                    |
|Validation QC Completed Date                  |N/A                                                                                                                                                                                    |    |Recorded when completing Submission Validation QC                                                                                  |
|Submission Acceptance Date                    |Triggered by Acceptance after Validation                                                                                                                                               |    |As an exception at trial abstraction                                                                                               |
|Submission Terminated Date                    |Triggered if on hold more than Business days                                                                                                                                           |    |Added at any point except after milestone "Submission Rejection Date" or "Late Rejection Date"                                     |
|Submission Reactivated Date                   |N/A                                                                                                                                                                                    |    |Added only if the processing status is "Submission Terminated" and the user must add the "Submission Received Date" milestone      |
|Submission rejection Date                     |Recorded at Trial Rejection including Late Rejection if "Submission Received Date" recorded                                                                                            |    |N/A                                                                                                                                |
|Administrative Procession Start Date          |N/A                                                                                                                                                                                    |    |Recorded when starting Administration Abstraction and after trail is validated and accepted                                        |
|Administrative Procession Completed Date      |N/A                                                                                                                                                                                    |    |Recorded after completing Administrative Abstraction                                                                               |
|Ready for Administrative QC date              |Triggered by Administrative Processing Completed Date Milestone record entered                                                                                                         |    |Recorded as an exception after Administrative Abstraction completed                                                                |
|Administrative QC Start Date                  |N/A                                                                                                                                                                                    |    |Recorded when starting Administrative QC                                                                                           |
|Administrative QC Completed Date              |N/A                                                                                                                                                                                    |    |Recorded when completing Administrative QC                                                                                         |
|Scientific Processing Start Date              |N/A                                                                                                                                                                                    |    |Recorded when starting Scientific Abstraction and after trail is validated and accepted                                            |
|Scientific Processing Completed Date          |N/A                                                                                                                                                                                    |    |Recorded after completing Scientific Abstraction                                                                                   |
|Ready for Scientific QC Date                  |Triggered by Scientific Processing Completed Date Milestone record entered                                                                                                             |    |Recorded as an exception after Scientific Abstraction completed                                                                    |
|Scientific QC Start Date                      |N/A                                                                                                                                                                                    |    |Recorded when starting Scientific QC                                                                                               |
|Scientific QC Completed Date                  |N/A                                                                                                                                                                                    |    |Recorded when completing Scientific QC                                                                                             |
|Ready for TSR Date                            |Triggered by"Administrative QC Complete Date" if "Scientific QC Completed Date" recorded or"Scientific QC Complete Date" if "Administrative QC Completed Date" only for Imported Trials|    |Recorded when completing Administartive and Scientific QC                                                                          |                                        |    |
|Trial Summary Report Date                     |N/A                                                                                                                                                                                    |    |Recorded when completing Administartive and Scientific QC and Validation successful and TSR and XML sent to submitter              |
|Submitter Trial Summary Report Feedback Date  |N/A                                                                                                                                                                                    |    |Recorded if feedback is received                                                                                                   |
|Initial Abstraction Verified Date             |N/A                                                                                                                                                                                    |    |Recorded if feedback is received                                                                                                   |
|Initial Abstraction Verified Date             |Triggered if the submitter's feedback is not received within 5 business days                                                                                                           |    |Recorded if feedback is received within 5 business days                                                                            |
|On-going Abstraction Verified Date            |N/A                                                                                                                                                                                    |    |Completed at completing abstraction update                                                                                         |
|On-going Abstraction Verified Date            |N/A                                                                                                                                                                                    |    |Completed at completing abstraction update                                                                                         |
|Late Rejection Date                           |N/A                                                                                                                                                                                    |    |Recorded at any step of the originally submitted trial processing, can not be applied after trail was accepted                     |
|                                              |                                                                                                                                                                                       |    |    

Scenario Outline: #5 Trials Milestones validation rules
  Given I am logged into the CTRP Protocol Abstraction application
    And I have selected a Trial
    And I am on the Trial Milestones Screen
    When I add a milestone <Milestone> 
    And the specific milestone rule <MilestoneRule> is verified
    Then the milestone <Milestone> is valid and can be recorded
	
 Examples: 
    
      
      
      
      |<Milestone>                                 |<MilestoneRule>                                                                                                                                                                |
      |Submission Received Date                    |Trial Submitted via the Trial registration portal                                                                                                                              |
      |Validation Processing Start Date            |Submission Acceptance Date milestone exists                                                                                                                                    |
      |Validation Processing Completed Date        |Validation Start Date milestone exists                                                                                                                                         |
      |Validation Processing Completed Date        |Cannot be recorded if at least one active "on-hold"record exists                                                                                                               |                            
      |Validation Processing Completed Date        |Cannot be recorded if at least one updated record is unprocessed                                                                                                               |
      |Ready for Validation QC Date                |Validation Completed Date milestone exists                                                                                                                                     |
      |Ready for Validation QC Date                |Cannot be recorded if at least one active "on-hold" record exists                                                                                                              |
      |Validation QC Start Date                    |1.Ready for validation QC Date Milestone exists                                                                                                                                |
      |Validation QC Start Date                    |2.Cannot be recorded if at least one active "on-hold" record exists                                                                                                            |
      |Validation QC Start Date                    |3.Cannot be recorded if at least one update record is unprocessed                                                                                                              |
      |Validation Completed Date                   |1.Validation QC Date milestone exists                                                                                                                                          |
      |Validation Completed Date                   |2.Cannot be recorded if at least one active "on-hold" record exists                                                                                                            |
      |Validation Completed Date                   |3.Cannot be recorded if at least one update record is unprocessed                                                                                                              |
      |Submission Acceptance Date                  | Only if milestone "Submission Received Date" exists                                                                                                                           |
      |Submission Terminated Date                  |1.If milestone "Submission Rejected Date" does not exist                                                                                                                       |
      |Submission Terminated Date                  |2.If milestone "Late Rejection Date" does not exist                                                                                                                            |
      |Submission Reactivated Date                 |If Milestone "Submission Terminated" exists                                                                                                                                                                                                                                                 |
      |Submission Rejection Date                   |If milestone "Submission Received Date " exists                                                                                                                                                                                                                                             |
      |Administrative Processing Start Date        |If "Submission Acceptance Date" milestone exists                                                                                                                                                                                                                                            |
      |Administrative Processing Completed Date    |1.If "Administrative Processing Start Date" milestone exists                                                                                                                                                                                                                                |
      |Administrative Processing Completed Date    |2.Cannot be recorded if at least one active "on-hold"record exists                                                                                                                                                                                                                          |
      |Administrative Processing Completed Date    |3.Cannot be recorded if at least one update record is unprocessed                                                                                                                                                                                                                           |
      |Administrative Processing Completed Date    |4.Cannot be recorded if if Trail is checked out for Administrative processing                                                                                                                                                                                                               |
      |Ready for Administrative QC Date            |1.If "Administrative Pocessing Completion Date"milestone exists                                                                                                                                                                                                                             |
      |Ready for Administrative QC Date            |2.Cannot be recorded if non-processed update exists                                                                                                                                                                                                                                         |
      |Ready for Administrative QC Date            |3.Cannot be recorded if at least one active "on-hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Start Date                |1.If "Ready for Administrative QC Date" milestone exists                                                                                                                                                                                                                                    |
      |Administrative QC Start Date                |2.Cannot be recorded if at least one active "On-hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Start Date                |3.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                                                                                                       |
      |Administrative QC Completed Date            |1.If "Administrative QC Start Date" milestone exists                                                                                                                                                                                                                                        |
      |Administrative QC Completed Date            |2.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Administrative QC Completed Date            |3.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                                                                                                       |
      |Administrative QC Completed Date            |4.Cannot be recorded if trail is checked out for Administrative processing                                                                                                                                                                                                                  |
      |Administrative QC Completed Date            |5.Triggers recording "Ready for TSR Date" milestone if "Scientific QC Completed Date" milestone is recorded and the abstraction is valid when original submission or amendment submission has a reson of both Aministrative and Scientific                                                  |
      |Administrative QC Completed Date            |6.Triggers recording "Ready for TSR Date" milestone if the abstraction is valid when Amendment submission has an amendment reason "Administrative"                                                                                                                                          |
      |Scientific Processing Start Date            |If "Submission Acceptance Date" milestone exists                                                                                                                                                                                                                                            |
      |Scientific Processing Completed Date        |1.If "Scientific Processing Start Date" milestone exists                                                                                                                                                                                                                                    |
      |Scientific Processing Completed Date        |2.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Ready for Scientific QC Date                |1.If "Scientific Processing Completed Date" milestone exists                                                                                                                                                                                                                                |
      |Ready for Scientific QC Date                |2.Cannot be recorded if at least one active "On-Hold"record exists                                                                                                                                                                                                                          |
      |Ready for Scientific QC Date                |3.Cannot be recorded if trail is checked out for Scientific Processing                                                                                                                                                                                                                      |
      |Scientific QC Start Date                    |1.If "Ready for Scientific QC Date" milestone exists                                                                                                                                                                                                                                        |
      |Scientific QC Start Date                    |2.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Scientific QC Completed Date                |1.If "Scientific QC Start Date" milestone exists                                                                                                                                                                                                                                            |
      |Scientific QC Completed Date                |2.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Scientific QC Completed Date                |3.Cannot be recorded if Trail is checked out for Scientific processing                                                                                                                                                                                                                      |
      |Ready for TSR Date                          |1.If "Administrative QC Completed Date" and "Scientific QC Completed Date" milestones exists and Abstraction Validation successful                                                                                                                                                          |
      |Ready for TSR Date                          |2.Cannot be recorded if both "Administrative QC Completed Date" and "Scientific Completed Date" milestones do not exist in case of an original submission or amendment submission with both reasons for amendment                                                                           |
      |Ready for TSR Date                          |3.Cannot be recorded if "Administrative QC Completed Date" milestone does nor exist for an amendment submission with "Administrative" Reason for amendment                                                                                                                                  |
      |Ready for TSR Date                          |4.Cannot be recorded if "Scientific QC Completed Date" milestone does not exist for an amendment submission with "Scientific" reason for amendment                                                                                                                                          |
      |Ready for TSR Date                          |5.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Ready for TSR Date                          |6.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                                                                                                       |
      |Ready for TSR Date                          |7.Cannot be recorded if abstraction in invalid                                                                                                                                                                                                                                              |
      |Ready for TSR Date                          |8.Recording this milestone updates the trial record verification date to the date of the milestone                                                                                                                                                                                          |
      |Trial Summary Report Date                   |1.If "Ready for TSR Date" milestone exists & abstraction validation is a success                                                                                                                                                                                                            |
      |Trial Summary Report Date                   |2.Cannot be recorded if the most current processing status is "Submitted", "Amendment Submitted", "Accepted" or "Rejected"                                                                                                                                                                  |                                                                                                                                                                                                                                           
      |Trial Summary Report Date                   |3.Cannot be recorded if "Ready for TSR Date" milestone does not exist                                                                                                                                                                                                                       |
      |Trial Summary Report Date                   |4.Cannot be recorded if abstraction validation fails                                                                                                                                                                                                                                        |
      |Trial Summary Report Date                   |5.Cannot be recorded if if at least one unprocessed update record exists                                                                                                                                                                                                                    |
      |Trial Summary Report Date                   |6.Triggers sending TSR and XML to the submitter if recorded or if rules 1-5 fail                                                                                                                                                                                                            |
      |Trial Summary Report Date                   |7.Cannot be recorded if at least one active "On-Hold" record exist                                                                                                                                                                                                                          |
      |Trial Summary Report Date                   |8.Triggers switch of "Abstracted" status to "Verification Pending" status                                                                                                                                                                                                                   |
      |Submitter Trial Summary Report Feedback Date|If "Trial Summary Sent Date" exists                                                                                                                                                                                                                                                         |
      |Initial Abstraction Verified Date           |1.If the submitter's feedback is received within 5 business days                                                                                                                                                                                                                            |
      |Initial Abstraction Verified Date           |2.Cannot be recorded if "Ready for TSR Date" milestone does not exist                                                                                                                                                                                                                       |
      |Initial Abstraction Verified Date           |3.Cannot be recorded if at least one active "On-Hold" record exists                                                                                                                                                                                                                         |
      |Initial Abstraction Verified Date           |4.Triggers adding "Abstraction Verified-Response" processing status if is done manually upon receiving submitter's feedback and recording corresponding milestone and if the most current processing status is "Abstracted" or "Verification Pending"                                       |
      |Initial Abstraction Verified Date           |5.Triggers adding "Abstraction Verified-No Response" processing status if recorded by the system in case if no submitter's feedback is received within 6 business days (no coresponding milestone recorded) and the most current processing status is "Abstracted" or "Verification Pending"|
      |Initial Abstraction Verified Date           |6.Triggers updating 'Trial Record Verification Date" to the date of this milestone recording                                                                                                                                                                                                |
      |Initial Abstraction Verified Date           |7.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                                                                                                       |
      |Initial Abstraction Verified Date           |8.Recorded once per submission                                                                                                                                                                                                                                                              |
      |On-going Abstraction Verified Date          |1.Triggered Abstraction Validation                                                                                                                                                                      |                                                                                   |
      |On-going Abstraction Verified Date          |2.Cannot be recorded if Abstraction Validation Fails                                                                                                                                                    |                                                                                   |
      |On-going Abstraction Verified Date          |3.Cannot be recorded if at least one active "On-Hold"record exists                                                                                                                                      |                                                                                   |
      |On-going Abstraction Verified Date          |4.Triggers adding "Abstraction Verified-Response"processign status if the most current processing status is "Abstraction verified-No Response" and "Trial Summary Report Feedback Date"milestone exist  |                                                                                   |
      |On-going Abstraction Verified Date          |5.Triggers updating "Trial Record verification Date" to the datae of this milestone recording                                                                                                           |                                                                                   |
      |On-going Abstraction Verified Date          |6.Cannot be recorded if at least one unprocessed update record exist                                                                                                                                    |                                                                                   |
      |Late Rejection Date                         |1.Can be recorded at any step of the originally submitted trial processing after trial was accepted (not applicable to amendment submission)                                                            |                                                                                   |                                                                                                                                            |
      |Late Rejection Date                         |2.Triggers sending rejection email and adding "Rejected" processing status                                                                                                                              |                                                                                   |                                                                           |
      |Late Rejection Date                         |3.Canot be recorded if the reason for rejection is not provided                                                                                                                                         |                                                                                   |
      |Late Rejection Date                         |4.Can be recorded by the PA super user only                                                                                                                                                             |                                                                                   |
      |Late Rejection Date                         |5.Cannot be recorded if at least one unprocessed update record exists                                                                                                                                   |                                                                                   |
      |                                            |                                                                                                                                                                                                        |                                                                                   |
    
    
    Scenario:#6 Multiple Milestones can be entered per Trial
  Given : I am logged into the CTRP Protocol Abstraction Application
   When I have selected a Trial
    And I am on the Trial Milestones Screen
    And I am on the Add Milestone Screen
    And I can Add Milestone Type
     
      |Milestone  |
      |Date       |
      |Comment    |
    And I can enter multiple Milestones per trial for the <MilestoneType> and milestone comment won't be required
    	
      |Submission Received Date                 |
      |Submission Processing Start Date         |
      |Validation processing Start Date         |
      |Validation Processing Completed Date     |
      |Ready for Validation QC date             |
      |Validation QC Start Date                 |
      |Validaiton QC Completed Date             |
      |Submission Acceptance Date               |
      |Submission Terminated Date               |
      |Submission Reactivated Date              |
      |Submission Rejection Date                |
      |Administrative Processing Start Date     |
      |Administrative Processing Completed Date |
      |Ready for Administrative QC Date         |
      |Administrative QC Start Date             |
      |Administrative QC Completed Date         |
      |Scientific Processing Start Date         |
      |Scientific Processing Completion Date    |
      |Ready for Scientific QC Date             |
      |Scientific QC Start Date                 |
      |Scientific QC Completed Date             |
      |Ready for TSR Date                       |
      |Trial Summary Report Date                |
      |Submitter Trial Summar Report Feedback   |
      |Initial Abstraction Verified Date        |
      |On-going Abstraction Verified Date       |
      
     And I can enter "Late Rejection Milestone" milestone only one time during a Trial and "Late Rejection milestone" comment will be required 
     When I click on the Add Milestone button
     Then the added milestone will be displayed on the Trial Milestones table with no errors
     
    

  
