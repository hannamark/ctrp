@PA @global
Feature: As a CTRP Scientific  Abstractor, I can add and edit Associated Trial 

Scenario: # I can add an Associated Trial for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
When  I have selected the Add button
Then I am on the Add Associated Trial screen
And I must select <Identifier Type>
|Identifier Type|
|NCI |
|NCT|
And I must enter the Trial Identifier
When I click the Look Up Trial button
Then the Requested Trial is retrieved

      |Identifier type  |Retrieved from  |
      |NCI  |CTRP  |
      |NCT  |ClinicalTrials.gov  |
      
And the Clinical Research Category populates
And the Official Title populates
When I have clicked the Save button
Then the associated study displays on the Associated Trials screen
And the Message Record Created displays
And the Associated Trial will be associated with the trial

Scenario Outline: #2   corresponding Associated Trial records will be created for both associated trials  
Given the added Associated Trial is a CTRP study
When the Associated Trial is displayed on the Associated Trials screen
Then the <AssociatedTrialFields> on the Associated Trials screen of the Associated Trial study are added

      |AssociatedTrialFields| 
      |Identifier Type  |
      |Trial Identifier  |
      | Clinical Research Category |
      |Official Title  |
      
      Example:
      
      |CTRPstudyID|Title | ClinRschCat|AssociatedTrial_Trial Identifier  |AssociatedTrial_ClinicalResearchCategory  | AssociatedTrial_Official Title| 
      |NCI111  |Root study  |Interventional  |NCI555 |  Ancillary Correlative|Assoc study  |
      |NCI555  |Assoc Study | Ancillary Correlative  |NCI111  |Inteventional  | Root Study|


Scenario: #3 Associated Trial is not found
Given I am on the Add Associated Trials screen
And  I have selected Identifier Type
And I have entered the Trial Identifier 
And I have selected the Look Up Trial button
When trial identifer is not found
Then the message 'Trial is not found' displays 

Scenario:  #4 Trial Identifier information not null   
Given I am I am on the Add Associated Trial screen
When I click on 'Look Up Trial' button 
And the Trial Identifier is Null
Then an error message will appear "Trial Identifier is Required” 

Scenario:  #5 Identifier Type not null   
Given I am I am on the Add Associated Trial screen
When I click on 'Look Up Trial' button 
And the Identifier Type is Null
Then an error message will appear "Identifier Type is Required” 


Scenario: #6 Deleted Associated Trials
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Associated Trials screen
And I have checked the Delete box for an Associated Trial
And I have selected the delete check box for another Associated Trial
When I have clicked on Delete button
Then the message displays 'click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
And I have clicked on OK
Then the Associated Trial will be removed from the trial
When I have clicked on the cancel button 
Then the Associated Trial(s) is not removed 
And no message displays
When I have clicked the Select All button
Then the Delete check box is checked for all entries
When I have clicked on Delete button
Then the message displays 'Click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
When I click on the OK button 
Then the Associated Trial(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the Associated Trial is not removed 
And no message displays

Scenario: #7 Reset Add Associated Trial for a trial
Given I am on the Add Associated Trial screen
And I have entered Identifier Type and Trial Identifier
And I have selected 'Look Up Trial' button
And Clinical Research Category and Official Title have populated
When I select the Reset button
Then the information on the Add Associated Trial screen will not be saved to the trial record
And the Associated Trials screen displays
