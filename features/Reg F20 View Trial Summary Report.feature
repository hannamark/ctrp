@Global @Reg
Feature: Reg F20 View Trial Summary Report

As a CTRP User, I can view my trial Trial Summary Report (TSR)

Scenario: #1 I search My trials and select the View TSR 
Given I am in the CTRP Registration applicatin
And I have selected the option to view My trials in CTRP (trials where I am listed as owner)
And the current processing status type is displayed
      |Verification Pending|
      |Abstraction Verified Response   |
      |Abstraction Verified No Response  |
When I select Action from the Available Actions
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
     
     |TSR Section    |Field          |Field Required |Display Rule when Field Blank |       
     |Official Title |Official Title |Required    	 |Display "No data available"	|
	 |	             |Acronym	     |Not Required   |Field not Displayed           |
	 |	             |Keywords	     |Not Required	 |Field not displayed  	        |

     
       Scenario: #3 Trial Identification Section Display Rules
    Given I can view TSR document
    And the TSR Trial Identification Section fields will be displayed following the rules below
    
    |TSR Section         |Field                        |Field Required|Display Rule when Field Blank |
    |Trial Identification|NCI Trial Identifier         |Required      |Display "No data available"   |
    |                    |Lead Org Identifier          |Required      |Display "No data available"   |
    |                    |ClinicalTrials.gov Identifier|Required      |Display "No data available"   | 
    |                    |CTEP Identifier              |Not Required  |Field not displayed           |
    |                    |DCP Identifier               |Not Required  |Field not displayed           |
    |                    |Other Identifier             |Not Required  |Field not displayed           |
    |                    |Other Identifier             |Not Required  |Field not displayed           |
    |                    |Amendment Number             |Not Required  |Field not displayed           |
    |                    |Amendment Date               |Not Required  |Field not displayed           |
   

 
      Scenario:#4 General Trial Details Section Display Rules 
     Given I can View TSR document
     And the TSR Trial Details Section fields will be displayed following the rules below
     
     
      |TSR Section     |Field                              |Field Required  |Conditional Fields                                      |Display Rule when Field Blank  |
      |General Details |Research Category                  |Required        |                                                        |Display "No data available"    |
      |                |Lead Organization                  |Required        |                                                        |Display "No data available"    |
      |                |Sponsor                            |Required        |                                                        |Display "No data available"    |
      |                |Responsible Party                  |Required        |                                                        |Display "No data available"    |
      |                |Investigator                       |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Investigator Title                 |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Investigator Affiliation           |Required        |Only Displayed when Responsible Party is not the Sponsor|Display "No data available"    |
      |                |Principal Investigator             |Required        |                                                        |Display "No data available"    |
      |                |Affiliation                        |Required        |                                                        |Display "No data available"    |
      |Collaborators   |Name                               |Not Required    |                                                        |Field not Displayed            |
      |Status/Dates    |Current Trial Status               |Required        |                                                        |Display "No data available"    |
      |                |Trial Start Date-Actual            |Required        |                                                        |Display "No data available"    |
      |                |Primary Completion Date-Anticipated|Required        |                                                        |Display "No data available"    |                 
      |                |Trial Completion Date              |Not Required    |                                                        |Field not Displayed            |
      
     
     
     
     Scenario:#5 Summary 4 Information Section Display Rules 
     Given I can View TSR document
     And the TSR Summary 4 Information Section fields will be displayed following the rules below

      |TSR Section          |Field                              |Field Required  |Display Rule when Field Blank  |
      |Summary 4 Information|Study Source                       |Required        |Display "No data available"    |
      |                     |Funding Sponsor/Source             |Required        |Display "No data available"    |
      |                     |Anatomic Site Code                 |Required        |Display "No data available"    |
   