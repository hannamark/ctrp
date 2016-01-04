@PA @global
Feature: PAS F07  Add and Edit Disease and Condition 

As a CTRP Scientific Abstractor, I can add and edit Disease and Condition  

Scenario: #1 I can add Disease and Condition for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease/Condition screen
When I have selected the Add button 
Then the Find a Disease/Condition screen displays
When I have started entering a term
Then a list of type ahead terms display
When I Select a term in the list
And click the search icon 
Then a list of Preferred Terms that contain the entered term display
And a message displays with the number of results for the term entered
When I select a term for the list 
And select the add button 
Then the Disease/Condition screen displays with the term added
And the following fields are displayed
|Preferred Name|
|Code|
|NCI Thesaurus Concept ID|
|Menu Display Name|
|Parent Preferred Name| 
And the Disease/Condition is associated to the trial

Scenario: #2  Edit Disease/Condition for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I have selected Edit for a specific Disease/Condition
Then the Edit Disease/Condition Screen displays 
And Preferred Name is prefilled with the NCIt Preferred Name 
And Code is prefilled with the NCIt Code
And Menu Display Name is prefilled with the NCIt Menu Display Name
And Parent Name is prefilled with the NCIt Parent Name
And I can select <Rank>
|Rank|
|Primary|
|Secondary|
|None|
When I Select the Save Button
Then the Disease/Condition screen displays with the updated Rank for the disease/Condition term
And the updated Disease/Condition screen is associated to the trial

Scenario: #3  Find a Disease/Condition Search Synonyms
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease/Condition screen
When I have selected the Add button 
Then the Find a Disease/Condition screen displays
When I have entered a term
And I have selected Search Synonyms
And I Click the search icEnter 
Then a list of Preferred Terms and Synonyms that contain the entered term display
And a message displays with the number of results for the "term entered"
When I select a term for the list 
And select the add button 
Then the Disease/Condition screen displays with the term added
And the following fields are displayed
|Preferred Name|
|Code|
|NCI Thesaurus Concept ID|
|Menu Display Name|
|Parent Preferred Name| 
And the Disease/Condition is associated to the trial

Scenario: #4  Delete Disease/Condition for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I have selected Delete Disease/Condition
And I have selected another delete check box for an Disease/Condition criteria
And have clicked on Delete button
And the message displays 'click OK to remove selected Disease/Condition from the study. Click Cancel to abort'
And I have clicked on OK
Then the Disease/Condition will be removed from the trial
When I have clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
And the message displays 'click OK to remove selected Disease/Condition from the study.Click Cancel to abort'
When I click on the OK button 
Then the Disease/Condition(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the Disease/Condition criteria is not removed 
And no message displays

Scenario: #5 Cancel Edit Disease/Condition for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
And I have updated Disease/Condition
When I select the Cancel button
Then the information entered or edited on the Disease/Condition screen will not be saved to the trial record
And the screen will be refreshed with the existing data

Scenario:  #6 I must select Primary designation  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
And I have not checked the 'Primary' box for any of the displayed diseases 
When I have selected Save
Then a warning message will appear for the null values with the message One disease must be selected as primary
When I select multiple entries of the displayed diseases
And I select the Save button
Then a warning message displays with the message Only one disease can be selected as primary