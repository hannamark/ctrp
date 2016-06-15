@PA @global
Feature: PA F13 Abstraction Validation

As a CTRP PA Abstractor, I can access the Abstraction Validation View the Trial History Information Audit Trail

Scenario: #1 Successful Abstraction Validation for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I select the Abstraction vaidation option
When there are no warnings or errors
Then the 'Abstraction is valid' message displays
And the <ViewButtons> display
|ViewButtons|
|View XML|
|View TSR|
And the milestone 'Ready for Trial Summary Report Date' is added to the milestone for the study

Scenario: #2 Abstraction Validation with warnings or errors
Given I have selected a Trial
And I select the Abstraction validation option
When there are warnings or errors
Then the Description and Comment fields display grouped by section
And the Section is displayed as a link to the form


 Scenario Outline: #3 Administration Validation Display for Errors
    Given I have selected a Trial
    When the <Rule> is met
    Then the associated <Description> and <Comment> display  
  
  |Section |Rule|Description  | Comment|     
  |PAA General Trial Details|IF NCT Number > 30 characters      | NCT Number cannot be more than 30 characters |[Select General Trial Details] from Administration Data |                                                                                                                                                                                                                       
  |PAA General Trial Details| IF ‘CTEP Number’ >  30 characters | CTEP Number cannot be more than 30 characters| [Select General Trial Details] from Administration Data | 

 Scenario Outline: #4 Scientific  Validation Display for Errors
    Given I have selected a Trial
    When the <Rule> is met
    Then the associated <Description> and <Comment> display  
    
  |Section                   |Rule	                     |Description                                 |Comment                                         |                                                                                                                                                                                                                                                       
  |PAS Trial Design | IF Clinical Research Category = ‘Interventional’ or ‘expanded access’, AND Masking is null  | IF Clinical Research Category = ‘Interventional’ or ‘expanded access’, Masking is required   |[Select Trial Design] from Scientific Data. |                                                                                                                                                                                                                                                                              
  |PAS Trial Design | IF Clinical Research Category = ‘Interventional’ or ‘expanded access’ AND Masking = ‘Double blind’, AND masking roles count < 2 |  Clinical Research Category of ‘Interventional’ or ‘expanded access’, If Double blind masking is selected, at least two masking roles must be specified   |[Select Trial Design] from Scientific Data. | 

 Scenario Outline: #5 Administration Validation Display for Warnings
    Given I have selected a Trial
    When the <Rule> is met
    Then the associated <Description> and <Comment> display  
    
  |Section                   |Rule	                     |Description                                 |Comment                                         |                                                                                                                                                                                                                                                         
  |PAA General Trial Details|Official Title null | Official Title is required  |[Select General Trial Details] from Administration Data |                                                                                                                                                                                                                                                                            
  |PAA General Trial Details| Lead Organization Trial Identifier is null |Lead Organization is required| [Select General Trial Details] from Administration Data | 

 Scenario Outline: #6 Scientific Validation Display for Warnings
    Given I have selected a Trial
    When the <Rule> is met
    Then the associated <Description> and <Comment> display  
    
  |Section                   |Rule	                     |Description                                 |Comment                                         |                                                                                                                                                                                                                                                         
  |PAA General Trial Details|IF Detailed Description >  than 32000 characters | Detailed Description must not be more than 32000 characters|[Select Trial Design ] from Scientific Data |                                                                                                                                                                                                                                                                             
  |PAA General Trial Details| IF Brief Title < 18 and >  300 characters| Brief Title must be between 18 and 300 characters| [Select Trial Description ] from Scientific Data | 
