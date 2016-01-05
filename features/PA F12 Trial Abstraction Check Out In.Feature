@PA @global
Feature: PA F12 Trial Abstraction Check Out In 
Description:  As an Abstractor user, I can check out a trial for abstraction 

Scenario: #1 I can Check Out a trial for both Administration and Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Both 
Then the Trial Administration and Scientific sections (listed below) will locked out from other Abstractors until the trial is checked in
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups|
|Bio Markers|
And the Check Out Type will be Administrative
And the Administrative Check Out User will be my User ID
And the Administrative Check Out Date will be the current date and time
And the Check Out Type will be Scientific
And the Scientific Check Out User will be my User ID
And the Scientific Check Out Date will be the current date and time

Scenario: #2 I can Check Out a trial for Administration Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Administrative  
Then the Trial Administration sections (listed below) will locked out from other Abstractors until the administrative sections of the trial are checked in
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
And the Check Out Type will be Administrative
And the Administrative Check Out User will be my User ID
And the Administrative Check Out Date will be the current date and time


Scenario: #3 I can Check Out a trial for Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check Out Scientific 
Then the Trial Scientific sections (listed below) will locked out from other Abstractors until the trial is checked in
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups|
|Bio Markers|
And the Check Out Type will be Scientific
And the Scientific Check Out User will be my User ID
And the Scientific Check Out Date will be the current date and time

Scenario: #4 I can Check In a trial from both Administration and Scientific Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check In Both 
Then the Trial Administration and Scientific sections (listed below) will unlocked and to allow Abstractors to check out the trial
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups|
|Bio Markers|
And the Check In Type will be Administrative
And the Administrative Check In User will be my User ID
And the Administrative Check In Date will be the current date and time
And the Check In Type will be Scientific
And the Scientific Check In User will be my User ID
And the Scientific Check In Date will be the current date and time
And I must enter a Check In Comment

Scenario: #5 I can Check In a trial from Administration Abstraction
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check In Administration
Then the Trial Administration sections (listed below) will unlocked and to allow Abstractors to check out the trial
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
And the Check In Type will be Administrative
And the Administrative Check In User will be my User ID
And the Administrative Check In Date will be the current date and time
And I must enter a Check In Comment

Scenario: #6 I can Check In a trial from  Scientific Abstraction
Given I am logged into the CTRP Protocol  Scientific application
And I have selected a trial 
And I have selected Check In   Scientific 
Then the Trial Scientific sections (listed below) will unlocked and to allow Abstractors to check out the trial
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups|
|Bio Markers|
And the Check In Type will be Scientific
And the Scientific Check In User will be my User ID
And the Scientific Check In Date will be the current date and time
And I must enter a Check In Comment

Scenario: #7 Check In comment required
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial 
And I have selected Check In  
And I select the Check Type 
And I do not enter a Comment
Then the system will display the message "Please enter a Check In comment"
And the trail will not be checked in
