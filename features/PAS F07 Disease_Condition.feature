@PA @global
Feature: PAS F07  Add and Edit Disease and Condition 

As a CTRP Scientific Abstractor, I can add and edit Disease and Condition  

Scenario: #1 I can add Disease and Condition for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease/Condition screen
When I have selected the Add button 
Then the Find a Disease/Condition screen displays
And I can select Search Synonyms 
And I can select Exact match only
When I have started entering a term
Then a list of type ahead terms display
When I have entered a term
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
    Then the Disease/Condition screen displays with the term(s) added type

      |Preferred Name  |
      |View Details  |
      |Code  |
      |NCI Thesaurus Concept ID  |
      |Menu Display Name  |
      |Parent Preferred Name(s)  |
      |Rank  |
      |Edit Link  |
      |Delete Box  |


And the Disease/Condition is associated to the trial
And a message displays "# items found, displaying all items"
 
 Scenario:#2 I can remove Disease/Condition from " Your Selections" 
    Given I am on the Find Disease/Condition screen
     When I click on the remove icon on the left side of the Preferred Term in "Your Selections" 
     Then The term will be removed from "Your Selections"
     And the disease selected message decrements 
     |0 diseases selected|
     
     Scenario: #3  Find a Disease/Condition Search Synonyms selected
Given I am on the Find a Disease/Condition screen
When I have entered a term
And I have selected Search Synonyms
And I Click the search icon or click Enter 
Then a list of Preferred Terms and Synonyms that contain the entered term displays
And a can select a preferred term to add 

Scenario: #4  Find a Disease/Condition Exact Match 
Given I am on the Find a Disease/Condition Screen
When I have entered a term
And I have selected Exact match only
And I Click the search icon or click Enter 
Then only exact term will be displayed 
And a message displays with the number of results for the entered term


Scenario: #5 Edit Disease/Condition for a trial- Only the Rank field can be edited
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I have selected Edit for a specific Disease/Condition
Then the Edit Disease/Condition Screen displays 
And Preferred Name is prefilled with the NCIt Preferred Name 
And Code is prefilled with the NCIt Code
And the NCI Thesaurus Concept ID is prefilled
And Menu Display Name is prefilled with the NCIt Menu Display Name
And Parent Name is prefilled with the NCIt Parent Name
And The field "Rank"  will be defaulted to "None" value
And I can change the defaulted value to Rank Type
|Rank|
|Primary|
|Secondary|

When I Select the Save Button
Then the Disease/Condition screen displays with the updated Rank for the disease/Condition term
And the updated Disease/Condition screen is associated to the trial
And the message Record Updated displays


Scenario: #6  Find a Disease/Condition Reset
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


Scenario: #7  View Details for a trial
Given  I am on the Disease and Condition screen
When I have Clicked on the View Details for a specific Disease/Condition
Then the Disease/Condition Details screen displays

      |Preferred Name  |
      |Code |
      |NCI Thesaurus Concept ID  |
      |Menu Display Name  |
      |Other Name(s)  |
      |Super-Concept  |
      |Sub-Concept  |

When I click on the close button
Then the Disease/Condition screen displays

Scenario: #8  Delete Disease/Condition for a trial
Given  I am on the Disease and Condition screen
And I have selected Delete box for the selected Disease/Condition
And I have selected another delete check box for another Disease/Condition criteria
And I have the option to select all Disease/Condition entries by clicking on the select all button
When I have clicked on Delete button
Then the message displays 'click OK to remove selected Disease/Condition from the study.Click Cancel to abort'
When I click on the OK button 
Then the selected Disease/Condition(s) is removed from the trial record
And the message ‘Record(s) deleted’ displays
When I have clicked on the cancel button 
Then the selected Disease/Condition criteria is not removed 
And no message displays

  Scenario: #9 NCIt terms details info button
    Given I am on the Find a Disease/Condition screen
    And I have a list of terms
    When I click on the NCIt terms details info button
    Then NCIthesaurus new screen opens


Scenario: #10 Display PDQ disease tree
Given I am on Find a Disease/Condition screen
When I click on the Show Tree icon
Then the NCIt/CTRP tree displays 

Scenario: #11  Show Tree for a term
Given I am on Find a Disease/Condition screen
And I have a list of terms
When I click on the Show Tree icon to the right of the term
Then the location of the term in the CTRP Disease hierachy displays 
And Other Disease Terms display in the NCIt/CTRP Tree
When I select other terms that are displayed in the NCIt/CTRP Tree
Then the term is added to "Your Selections" 


Scenario:  #12 I must select Primary designation  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
And I have not checked the 'Primary' box for any of the displayed diseases 
When I have selected Save
Then a warning message displays 
|One disease must be selected as primary|
When I select multiple entries of the displayed diseases
And I select the Save button
Then an error message displays 
|Only one disease can be selected as primary |

Scenario:  #13 I can select one secondary disease designation  
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Disease and Condition screen
When I select multiple secondary entries of the displayed diseases
And I select the Save button
Then an error message displays
| Only one disease can be selected as secondary |