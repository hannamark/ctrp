@PA @global
Feature: PAA F06 Add and Edit Trial Status

As any CTRP PA User, I can add and edit Trial Dates and Status

Scenario: #1 I can enter a trial status and trial status date for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected a trial
And I have selected a trial status from the list of:
|Select a status|
|Active|
|Administratively Complete|
|Approved|
|Approved for marketing###Only when a Clinical Research Category is expanded access and this treatment has been approved for sale to the public.|
|Available###Only when Clinical Research Category is expanded access and is currently available for this treatment|
|Closed to Accrual|
|Closed to Accrual and Intervention|
|Complete|
|Enrolling by Invitation|
|In Review|
|No longer available###Only when Clinical Research Category is expanded access and was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
|Temporarily not available###Only when Clinical Research Category is expanded access and is not currently available for this treatment, but is expected to be available in the future|
|Withdrawn|
And I have entered or selected a Current Trial Status Date
And I have entered or selected a Trial Start Date
And I have selected the Trial Start Date Type of "Actual" , "Anticipated"
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of "Actual" , "Anticipated", "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of "Actual" , "Anticipated"
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
And I have selected the Trial Start Date Type of "Actual" , "Anticipated"
And I have entered or selected a Primary Completion Date
And I have selected the Primary Completion Date Type of "Actual" , "Anticipated", "NA"
And I have entered or selected a Completion Date
And I have selected the Completion Date Type of "Actual" , "Anticipated"
And have entered or edited the Trial On Hold Reason Comments with the trial status is:
|Administratively Complete|
|Withdrawn|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
And have entered or edited the Trial Status Comments
And have entered or edited the any Additional Trial Status Comments
When I select Save
Then the trial status and dates will be checked against validation rules and associated with the trial
And a warning will be displayed for the incorrect status transitions, dates and date types

Scenario: #3 Cancel Trial Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status screen
When I select Reset at the trial status screen
Then the information entered or edited on the Trial Status screen will not be saved to the trial record 
And the screen will be refreshed with the existing data trial status data

Scenario: #4 PA Trial Status Transition Rules 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And I can view the Trial Status Transition Rules Information text "Please refer to the Trial Status Transition Rules:" displayed in the Trial Statuses section below the Trial Statuses Table
And Trial Status Transition Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules"
When I have clicked on the Trial Status Transition Rules text
Then the Trial Status Transition Rules user guide page will be displayed

Scenario: #5 PA Trial Status Rules for Start and Completion Dates Rules
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And I can view the Trial Status Rules for Start and Completion DatesRules Information text "Please refer to the Trial Status Rules for Start and Completion Dates Rules:" displayed in the Trial Dates section
And the Trial Status Rules for Start and Completion Dates Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates"
When I have clicked on the Trial Status Rules for Start and Completion Dates text
Then the Trial Status Rules for Start and Completion Dates Rules user guide page will be displayed
@runthis
Scenario: #6 PA Trial Status Comments (Why Study Stopped?)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information list appears below the Why Study Stopped?
|Administratively Complete,Withdrawn,Temporarily Closed to Accrual,Temporarily Closed to Accrual and Intervention|

Scenario: #7 PA Trial Status Comments (Trial Status Values)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the information text appears below for each Trial Status when it is selected:
|In Review - The trial is in development and waiting for final approval.|
|Approved - Trial has been approved.|
|Active � The trial is open for Accrual.| 
|Temporarily Closed to Accrual - Trial is temporarily not accruing.|
|Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
|Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
|Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
|Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
|Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
|Withdrawn - Trial has been withdrawn from development and review.|
|Available - Currently available for this treatment|
|No longer available � Was available for this treatment previously but is not currently available and will not be available in the future|
|Temporarily not available � Not currently available for this treatment, but is expected to be available in the future|
|Approved for marketing � Treatment has been approved for sale to the public.|

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
Then the trial status will not be selectable:
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

Scenario: #12 Selection of Primary Completion Date Type "NA" - Non Interventional
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have selected the Primary Completion Date
And I have selected the Primary Completion Date Type  "NA"
And the trial is Interventional
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

Scenario: #14 Selection of Primary Completion Date Non Interventional
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Given I have selected trail
And I have not entered a Primary Completion Date
And the trial is Interventional
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


Scenario Outline: #17 Trial Status Transition Rules - Statuszero
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
   
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                             |   
      |STATUSZERO	                                    |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |   
      |STATUSZERO	                                    |In Review	                                    |			        |yes    |                                                                                                                                                                                                                                                                            |   
      |STATUSZERO	                                    |Approved	                                    |		            |yes    | WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                         |       
      |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO	                                    |Active	                                        |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO	                                    |Enrolling by Invitation	                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                             |   
      |STATUSZERO                                       |Closed to Accrual	                            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
      |STATUSZERO	                                    |Closed to Accrual and Intervention	            |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                     |
      |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                             |
      |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                         |      
      |STATUSZERO	                                    |Complete	                                    |			        |yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|	
      |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|yes    | WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing|	
      
Scenario Outline: #17a Trial Status Transition Rules - In Review
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
 
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped   |Sameday |errorsWarnings	                                                                                                                                                                                                                       |
      |In Review	                                    |STATUSZERO	                                    |			       |yes     |                                                                                                                                                                                                                                      |
      |In Review	                                    |In Review	                                    |			       |yes     |ERROR: Duplicate [In Review] status is not allowed	                                                                                                                                                                                   |
      |In Review	                                    |Approved	                                    |			       |yes     |                                                                                                                                                                                                                                      |
      |In Review	                                    |Withdrawn	                                    |Add Stopped Reason|yes	    |                                                                                                                                                                                                                                      |
      |In Review	                                    |Active                                       	|			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
      |In Review	                                    |Enrolling by Invitation                        |			       |yes     |WARNING: Interim status [Approved] is missing                                                                                                                                                                                         |
      |In Review	                                    |Closed to Accrual                            	|			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
      |In Review	                                    |Closed to Accrual and Intervention	            |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                   |
      |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                           |
      |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing                                                                        |
      |In Review	                                    |Complete	                                    |			       |yes     |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing           |
      |In Review	                                    |Administratively Complete	                    |Add Stopped Reason|yes	    |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	       |
      
 Scenario Outline: #17b Trial Status Transition Rules - Approved status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed
   
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                        |
      |Approved	                                        |STATUSZERO                                   	|			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |In Review	                                    |			        |yes    |ERROR: Invalid status transition from [Approved] to [In Review] 	                                                                                                                                                                                                    |
      |Approved	                                        |Approved	                                    |			        |yes    |ERROR: Duplicate [Approved] status is not allowed	                                                                                                                                                                                                                    |
      |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Active	                                        |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Enrolling by Invitation	                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Approved	                                        |Closed to Accrual	                            |			        |yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
      |Approved	                                        |Closed to Accrual and Intervention	            |			        |yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                |
      |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                        |
      |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                                                                                                    |
      |Approved	                                        |Complete	                                    |			        |yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                            |
      |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                              |
      
     
Scenario Outline: #17c Trial Status Transition Rules - Withdrawn
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                               |
      |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason |yes       |                                                                                                                                                               |
      |Withdrawn	                                    |In Review	                                    |Add Stopped Reason |yes       | ERROR: Invalid status transition from [Withdrawn] to [In Review] 	                                                                                           |
      |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Approved] 	                                                                                           |
      |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|yes       | ERROR: Duplicate [Withdrawn] status is not allowed	                                                                                                           |
      |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Active]	                                                                                               |
      |Withdrawn	                                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Enrolling by Invitation]	                                                                               |
      |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual]	                                                                                   |
      |Withdrawn	                                    |Closed to Accrual and Intervention	            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual and Intervention]                                                                     |
      |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual]	                                                                       |
      |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual and Intervention]                                                         |
      |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Complete]	                                                                                           |
      |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|yes       | ERROR: Invalid status transition from [Withdrawn] to [Administratively Complete]	                                                                                                                                                                                            |
      
  
Scenario Outline: #17d Trial Status Transition Rules - Active status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

     
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Active	                                        |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Active	                                        |In Review	                                    |			        |yes    | ERROR: Invalid status transition from [Active] to [In Review]	                                                                                                                                                                                                                |
      |Active	                                        |Approved	                                    |			        |yes    | ERROR: Invalid status transition from [Active] to [Approved]	                                                                                                                                                                                                                |
      |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Active	                                        |Active	                                        |			        |yes    | ERROR: Duplicate [Active] status is not allowed	                                                                                                                                                                                                                            |
      |Active	                                        |Enrolling by Invitation	                    |			        |yes    | ERROR: Invalid status transition from [Active] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Active	                                        |Closed to Accrual	                            |			        |no     | WARNING: Statuses [Active] and [Closed to Accrual] have the same date                                                                                                                                                                                      |
      |Active	                                        |Closed to Accrual and Intervention             |			        |no     | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Active] and [Closed to Accrual and Intervention] have the same date                                                                                                                |
      |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no     | WARNING: Statuses [Active] and [Temporarily Closed to Accrual] have the same date  	                                                                                                                                                                        |
      |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no     | WARNING: Statuses [Active] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                         |
      |Active	                                        |Complete	                                    |			        |yes    | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
      |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|yes    | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
     
Scenario Outline: #17e Trial Status Transition Rules - Enrolling by Invitation
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed

        
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday   |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Enrolling by Invitation	                        |STATUSZERO	                                    |			        |yes       |                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |In Review	                                    |			        |yes       |  ERROR: Invalid status transition from [Enrolling by Invitation] to [In Review]	                                                                                                                                                                                                |           
      |Enrolling by Invitation	                        |Approved	                                    |			        |yes       |  ERROR: Invalid status transition from [Enrolling by Invitation] to [Approved]	                                                                                                                                                                                                |           
      |Enrolling by Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|yes       |                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Active	                                        |			        |yes       | ERROR: Invalid status transition from [Enrolling by Invitation] to [Active]                                                                                                                                                                                                    |                  
      |Enrolling by Invitation	                        |Enrolling by Invitation	                    |			        |yes       | ERROR: Duplicate [Enrolling by Invitation] status is not allowed	                                                                                                                                                                                                            |
      |Enrolling by Invitation	                        |Closed to Accrual	                            |			        |no        | WARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual] have the same date                                                                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Closed to Accrual and Intervention             |			        |no        | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Statuses [Enrolling by Invitation] and [Closed to Accrual and Intervention] have the same date 	                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|no        | WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual] have the same date                                                                                                                                                                                                                                                                       |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|no        | WARNING: Statuses [Enrolling by Invitation] and [Temporarily Closed to Accrual and Intervention] have the same date                                                                                                                                                                                                                                                                       |
      |Enrolling by Invitation	                        |Complete	                                    |			        |yes       | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Enrolling by Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|yes       | WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |

Scenario Outline: #17f Trial Status Transition Rules - Closed to Accrual
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Closed to Accrual	                            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                           |
      |Closed to Accrual	                            |In Review	                                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [In Review]	                                                                                                                                                                                                    |
      |Closed to Accrual                                |Approved	                                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Approved]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Active	                                        |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Active]	                                                                                                                                                                                                        |
      |Closed to Accrual                            	|Enrolling by Invitation	                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual] to [Enrolling by Invitation]	                                                                                                                                                                                        |
      |Closed to Accrual                            	|Closed to Accrual	                            |			        |yes    |  ERROR: Duplicate [Closed to Accrual] status is not allowed 	                                                                                                                                                                                                                |
      |Closed to Accrual                            	|Closed to Accrual and Intervention             |			        |yes    |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual]	                                                                                                                                                                                |
      |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                |
      |Closed to Accrual	                            |Complete	                                    |			        |yes    |  WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
      |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|yes    |  WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
    
Scenario Outline: #17g Trial Status Transition Rules - Closed to Accrual and Intervention
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |STATUSZERO	                                    |			        |yes    |                                                                                                                                                                                                                                                                          |
      |Closed to Accrual and Intervention	            |In Review	                                    |			        |yes    | ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Approved	                                    |			        |yes    | ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Active	                                        |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Active]	                                                                                                                                                                                        |
      |Closed to Accrual and Intervention	            |Enrolling by Invitation	                    |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Enrolling by Invitation]	                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Closed to Accrual	                            |			        |yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Closed to Accrual]	                                                                                                                                                                            |
      |Closed to Accrual and Intervention	            |Closed to Accrual and Intervention             |			        |yes    |  ERROR: Duplicate [Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                 |
      |Closed to Accrual and Intervention	            |Complete	                                    |			        |yes    |                                                                                                                                                                                                                                                                        |
      |Closed to Accrual and Intervention	            |Administratively Complete	                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                        |

    
Scenario Outline: #17h Trial Status Transition Rules - Temporarily Closed to Accrual
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
 
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                            |
      |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [In Review]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Approved]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                                 |
      |Temporarily Closed to Accrual                  	|Enrolling by Invitation	                    |Add Stopped Reason	|yes    || 
      |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual  	                |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |   ERROR: Duplicate [Temporarily Closed to Accrual] status is not allowed	                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|yes    |   ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Complete]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|yes    |   WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
      
      
Scenario Outline: #17i Trial Status Transition Rules - Temporarily Closed to Accrual and Intervention
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed  
    
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday  |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|yes      |  ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Enrolling by Invitation	                    |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|yes      |                                                                                                                                                                                                                                                                         |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Intervention             |Add Stopped Reason	|yes      |   WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|yes      |   ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes      |   ERROR: Duplicate [Temporarily Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|yes      |   ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Complete]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|yes      |   WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |

Scenario Outline: #17j Trial Status Transition Rules - Complete
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed   
      
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday |errorsWarnings	                                                                                                                                                                                                                                                                |
      |Complete	                                        |STATUSZERO	                                    |			        |yes     |                                                                                                                                                                                                                                                                           | 
      |Complete	                                        |In Review	                                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [In Review]	                                                                                                                                                                                                            |
      |Complete                                    	    |Approved	                                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [Approved]	                                                                                                                                                                                                                |
      |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Withdrawn]	                                                                                                                                                                                                            |
      |Complete                                    	    |Active	                                        |			        |yes     | ERROR: Invalid status transition from [Complete] to [Active]	                                                                                                                                                                                                                |
      |Complete	                                        |Enrolling by Invitation	                    |			        |yes     | ERROR: Invalid status transition from [Complete] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Complete	                                        |Closed to Accrual	                            |			        |yes     | ERROR: Invalid status transition from [Complete] to [Closed to Accrual]	                                                                                                                                                                                                    |
      |Complete	                                        |Closed to Accrual and Intervention             |			        |yes     | ERROR: Invalid status transition from [Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                                       |
      |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |
      |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                           |
      |Complete	                                        |Complete	                                    |			        |yes     | ERROR: Duplicate [Complete] status is not allowed	                                                                                                                                                                                                                            |
      |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|yes     | ERROR: Invalid status transition from [Complete] to [Administratively Complete]	                                                                                                                                                                                            |
      

Scenario Outline: #17k Trial Status Transition Rules - Administratively Complete
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I have selected an organization 
And I have selected the Participating Site Status
And the Trial Information source is "Protocol"
When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> and same day rule <Sameday> the respective checks <errorsWarnings> will be displayed   
       
      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |Sameday|errorsWarnings	                                                                                                                                                                                                                                                                |
      |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|yes    |                                                                                                                                                                                                                                                                           |
      |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [In Review]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Approved]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Withdrawn]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Active]	                                                                                                                                                                                                |
      |Administratively Complete	                    |Enrolling by Invitation	                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Enrolling by Invitation]	                                                                                                                                                                                |
      |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual]	                                                                                                                                                                                    |
      |Administratively Complete	                    |Closed to Accrual and Intervention             |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                      |
      |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                        |
      |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual and Intervention]	                                                                                                                                                        |
      |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|yes    |  ERROR: Invalid status transition from [Administratively Complete] to [Complete]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|yes    |  ERROR: Duplicate [Administratively Complete] status is not allowed	                                                                                                                                                                                                            |

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
   |Date Entered past| Active       |Date entered Now                                |Aproved      |                   |Warning: Invalid Transition from [Active] to [Approved]   |


Scenario Outline: #20 Rules for Status/Dates relationships
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
And the Trial Information source is "Protocol"
When Current Trial Status is <TrialStatusType>
Then The Trial date Type is <DateType>
     
Examples:

|TrialStatusType                          |DateType  |
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

 
