@PA @global
Feature: PAA F06 Add and Edit Trial Status

As any CTRP PA User, I can add and edit Trial Dates and Status

Scenario: #1 I can enter a trial status and trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected a trial status from the list of:
|In Review| 
|Approved|
|Active| 
|Enrolling by Invitation|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
|Closed to Accrual|
|Closed to Accrual and Intervention|
|Complete|
|Administratively Complete|
|Withdrawn|
|Available - Only when Clinical Research Category is expanded access and is currently available for this treatment|
|No longer available – Only when Clinical Research Category is expanded access and was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily not available – Only when Clinical Research Category is expanded access and is not currently available for this treatment, but is expected to be available in the future|
|Approved for marketing – Only when a Clinical Research Category is expanded access and this treatment has been approved for sale to the public.|
And I have entered or selected a Current Trial Status Date
And I have entered or selected a Trial Start Date
And I have selected the Trial Start Date Type of “Actual” , “Anticipated”
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of “Actual” , “Anticipated”, "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of “Actual” , “Anticipated”
And have entered or edited the Trial On Hold Reason Comments when the trial status is:
|Administratively Complete|
|Withdrawn|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
And have entered or edited the Trial Status Comments
And have entered or edited the Additional Comments
When I select Save
Then the trial status and dates will be checked against validation rules and associated with the trial
And the trial status and date will be displayed as trial status history with any errors or warnings from the Trial Status Transition Rules

Scenario: #2 I can enter a trial status and invalid trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected a trial status 
And I have entered or selected a Current Trial Status Date
And I have entered or selected a Trial Start Date
And I have selected the Trial Start Date Type of “Actual” , “Anticipated”
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of “Actual” , “Anticipated” , "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of “Actual” , “Anticipated”
And have entered or edited the Trial Status Comments
And have entered or edited the Trial On Hold Reason Comments with the trial status is:
|Administratively Complete|
|Withdrawn|
|Temporarily Closed to Accrual|
| Temporarily Closed to Accrual and Intervention|

And have entered or edited the any Additional Trial Status Comments
When I select Save
Then the trial status and dates will be checked against validation rules and associated with the trial
And a warning will be displayed for the incorrect status transitions, dates and date types

Scenario: #3 Cancel Trial Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status screen
When I select Reset
Then the information entered or edited on the Trial Status screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #4 PA Trial Status Comments (Trial Status)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below the Trial Status Date field
|Please refer to the Trial Status Transition Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules |

Scenario: #5 PA Trial Status Comments (Completion Dates)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below the Completion Date field
|Please refer to the Trial Status Rules for Start and Completion Dates Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates |

Scenario: #6 PA Trial Status Comments (Why Study Stopped?)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information list appears below the Why Study Stopped?
| Administratively Complete, Withdrawn, and Temporarily Closed statuses only|

Scenario: #7 PA Trial Status Comments (Trial Status Values)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below for each Trial Status when it is selected:
| In Review - The trial is in development and waiting for final approval.|
|Approved - Trial has been approved.|
|Active – The trial is open for Accrual.| 
|Temporarily Closed to Accrual - Trial is temporarily not accruing.|
|Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
|Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
|Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
|Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
|Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
|Withdrawn - Trial has been withdrawn from development and review.|
|Available - Currently available for this treatment|
|No longer available – Was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily not available – Not currently available for this treatment, but is expected to be available in the future|
|Approved for marketing – Treatment has been approved for sale to the public.|

Scenario: #8 PA Trial Status Why Study Stopped? field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then information text appears below the Why Study Stopped? field to display the number of characters available to enter into the field.  
|160 characters left|

Scenario: #9 PA Trial Status Comments field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then information text appears below the Comments field to display the number of characters available to enter into the field.  
|160 characters left|

Scenario: #10 I can not enter an invalid trial status for a non-expanded access trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And the Clinical Research Category is not Expanded Access
Then the trial status’ will not be selectable: 
|Available |
|No longer available|
|Temporarily not available|
|Approved for marketing|


Scenario: #11 Selection of Primary Completion Date Type "NA" - DCP
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected the Primary Completion Date
And I have selected the Primary Completion Date Type  "NA"
And the trial does not have a DCP Trial Identifier 
And I select Save
Then an Error will be displayed "Primary Completion Date Type of "NA" is only available for DCP Trials"

Scenario: #12 Selection of Primary Completion Date Type "NA" - Non Intervential
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected the Primary Completion Date
And I have selected the Primary Completion Date Type  "NA"
And the trial is Intervential
And I select Save
Then an Error will be displayed "Primary Completion Date Type of "NA" is only available for Non-Interventional Trials"

Scenario: #13 Selection of Primary Completion Date - DCP
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have not entered a Primary Completion Date
And the trial does not have a DCP Trial Identifier 
And I select Save
Then an Error will be displayed "Primary Completion Date is Required"

Scenario: #14 Selection of Primary Completion Date Non Intervential
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have not entered a Primary Completion Date
And the trial is Intervential
And I select Save
Then an Error will be displayed "Primary Completion Date is required"

Scenario: #15 Start Date not null
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have not entered a Start Date
And I select Save
Then an Error will be displayed "Start Date is Required"

Scenario: #16 Start Date Type not null
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have not entered a Start Date Type
And I select Save
Then an Error will be displayed "Start Date Type is Required"


Scenario Outline: #17 Trial Status Transition Rules
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there

      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |errorsWarnings	                                                                                                                                                                                                                                                                |
      |STATUSZERO	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |STATUSZERO	                                    |In Review	                                    |			        |                                                                                                                                                                                                                                                                               |
      |STATUSZERO	                                    |Approved	                                    |		            |WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                                |
      |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Active	                                        |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Enrolling By Invitation	                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Closed to Accrual	                            |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |
      |STATUSZERO	                                    |Closed to Accrual and Interventions	        |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                            |
      |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |
      |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual]  is missing	                                                            |
      |STATUSZERO	                                    |Complete	                                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Interventions] is missing	|
      |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Interventions] is missing	|
      |In Review	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |In Review	                                    |In Review	                                    |			        |ERROR:Duplicate [IN REVIEW] status is not allowed	                                                                                                                                                                                                                            |
      |In Review	                                    |Approved	                                    |			        |                                                                                                                                                                                                                                                                               |
      |In Review	                                    |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |In Review	                                    |Active                                       	|			        |WARNING: Interim status [APPROVED] is missing                                                                                                                                                                                                                                	|
      |In Review	                                    |Enrolling By Invitation                        |			        |WARNING: Interim status [APPROVED] is missing                                                                                                                                                                                                                                	|
      |In Review	                                    |Closed to Accrual                            	|			        |WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [APPROVED] is missing	                                                                                                                                                                                    |
      |In Review	                                    |Closed to Accrual and Interventions	        |			        |WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [APPROVED] is missing	                                                                                                                            |
      |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [APPROVED] is missing	                                                                                                                                                                                    |
      |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [APPROVED] is missing\nWARNING: Interim status [TEMPORARILY CLOSED TO ACCRUAL] is missing                                                                                                                	|
      |In Review	                                    |Complete	                                    |			        |WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [APPROVED] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing                                                   	|
      |In Review	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [APPROVED] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                |
      |Approved	                                        |STATUSZERO                                   	|			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [APPROVED] to [IN REVIEW] 	                                                                                                                                                                                                            |
      |Approved	                                        |Approved	                                    |			        |ERROR:Duplicate [APPROVED] status is not allowed	                                                                                                                                                                                                                            |
      |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Active	                                        |			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Enrolling By Invitation	                    |			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Closed to Accrual	                            |			        |WARNING: Interim status [ACTIVE] is missing	                                                                                                                                                                                                                                |
      |Approved	                                        |Closed to Accrual and Interventions	        |			        |WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL] is missing	                                                                                                                                                                        |
      |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [ACTIVE] is missing	                                                                                                                                                                                                                                |
      |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [ACTIVE] is missing\nWARNING: Interim status [TEMPORARILY CLOSED TO ACCRUAL] is missing	                                                                                                                                                            |
      |Approved	                                        |Complete	                                    |			        |ERROR: Interim status [ACTIVE] is missing\n ERROR: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                                                                    |
      |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Interim status [ACTIVE] is missing\n ERROR: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing                                                                                                      |
      |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Withdrawn	                                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [WITHDRAWN] to [IN REVIEW] 	                                                                                                                                                                                                            |
      |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|ERROR: Invalid status transition from [WITHDRAWN] to [APPROVED] 	                                                                                                                                                                                                            |
      |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Duplicate [WITHDRAWN] status is not allowed	                                                                                                                                                                                                                            |
      |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [ACTIVE]	                                                                                                                                                                                                                |
      |Withdrawn	                                    |Enrolling By Invitation	                    |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [ENROLLING BY INVITATION]	                                                                                                                                                                                                |
      |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [CLOSED TO ACCRUAL]	                                                                                                                                                                                                    |
      |Withdrawn	                                    |Closed to Accrual and Interventions	        |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [CLOSED TO ACCRUAL AND INTERVENTIONS]	                                                                                                                                                                                    |
      |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [TEMPORARILY CLOSED TO ACCRUAL]	                                                                                                                                                                                        |
      |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTIONS]	                                                                                                                                                                        |
      |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [COMPLETE]	                                                                                                                                                                                                                |
      |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|ERROR:Invalid status transition from [WITHDRAWN] to [ADMINISTRATIVELY COMPLETE]	                                                                                                                                                                                            |
      |Active	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Active	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [ACTIVE] to [IN REVIEW]	                                                                                                                                                                                                                |
      |Active	                                        |Approved	                                    |			        |ERROR: Invalid status transition from [ACTIVE] to [APPROVED]	                                                                                                                                                                                                                |
      |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Active	                                        |			        |ERROR: Duplicate [ACTIVE] status is not allowed	                                                                                                                                                                                                                            |
      |Active	                                        |Enrolling By Invitation	                    |			        |ERROR:Invalid status transition from [ACTIVE] to [ENROLLING BY INVITATION]	                                                                                                                                                                                                    |
      |Active	                                        |Closed to Accrual	                            |			        |                                                                                                                                                                                                                                                                               |
      |Active	                                        |Closed to Accrual and Interventions            |			        |WARNING: Interim status [CLOSED TO ACCRUAL] is missing	                                                                                                                                                                                                                        |
      |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Complete	                                    |			        |WARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing                                                                                                                                                |
      |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                                                                                                            |
      |Enrolling By Invitation	                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Enrolling By Invitation	                        |In Review	                                    |			        |ERROR: Invalid status transition from [ACTIVE] to [IN REVIEW]	                                                                                                                                                                                                                |
      |Enrolling By Invitation	                        |Approved	                                    |			        |ERROR: Invalid status transition from [ACTIVE] to [APPROVED]	                                                                                                                                                                                                                |
      |Enrolling By Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling By Invitation	                        |Active	                                        |			        |ERROR: Duplicate [ACTIVE] status is not allowed	                                                                                                                                                                                                                            |
      |Enrolling By Invitation	                        |Enrolling By Invitation	                    |			        |ERROR:Invalid status transition from [ACTIVE] to [ENROLLING BY INVITATION]	                                                                                                                                                                                                    |
      |Enrolling By Invitation	                        |Closed to Accrual	                            |			        |                                                                                                                                                                                                                                                                               |
      |Enrolling By Invitation	                        |Closed to Accrual and Interventions            |			        |WARNING: Interim status [CLOSED TO ACCRUAL] is missing	                                                                                                                                                                                                                        |
      |Enrolling By Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling By Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling By Invitation	                        |Complete	                                    |			        |WARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                                                                                                            |
      |Enrolling By Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                                                                                                            |
      |Closed to Accrual	                            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |In Review	                                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL] TO [IN REVIEW]	                                                                                                                                                                                                    |
      |Closed to Accrual                                |Approved	                                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL] TO [APPROVED]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [CLOSED TO ACCRUAL] TO [WITHDRAWN]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Active	                                        |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL] TO [ACTIVE]	                                                                                                                                                                                                        |
      |Closed to Accrual                            	|Enrolling By Invitation	                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL] TO [ENROLLING BY INVITATION]	                                                                                                                                                                                        |
      |Closed to Accrual                            	|Closed to Accrual	                            |			        |ERROR: Duplicate [CLOSED TO ACCRUAL] status is not allowed 	                                                                                                                                                                                                                |
      |Closed to Accrual                            	|Closed to Accrual and Interventions            |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|WARNING:Invalid Status transition from [CLOSED TO ACCRUAL] to [TEMPORARILY CLOSED TO ACCRUAL]	                                                                                                                                                                                |
      |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING:Invalid Status transition from [CLOSED TO ACCRUAL] to [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION]	                                                                                                                                                                |
      |Closed to Accrual	                            |Complete	                                    |			        |WARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is mission	                                                                                                                                                                                                    |
      |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is mission	                                                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual and Interventions	            |In Review	                                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [IN REVIEW]	                                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |Approved	                                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [APPROVED]	                                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [WITHDRAWN]	                                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |Active	                                        |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [ACTIVE]	                                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |Enrolling By Invitation	                    |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [ENROLLING BY INVITATION]	                                                                                                                                                                    |
      |Closed to Accrual and Interventions	            |Closed to Accrual	                            |			        |ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [CLOSED TO ACCRUAL]	                                                                                                                                                                            |
      |Closed to Accrual and Interventions	            |Closed to Accrual and Interventions            |			        |ERROR: Duplicate [CLOSED TO ACCRUAL AND INTERVENTIONS] status is not allowed	                                                                                                                                                                                                |
      |Closed to Accrual and Interventions	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTION] TO [TEMPORARILY CLOSED TO ACCRUAL]	                                                                                                                                                                |
      |Closed to Accrual and Interventions	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status Transition from [CLOSED TO ACCRUAL AND INTERVENTIONS] TO [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION]	                                                                                                                                            |
      |Closed to Accrual and Interventions	            |Complete	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual and Interventions	            |Administratively Complete	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL] to [IN REVIEW]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL] to [APPROVED]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL] to [WITHDRAWN]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Enrolling By Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual  	                |Closed to Accrual and Interventions            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Duplicate [TEMPORARILY CLOSED TO ACCRUAL] status is not allowed	                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL] to [COMPLETE]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [CLOSED TO ACCRUAL] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing                                                                                                                                                |
      |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] to [IN REVIEW]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] to [APPROVED]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] to [WITHDRAWN]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Enrolling By Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Interventions            |Add Stopped Reason	|WARNING: Interim status [CLOSED TO ACCRUAL] is missing	                                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] to [TEMPORARILY CLOSED TO ACCRUAL]	                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Duplicate [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] status is not allowed	                                                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION] to [COMPLETE]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [ CLOSED TO ACCRUAL ] is missing\nWARNING: Interim status [CLOSED TO ACCRUAL AND INTERVENTION] is missing	                                                                                                                                            |
      |Complete	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Complete	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [COMPLETE] to [IN REVIEW]	                                                                                                                                                                                                            |
      |Complete                                    	    |Approved	                                    |			        |ERROR: Invalid status transition from [COMPLETE] to [APPROVED]	                                                                                                                                                                                                                |
      |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [COMPLETE] to [WITHDRAWN]	                                                                                                                                                                                                            |
      |Complete                                    	    |Active	                                        |			        |ERROR: Invalid status transition from [COMPLETE] to [ACTIVE]	                                                                                                                                                                                                                |
      |Complete	                                        |Enrolling By Invitation	                    |			        |ERROR: Invalid status transition from [COMPLETE] to [ENROLLING BY INVITATION]	                                                                                                                                                                                                |
      |Complete	                                        |Closed to Accrual	                            |			        |ERROR: Invalid status transition from [COMPLETE] to [CLOSED TO ACCRUAL]	                                                                                                                                                                                                    |
      |Complete	                                        |Closed to Accrual and Interventions            |			        |ERROR: Invalid status transition from [COMPLETE] to [CLOSED TO ACCRUAL AND INTERVENTIONS]	                                                                                                                                                                                    |
      |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [COMPLETE] to [TEMPORARILY CLOSED TO ACCRUAL]	                                                                                                                                                                                        |
      |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [COMPLETE] to [TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION]	                                                                                                                                                                        |
      |Complete	                                        |Complete	                                    |			        |ERROR: Duplicate [COMPLETE] status is not allowed	                                                                                                                                                                                                                            |
      |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Invalid status transition from [COMPLETE] to [ADMINISTRATIVELY COMPLETE]	                                                                                                                                                                                            |
      |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [IN REVIEW]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [APPROVED]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [WITHDRAWN]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [ACTIVE]	                                                                                                                                                                                                |
      |Administratively Complete	                    |Enrolling By Invitation	                    |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [ENROLLING BY INVITATION]	                                                                                                                                                                                |
      |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE]  to [CLOSED TO ACCRUAL]	                                                                                                                                                                                    |
      |Administratively Complete	                    |Closed to Accrual and Interventions            |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [CLOSED TO ACCRUAL AND INTERVENTIONS]	                                                                                                                                                                    |
      |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [TEMPORARILY CLOSED TO ACCRUAL ]	                                                                                                                                                                        |
      |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [TEMPORARILY  CLOSED TO ACCRUAL AND INTERVENTIONS]	                                                                                                                                                    |
      |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status Transition from [ADMINISTRATIVELY COMPLETE] to [COMPLETE]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|ERROR: Duplicate [ADMINISTRATIVELY COMPLETE] status is not allowed	                                                                                                                                                                                                            |

             |

Scenario Outline: #18 I can enter a trial status and trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When I add a <status date> and a status <statusType> and explained why study stopped <why study stopped> 
      
      |status date                                            | statusType                                    |why study stopped      |
      |Date Entered                                           |In Review                                      |                       |
      |Future Date based on previous status entered           | Approved                                      | 					  |                      
      |Future Date based on previous status entered           | Active                                        |                   	  |
      |Future Date based on previous status entered           | Enrolling by invitation                       |                       |
      |Future Date based on previous status entered           | Closed to accrual                             |                       |
      |Future Date based on previous status entered           | Close to accrual and Intervention             |                       |
      |Future Date based on previous status entered           | Temporarily Closed to accrual                 |Text                   |
      |Future Date based on previous status entered           | Temporarily closed to accrual and Intervention|Text                   |
      |Future Date based on previous status entered           | Withdrawn                                     |                       |
      |Future Date based on previous status entered           | Administratively Complete                     |Text                   |
      |Future Date based on previous status entered           | Complete                                      |Text                   |
     
Then no errors will be displayed

Scenario Outline:#19 I can enter a trial status and trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When I add a trial date <statusDateFrom> and trial status from <statusFrom> to trial date <statusDateTo> trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there

  
  
   |statusDateFrom   |statusFrom	|statusDateTo                                    |statusTo	   |whyStudyStopped    |errorsWarnings	                                          |
   |Date Entered Now | Approved     |Same Date entered later                         |In Review    |                   |Warning: Invalid Transition from [Approved] to [In Review]|
   |Date Entered Now | Approved     |Different Date in the Future                    |In Review    |                   |Warning: Invalid Transition from [Approved] to [In Review]|
   |Date Entered past| Active       |Date entered Now                                |Aproved      |                   |Warning: Invalid Transition from [Active] to [Approved]

   
   
   
Scenario Outline: #20 Rules for Status/Dates relationships
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When Current Trial Status is <TrialStatusType>
Then The Trial date Type is <DateType>
     
     Examples:
          
      |<TrialStatusType                         |<DateType>  |
      |Active                                   |Trial Start Date must be Actual   |
      |Enrolling by Invitation                  |Trial Start Date must be Actual  |
      |Closed to Accrual                        |Trial Start Date must be Actual    |
      |Closed to Accrual and Intervention       |Trial Start Date must be Actual   |
      |Temp Closed to Accrual                   |Trial Start Date must be Actual   |
      |Temp Closed to Accrual and Intervention  |Trial Start Date must be Actual   |
      |Complete                                 |All date types must be Actual     |
      |Administratively Complete                |Trial Start Date must be Actual   |
      |In Review                                |Trial Start Date could be Actual or Anticipated |
      |Approved                                 |Trial Start Date could be Actual or Anticipated   |
     
     
Scenario: #21 Rules for Study Date types
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When the Trial date is in the past
Then the Trial date type must be actual
When  the Trial date is today
Then the Trial Date type could be actual
And the Trial date Type could be anticipated
When the Trial date is in the future
Then the Trial date type must always be anticipated

Scenario: #22 general rules for Study Date values are as follows
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
And The Trial Start Date can be in the past, present, or future
And The Trial Start Date can be in the past, present, or future
And The Completion Date is always the same as, or later than, the Primary Completion Date
And The Primary Completion Date is always the same as, or later than, the Trial Start Date
And The Primary Completion Date can be earlier than the Current Trial Status Dates Complete
When the Primary Completion Date is Actual
Then the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete 
And The Completion Date is always the same as, or later than, the Primary Completion Date

     

Scenario: #23 Delete Trial Status Comment not null
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status screen
When I select Delete a Trial Status
And I have not entered a Comment
Then the will display the error "A comment must be entered"

 
