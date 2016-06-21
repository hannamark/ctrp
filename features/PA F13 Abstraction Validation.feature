@PA @global
Feature: PA F13 Abstraction Validation

As a CTRP PA Abstractor, I can access the Abstraction Validation to View the Trial History Information Audit Trail

Scenario: #1 Successful Abstraction Validation for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a Trial
And I select the Abstraction validation option
When there are no warnings
And there are no errors
Then the 'Abstraction is valid' message displays
And the View Buttons <ViewButtons> type displays
|ViewButtons|
|View XML   |
|View TSR   |
And the milestone "Ready for Trial Summary Report Date" is added to the milestone for the study

Scenario: #2 Abstraction Validation with warnings or errors
Given I have selected a Trial
And I select the Abstraction validation option
When there are warnings
And there are errors
Then the messages <MessageType> will be displayed in the sequence below

|<MessageType>                                                               |              
|"Abstraction validation failed. Please check Admin Data Menu error(s)."     |             
|"Abstraction validation failed. Please check Scientific Data Menu error(s)."|             
|"Abstraction Validation Warning(s)."                                        |             

And the Admin error count will display in the Admin Error display section 
And the Scientific error count will display in the Scientific Error display section
And the Warning count will display in the Admin warning display section 
And the Abstraction Validation warnings and errors will be in the Description field
And the Abstraction Validation warning and errors section will be in the comment field in brackets
And the Section in the Comment field will be displayed as a link to direct the user to correct the errors and warnings 
And the Description and Comment will be grouped by Section


 Scenario: #3 Administration Validation Display for Errors
    Given I have selected a Trial
    And I am on the Abstraction Validation screen
    When the Abstraction Validation button is clicked 
    Then for the Section <Section>, the below Admin Rules <Admin_Error_Rule> will be checked and the screen will display the below description <Description> and comment <Comment> 
   
  |Section                  |Admin_Error_Rule            |Description                                   | Comment                                                 |     
  |PAA General Trial Details|IF NCT Number >30 characters| NCT Number cannot be more than 30 characters |[Select General Trial Details] from Administration Data  |                                                                                                                                                                                                                       
  |PAA General Trial Details|IF CTEP Number>30 characters| CTEP Number cannot be more than 30 characters| [Select General Trial Details] from Administration Data | 

 Scenario: #4 Scientific Validation Display for Errors
    Given I have selected a Trial
    And I am on the Abstraction Validation screen
    When the Abstraction Validation button is clicked
    Then for the Section <Section>, the below Scientific Rules <Scientific_Error_Rule> will be checked and the screen will display the below description <Description> and comment <Comment> 
    
  |Section          |Scientific_Error_Rule	                                                                           |Description                                                                                                                       |Comment                                     |                                                                                                                                                                                                                                                       
  |PAS Trial Design |IF Clinical Research Category=Interventional AND Masking is null                                  |IF Clinical Research Category=Interventional, Masking is required                                                                 |[Select Trial Design] from Scientific Data. |                                                                                                                                                                                                                                                                              
  |PAS Trial Design |IF Clinical Research Category= Expanded Access AND Masking is null                                |IF Clinical Research Category=Expanded Access, Masking is required                                                                |[Select Trial Design] from Scientific Data. |
  |PAS Trial Design |IF Clinical Research Category=Interventional AND Masking=Double blind AND masking roles count < 2 |IF Clinical Research Category=Interventional, If Double blind masking is selected, at least two masking roles must be specified   |[Select Trial Design] from Scientific Data. | 
  |PAS Trial Design |IF Clinical Research Category=Expanded Access AND Masking=Double blind AND masking roles count < 2|IF Clinical Research Category=Expanded Access, If Double blind masking is selected, at least two masking roles must be specified  |[Select Trial Design] from Scientific Data. | 



 Scenario: #5 Validation Display for Warnings
    Given I have selected a Trial
    And I am on the Abstraction Validation screen
    When the Abstraction Validation button is clicked
    Then for the Section <Section>, the below Warning RUles <Warning_Rule> will be checked and the screen will display the below description <Description> and comment <Comment> 
    
  |Section                   |Warning_Rule	                     |Description                                 |Comment                                         |                                                                                                                                                                                                                                                         
  |PAA General Trial Details|Official Title null | Official Title is required  |[Select General Trial Details] from Administration Data |                                                                                                                                                                                                                                                                            
  |PAA General Trial Details| Lead Organization Trial Identifier is null |Lead Organization is required| [Select General Trial Details] from Administration Data | 
  |PAA General Trial Details|IF Detailed Description >  than 32000 characters | Detailed Description must not be more than 32000 characters|[Select Trial Design ] from Scientific Data |                                                                                                                                                                                                                                                                             
  |PAA General Trial Details| IF Brief Title < 18 and >  300 characters| Brief Title must be between 18 and 300 characters| [Select Trial Description ] from Scientific Data | 

