@PA @global
Feature:   PAS F05 Add and Edit Eligibility Criteria 
As a CTRP Scientific Abstractor, I can add and edit Eligibility Criteria
Scenario: #1 I can add and edit Eligibility Criteria for an Interventional trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of interventional
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for ‘Minimum Age’
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for ‘Maximum Age’
And I have selected ‘Units’
When I have selected Save
Then Eligibility Criteria will be associated with the interventional trial

Scenario: #2  I can add and edit Eligibility Criteria for an Observational trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of observational
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for Minimum Age
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for Maximum Age
And I have selected Units
And I have selected a value for Sampling Method
|Sampling Method|
|Probability Sample|
|Non-Probability Sample|
And I have entered a value for Study Population Description
When I have selected Save
Then Eligibility Criteria will be associated with the observational trial

Scenario: #3  I can add and edit Eligibility Criteria for an Ancillary Correlative trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with clinical research category of Ancillary Correlative
And I am on the Eligibility Criteria screen
And I have selected Accepts Healthy Volunteers 
|Accepts Healthy Volunteers|
|Yes |
|No|
And I have selected Gender
|Gender|
|Male|
|Female|
|Both|
And I have entered a value for Minimum Age
And I have selected Units
|Units|
|Years|
|Months|
|Days|
|Hours|
|Minutes|
And I have entered a value for Maximum Age
And I have selected Units
And I have selected a value for Sampling Method
|Sampling Method|
|Probability Sample|
|Non-Probability Sample|
And I have entered a value for Study Population Description
When I have selected Save
Then Eligibility Criteria will be associated with the observational trial

Scenario:  #4 Minimum Age is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And any of the following <Min age fields> are Null
|Min age fields|
|Minimum Age|
|Unit|
When I select Save 
Then a warning message will appear for the null values with the message “Enter 0 if no min age is indicated and select ‘Years’ as Unit 

Scenario:  #5 Maximum Age is not null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And any of the following <Max age fields> are Null
|Max age fields|
|Maximum Age|
|Unit|
When I select Save 
Then a warning message will appear for the null values with the message “Enter 999 if no max age is indicated and select ‘Years’ as Unit 

Scenario:  #6 Accept Healthy Volunteers, Gender not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And any of the following <Null Fields> are Null
|Null Fields|
|Accepts Healthy Volunteers |
|Gender|
When I select Save 
Then a warning message will appear for the null values with the message “Null Fields is required”

Scenario:  #7 Sampling Method, Study Population Description for non interventional trial not Null   
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial with a <non interventional clinical research category> 
|non interventional clinical research category|
|observational|
|ancillary correlative|
And I am on the Eligibility Criteria screen
And any of the following <non interventional null fields> are Null
| non interventional null fields|
|Sampling Method |
|Study Population|
When I select Save 
Then a warning message will appear for the null values with the message “<non interventional null fields>  is required”

Scenario: #8  Add Inclusion Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
And I have entered the Eligibility Criteria
And I have saved the Eligibility Criteria
When I have selected the Add Inclusion Criterion button 
Then the Add/Edit Eligibility screen displays 
And Eligibility Criterion Type is defaulted to Inclusion
And I have entered a value in Eligibility Criterion Description
When I have selected Save
Then the Inclusion Eligibility Criteria will be associated with the trial
And ‘Record Created’ message displays

Scenario: #9  Add Exclusion Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
And I have entered the Eligibility Criteria
And I have saved the Eligibility Criteria
When I have selected the Add Exclusion Criterion button 
Then the Add/Edit Eligibility screen displays 
And Eligibility Criterion Type is defaulted to Exclusion
And I have entered a value in Eligibility Criterion Description
When I have selected Save
Then the Inclusion Eligibility Criteria will be associated with the trial
And ‘Record Created’ message displays

Scenario: #10  Edit  Other Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Eligibility Criteria screen
When I select Edit for any eligibility Criteria 
Then the Add/Edit Eligibility screen displays 
And I edit <eligibility fields>
|eligibility fields|
|eligibility criterion type|
|eligibility criterion description|
And I select Save Button
And I have entered a value in Eligibility Criterion Description
When I have selected Save
Then the updated Eligibility Criteria will be associated with the trial
And the eligibility screen displays with the updated other criteria
And the message ‘record updated’ displays

Scenario: #11  Enter Duplicate Eligibility Criteria
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Add/Edit Eligibility screen
When I enter a duplicate eligibility Criterion 
And I select the Save button 
Then  the message displays ‘Click OK to add a duplicate Eligibility Criterion Description.  Click Cancel to abort’ 
When I select OK button
Then the duplicate eligibility criterion is saved to the trial record
And the message ‘Record created’ displays
When I select Cancel button
Then the duplicate eligibility criterion is not saved to the trial record 

Scenario:  #12 Character display for Eligibility Criterion Description
    Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
      And I am on the Add/Edit Eligibility Criteria screen
  When I am entering text for Eligibility Criteria Description
     Then information text appears to display the number of characters available to enter into the field
      | 5000 characters left | 
And a cumulative message displays with the Total Character of all Eligibility Criterion Descriptions that have been saved 
     When 5000 characters have been entered
     Then no additional text can be entered

Scenario:  #13 I can Delete Eligibility Criterion for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criterion screen
When I have selected the Delete check box for an eligibility criteria 
And I have selected another delete check box for an eligibility criteria
And have clicked on Delete button
And the message displays 'click OK to remove selected eligibility criteria(s) form the study. Click Cancel to abort'
And I have clicked on OK
Then the Eligibility Criterion (s) is removed from the trial record
When I have clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
Then the message displays 'click OK to remove selected eligibility criteria(s) form the study. Click Cancel to abort'
When I click on the OK button 
Then the eligibility criteria(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the eligibility criteria is not removed 
And no message displays

Scenario:  #14 I can cancel on the Eligibility Criteria screen
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Eligibility Criteria screen
And I have updated the Eligibility Criteria 
When I select the Cancel button 
Then the Eligibility Criteria that was entered or updated will not be saved to the trial record
And the screen will be refreshed with data since the last save

Scenario:  #15 I can cancel on the Add/Edit Eligibility Criteria screen
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Eligibility Criteria screen
And I have updated the Eligibility Criteria 
When I select the Cancel button 
Then the Eligibility Criteria that was entered or updated will not be saved to the trial record
And the screen will be refreshed with data since the last save
And the Eligibility Criteria screen displays

Scenario:  #16 I can reset on the Add/Edit Eligibility Criteria screen
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Add/Edit Eligibility Criteria screen
And I have updated the Eligibility Criteria 
When I select the Reset button 
Then the Eligibility Criteria that was entered or updated will not be saved to the trial record
And the screen will be refreshed with data since the last save
And the Add/Edit Eligibility Criteria screen displays
