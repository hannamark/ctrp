  @PA @Global
  
  Feature:  PAS F10 Add, Edit and Delete Interventions
As a CTRP Scientific Abstractor, I can add, Edit and Delete Trial Interventions 

Scenario: #1 I can add Trial Interventions
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I have clicked on Interventions 
And The Intervention Screen Opens
When I have clicked on the Add button to add Interventions
Then the Add Intervention screen opens
When I have clicked on the Look Up button to select an Intervention Name
Then the Search Intervention Name screen is  displayed
And I enter an intervention name 
When I have clicked on the search button
Then the intervention name type will be displayed
 

      |Preferred Name                |
      |Other Names                   |
      |Type Code                     |
      |ClinicalTrials.gov Type Code  |
      |Description                   |
      |Action                        |

And I will select an Intervention Name by clicking on the Select button on the Action column
And the selected intervention name will be added to the Intervention name field
And The Intervention Type will be populated

      |Drug                |
      |Device              |
      |Biological/Vaccine  |
      |Procedure/Surgery   |
      |Radiation           |
      |Behavioral          |
      |Genetic             |
      |Dietary Supplement  |
      |Other               |
And other names will be added in the other Names field
And I have entered the Intervention Description in the provided box
When I click on the save button to add the Intervention
Then the intervention type will be added
When an Intervention name is not entered
And I have clicked on the Search Button
Then an error type will be displayed

      |Message.Please enter at least one search criteria  |

 Scenario: #2 Intervention Type Rule
    Given I am on the Search Intervention Screen
    And I have completed an Intervention Search
     When I have selected an Intervention to add 
     Then the intervention Type will be automatically populated from the ClinicalTrials.gov Type Code 


   Scenario: #3 Intervention Desciption field Characters Rule
   Given I am on the Add Intervention screen
   And I can type 1000 characters in the Intervention description field
   When I start typing text in the Intervention Description field
   Then the limited characters provided under the Intervention Description field starts to decrement
   And when I have reach the 1000 characters limit no additional text can be entered
    
     

    Scenario: #4 I can search Interventions when Exact Match Only is used
    Given I am on the Search Interventions section
     When the exact Match Only box is checked
     Then only the exact Intervention name should be displayed 
     When The exact Match Only box is NOT checked 
     Then the exact Intervention name will be displayed
     And Other Intervention names may be displayed
     
     
     Scenario: #5 I can search Interventions when Include Synonym search is used
    Given I am on the Search Interventions Section
     When Include Synonym box is checked
     And Intervention Name is an other Name 
     And that Other Name is not the preferred Name
     Then the intervention name should be displayed in the Other Names column
     When the Intervention name synonym is NOT checked 
     Then the Intervention name will not be displayed 
  
   
    Scenario:#6 I can edit Interventions
     Given I know which Intervention name I want to edit 
     When I have Clicked on the edit button on the edit column for the selected intervention name
     Then the edit intervention screen opens
     And I can make my changes 
     And I can save my changes 

  Scenario:#7 I can delete one or multiple Interventions
    Given I know which Intervention name I want to delete
     When I have selected the delete box from the delete column for the selected intervention name
     And I have clicked on the delete button
     Then I have to confirm by cliking on the Ok button to remove selected intervention from the study
     And I will receive the message <Record(s) Deleted> 
     When I have clicked on the cancel button to abort removing the selected intervention from the study
     Then the record won't be deleted 
     And I should not get the message <Record(s) Deleted>
     
       Scenario: #8 I can delete all Intervention
        Given I want to delete all recorded Intervention 
        When I click on the select all button 
        Then All interventions will be selected in the delete column 
        When I have clicked on the delete button 
        Then all recorded interventions will be deleted
        And I have to confirm by cliking on the Ok button to remove all interventions from the study
        And I will receive the message <Record(s) Deleted> 
        When I have clicked on the cancel button to abort removing all intervention from the study
        Then the record won't be deleted 
        And I should not get the message <Record(s) Deleted>
        

      Scenario:#9 I can reorder Interventions 
    Given I am on the Intervention Screen
    And I have the added Interventions listed 
     When I click on an Intervention row
     Then I can hold and drag to reorder the placement of an intervention 
     And My interventions will be reordered 


     
     
     
     

