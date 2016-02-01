@Admin @Global 
Feature: PAM F12 Manage NCIt Disease Terms 

As a CTRP Scientific Abstractor,I can manage NCIt Disease Terms

Scenario: #1 I can Import a term from NCIt that is not in CTRP
Given I am logged into CTRP
And I select the option to Manage NCIt Terms
And I select the option to Manage NCIt Disease Terms
And I select the option to Import/Sync Term With NCIt
When I enter the NCIt Identifier
And click the Look Up button
Then Import New Disease/Condition From NCIt screen displays
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
| Synonyms|
| Paent Terms NCIt ids |
| Child Term NCIt ids|
When I click the Import Button
Then the intervention term is imported
And the system synchronizes

Scenario: #2 I can Import a term from NCIt that is already in CTRP
Given I have selected the option to Manage NCIt Disease Terms
And I select the option to Import/Sync Term With NCIt
And I am on the Import New Disease/Condition From NCIt screen
When I enter the NCIt Identifier
And click the Look Up button
Then Synchronize Existing Disease Term with NCIt screen displays with the following Attributes
| NCIt Identifier |
| CDR Identifier |
| Preferred Name|
|Display Name
| Synonyms|
| Parent Terms |
| Child Terms|
And the term already present in CTRP message displays
| Message.  Disease with NCIt code 'C1234' already present in CTRP, compare the values below and click 'Sync Term' to update the CTRP term with values from NCIt|
And note displays 
|Note: 'CDR Identifier'attribute is  NOT synchronized from NCIt, its existing CTRP value(s) shown above will be retained.|
When I click the Sync Term Button
Then the system synchronizes
And the pop up message displays
|The CTRP system is synching the term c### with the NCIt.  Depending on the number of parents and children in the disease term hierarchy, it can take from 5 minutes to two hours or more to sync the term.  Please go to the CTRP Term Tree in PA after a few minutes to verifiy  |
When I click the OK button
Then the Manage NCIt Disease/Condition or Intervention Terms screen displays

Scenario: #3 I can request new term request form
Given I select the option Manage NCIt Disease Terms
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
Given I select the option Manage NCIt Disease Terms
When I select the option Enter Term Information
Then the Enter New Disease/Condition Details form displays
And I must enter NCIt Identifier
And I can enter CDR Identifier
And I must enter Preferred Name
And I must enter Display Name
And I can enter Synonym 
When I click the Add button
Then the Synonym is moved to the box directly below  
And I can add another Synonym 
When I click the Add button
Then the Synonym is moved to the box directly below  

Scenario: #5 I can add Parent Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I click the Look Up & Add button for Parent Term NCIt Ids
Then the Look Up Parent Diseases form displays
And the Find a Disease/Condition form displays
And I can select Search Synonyms 
And I can select Exact match only
When I have started entering a term
Then a list of type ahead terms display
When I Select a term in the list
And click the search icon or click on Enter
Then a list of Preferred Terms that contain the entered term display
And a message displays with the number of results for the term entered 

      |1964 results for "cancer" |

    When I select one or more terms from the preferred names listed by clicking on the the Add button to the right of the term
    And I can click on "Add All" button to add all preferred terms to "Your Selections"
    Then the selected term will be displayed in "Your Selections" 
    And the message displays with the number of diseases selected on the top of "Your Selections" screen
     | 3 diseases selected|
    When I select the add button 
    Then the Enter New Disease/Condition Details form displays with the term(s) added in the Parent Term NCIt ids
 
 Scenario:#6 I can remove Disease/Condition from " Your Selections" 
    Given I am on the Find Disease/Condition screen
     When I click on the remove icon on the left side of the Preferred Term in "Your Selections" 
     Then The term will be removed from "Your Selections"
     And the disease selected message decrements 
     |0 diseases selected|
     
     Scenario: #7  Find a Disease/Condition Search Synonyms selected
Given I am on the Find a Disease/Condition screen
When I have entered a term
And I have selected Search Synonyms
And I Click the search icon or click Enter 
Then a list of Preferred Terms and Synonyms that contain the entered term displays
And a can select a preferred term to add 

Scenario: #8  Find a Disease/Condition Exact Match 
Given I am on the Find a Disease/Condition Screen
When I have entered a term
And I have selected Exact match only
And I Click the search icon or click Enter 
Then only exact term will be displayed 
And a message displays with the number of results for the entered term


Scenario: #9 Find a Disease/Condition Reset
Given I am on the Find a Disease/Condition screen
When I have entered a term
And I Click the search icon or click Enter 
Then a list of Preferred Terms will be displayed
And a message displays with the number of results for the entered term
When I select a term for the list 
Then the term is displayed in 'Your Selections' 
When I select the Reset button 
Then the term is not displayed in 'Your Selections'
And I get a refreshed screen 


Scenario: #10 I can add Child Term NCIt Ids 
Given I am on the Enter New Disease/Condition Details form
When I click the Look Up & Add button for Child Term NCIt Ids
Then the Look Up Child Diseases form displays
And the Find a Disease/Condition form displays
And I can select Search Synonyms 
And I can select Exact match only
When I have started entering a term
Then a list of type ahead terms display
When I Select a term in the list
And click the search icon or click on Enter
Then a list of Preferred Terms that contain the entered term display
And a message displays with the number of results for the term entered 

      |1964 results for "cancer" |

    When I select one or more terms from the preferred names listed by clicking on the the Add button to the right of the term
    And I can click on "Add All" button to add all preferred terms to "Your Selections"
    Then the selected term will be displayed in "Your Selections" 
    And the message displays with the number of diseases selected on the top of "Your Selections" screen
     | 3 diseases selected|
    When I select the add button 
    Then the Enter New Disease/Condition Details form displays with the term(s) added in the Child Term NCIt ids
    
    Scenario: #11 NCIt terms details info button
    Given I am on the Find a Disease/Condition screen
    And I have a list of terms
    When I click on the NCIt terms details info button
    Then NCIthesaurus new screen opens


Scenario: #12 Display PDQ disease tree
Given I am on Find a Disease/Condition screen
When I click on the Show Tree icon
Then the NCIt/CTRP tree displays 

Scenario: #13  Show Tree for a term
Given I am on Find a Disease/Condition screen
And I have a list of terms
When I click on the Show Tree icon to the right of the term
Then the location of the term in the CTRP Disease hierachy displays 
And Other Disease Terms display in the NCIt/CTRP Tree
When I select other terms that are displayed in the NCIt/CTRP Tree
Then the term is added to "Your Selections" 
 

Scenario: #14 I can remove synonyms
Given I am on the Enter New Disease/Condition Details form
When I select a synonym to be removed
And Click on the Remove button
Then the Synonym is removed from the list of synonyms

Scenario: #15 I can remove Parent Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I select a Parent Term NCIt Id to be removed
And Click on the Remove button
Then the Parent Term NCIt Id is removed from the list of synonyms

Scenario: #16 I can remove Child Term NCIt Ids
Given I am on the Enter New Disease/Condition Details form
When I select a Child Term NCIt Ids to be removed
And Click on the Remove button
Then the Child Term NCIt Ids is removed from the list of synonyms

Scenario: #17 I can Reset Enter New Disease Details
Given I am on the New Disease Details form
And I have entered data into the fields
When I select the reset button
Then the message displays
|Click OK to reset the Disease details.  Click Cancel to abort|
When I click OK
Then the data that has been entered since the last save is removed
When I click Cancel
Then the data is not removed