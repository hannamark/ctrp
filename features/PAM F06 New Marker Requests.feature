@Admin @Global 
Feature: PAM F11 Manage NCIt Intervention Terms 

As a Research Scientist,I can manage NCIt Intervention Terms

Scenario: #1 I can Import a term from NCIt that is not in CTRP
Given I am logged into CTRP
And I select the option to Manage NCIt Intervention Terms
And I select the option to Import/Sync Term With NCIt
When I enter the NCIt Identifier
Then Import New Intervention From NCIt screen displays
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
| Synonyms|
| Cancer.gov Type |
| clinicalTrials.gov Type|
And I can enter the CDR Identifier
And I can select the Cancer.gov Type
|Drug|
| Procedure/Surgery |
| Genetic |
|Other|
And I select the ClinicalTrials.gov Type
|Drug|
|Device |
|Biological/vaccine|
| Procedure/Surgery |
|Radiation|
|Behavioral|
|Genetic|
|Dietary Supplement|
|Other|
When I click the Import Button
Then the intervention term is imported
And the system synchronizes

Scenario: #2 I can Import a term from NCIt that is already in CTRP
Given I am logged into CTRP
And I select the option to Manage NCIt Intervention Terms
And I select the option to Import/Sync Term With NCIt
When I enter the NCIt Identifier
Then Synchronize Existing Intervention Term with NCIt screen displays
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
| Synonyms|
| Cancer.gov Type |
| clinicalTrials.gov Type|
And the term already present in CTRP message displays
| Message.  Intervention with NCIt code 'C1234' already present in CTRP, compare the values below and click 'sync Term' to update the CTRP term with values from NCIt|
And note displays 
|Note: 'CDR Identifier','Cancer.gov Type' and 'Clinical Trials.gov Type' attributes are NOT synchronized from NCIt, their existing CTRP values shown above will be retained.|
When I click the Sync Button
Then the system synchronizes
And the Manage NCIt Disease/Condition or Intervention Terms screen displays
And the sychronize message displays
|Message.  Intervention C1777 synchronized with NCI thesaurus|

Scenario: #3 I can request new term request form
Given I select the option Manage NCIt Intervention Terms
When I select the option EVS New Term Request Form
Then the Term Suggestion form displays
|Contact Information:|
And I can enter Business Email
And I can enter Other
|Term Information|
And I can select a value for <Vocabulary>
|NCI Thesaurus|
|NCI Metathesaurus|
|CTCAE|
|NPO|
|Other|
And I can enter Term
And I can enter Synonym(s)
And I can enter Nearest Code\CUI
And I can enter Definition/Other
|Additional Information|
And I can enter project/Product term needed for
And I can enter Reason for suggestion plus any other additional information
|Security Code|
And I can enter 'Enter the characters appearing in the above image'
When I click the Submit button 
Then the request is submitted
When I click the Clear button
Then the message from the webpage displays
|Are you sure you want to clear this page?|
When I click the OK button
Then the information that has been entered on the page is cleared
When I click the Cancel button
Then the information that has been entered on the page is not cleared 

Scenario: #4 I can enter term information
Given I select the option Manage NCIt Intervention Terms
When I select the option Enter Term Information
Then the Enter New Intervention Details form displays
And I must enter NCIt Identifier
And I can enter CDR Identifier
And I must enter Preferred Name
And I can enter Synonym 
When I click the Add button
Then the Synonym is moved to the box directly below  
And I can add another Synonym 
When I click the Add button
Then the Synonym is moved to the box directly below  
And I can select a Cancer.gov Type
And I can select a ClinicalTrial.gov Type
When I click the Save button
Then the Intervention term is entered

Scenario: #5 I can remove synonyms
Given I am on the New Intervention Details form
When I select a synonym to be removed
And Click on the Remove button
Then the Synonym is removed from the list of synonyms

Scenario: #6 I can Reset Enter New Intervention Details
Given I am on the New Intervention Details form
And I have entered data into the fields
When I select the reset button
Then the message displays
|Click OK to reset the intervention details.  Click Cancel to abort|
When I click OK
Then the data that has been entered since the last save is removed
When I click Cancel
Then the data is not removed