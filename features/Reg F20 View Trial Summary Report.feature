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
     
     |TSR Section    |Field          |Field Required|Display Rule when Field Blank  |       
     |Official Title |Official Title |Required    	 |No data available	            |
	 |	             |Acronym	     |Not Required   |Not Displayed                 |
	 |	             |Keywords	     |Not Required	 |Not displayed  	            |

     
       Scenario: #3 Trial Identification Section Display Rules
    Given I can view TSR document
    And the TSR Trial Identification Section fields will be displayed following the rules below
    
    |TSR Section         |Field                        |Field Required|Display Rule when Field Blank |
    |Trial Identification|NCI Trial Identifier         |Required      |No Data Available             |
    |                    |Lead Org Identifier          |Required      |No Data Avaiable              |
    |                    |ClinicalTrials.gov Identifier|Required      |No Data Available             | 
    |                    |CTEP Identifier              |Not Required  |Not Displayed                 |
    |                    |DCP Identifier               |Not Required  |Not Displayed                 |
    |                    |Other Identifier             |Not Required  |Not Displayed                 |
    |                    |Other Identifier             |Not Required  |Not Displayed                 |
    |                    |Amendment Number             |Not Required  |Not Displayed                 |
    |                    |Amendment Date               |Not Required  |Not Displayed                 |
   

 
      Scenario:#4 General Trial Details Section Display Rules 
     Given I can View TSR document
     And the TSR Trial Details Section fields will be displayed following the rules below
     
     
      |TSR Section     |Field                              |Field Required  |Conditional Fields                                      |Display Rule when Field Blank  |
      |General Details |Research Category                  |Required        |                                                        |No Data Available              |
      |                |Lead Organization                  |Required        |                                                        |No Data Available              |
      |                |Sponsor                            |Required        |                                                        |No Data Available              |
      |                |Responsible Party                  |Required        |                                                        |No Data Available              |
      |                |Investigator                       |Required        |Only Displayed when Responsible Party is not the Sponsor|Not Displayed                  |
      |                |Investigator Title                 |Required        |Only Displayed when Responsible Party is not the Sponsor|Not Displayed                  |
      |                |Investigator Affiliation           |Required        |Only Displayed when Responsible Party is not the Sponsor|Not Displayed                  |
      |                |Principal Investigator             |Required        |                                                        |No Data Available              |
      |                |Affiliation                        |Required        |                                                        |No Data Available              |
      |Collaborators   |Name                               |Not Required    |                                                        |Not Displayed                  |
      |Status/Dates    |Current Trial Status               |Required        |                                                        |No Data Available              |
      |                |Trial Start Date-Actual            |Required        |                                                        |No Data Available              |
      |                |Primary Completion Date-Anticipated|Required        |                                                        |No Data Available              |                 
      |                |Trial Completion Date              |Not Required    |                                                        |Not Displayed                  |
      
     
     
     
     Scenario:#5 Summary 4 Information Section Display Rules 
     Given I can View TSR document
     And the TSR Summary 4 Information Section fields will be displayed following the rules below

      |TSR Section          |Field                              |Field Required  |Display Rule when Field Blank  |
      |Summary 4 Information|Study Source                       |Required        |No Data Available              |
      |                     |Funding Sponsor/Source             |Required        |No Data Available              |
      |                     |Anatomic Site Code                 |Required        |No Data Available              |
   