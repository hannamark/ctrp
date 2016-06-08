@Global @Reg
Feature: Reg F20 View Trial Summary Report

As a CTRP User, I can view my trial Trial Summary Report (TSR)

Scenario: #1 I search My trials and select the View TSR 
Given I am in the CTRP Registration applicatin
And I have selected the option to view My trials in CTRP (trials where I am listed as owner)
When I select Action from the Available Actions
And the current processing status type is displayed
      |Verification Pending|
      |Abstraction Verified Response   |
      |Abstraction Verified No Response  |

Then the View TSR option will available
When I click on the view TSR option
Then the TSR document will be downloaded 
And I can view TSR document

  Scenario: #1 TSR Heading Section Display Rules
    Given I can view TSR document
    And the document heading will display the data type
    
      |Trial Summary Report  |
      |Date  |
      |Record Verification Date  |

     And the TSR heading will be displayed following the rules below
     
     |	TSR Section |	Field	             |Always displayed	|
     |		        |		                 |		            |		
     |TSR HEADING   |Trial Summary Report    |Required	        |		  
     |		       	|Date                    |Required		    |	
     |		        |Record Verification Date|Required		    |
     
      Scenario: #2 Official Title Section Display Rules
    Given I can view TSR document
    And the TSR Official Title section fields will be displayed following the rules below
     
     |TSR Section    |Field          | Field Required|Field Blank        |       
     |Official Title |Official Title |Required    	 |No data available	 |
	 |	             |Acronym	     |Not Required   |Not Displayed      |
	 |	             |Keywords	     |Not Required	 |Not displayed  	 |

     
     
     

 
    
    
    
   