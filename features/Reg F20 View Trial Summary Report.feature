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

  Scenario: # TSR Official Title Section Display Rules
    Given I can view TSR document
    And the document heading will display the data type
    
      |Trial Summary Report  |
      |Date  |
      |Record Verification Date  |

     And the TSR fields will be displayed following the rules below
     
     |	TSR Section	|	TSR Sub-Section	    |	Field	         |	When the field is blank in AUM will nor display	|	TSR Conditional Fields	|	Always displayed	|
     |		        |		                |		             |		        |		|		|
     |TSR HEADING	|		                |Trial Summary Report|	                                                |		|		|		|
     |		        |Date	                |Date                |		|		|	Required	|
     |		        |Record Validation Date	|Verification Date	 |		|		|	Required	|
     |Official Title|Official Title	        |Official Title	|		|		|	Required	|
     |		        |Acronym	            |	Acronym	|	Not displayed if not populated	|		|		|
|		|	Keywords	|		|	Not displayed if not populated	|		|	 	|
|	Trial Identification	|	Trial Identification	|	NCI identifer	|		|		|	Required	|
|		|		|	Lead Org Identifier	|		|		|	Required	|
|		|		|	CT.gov identifier	|		|		|	Required	|
|		|		|	CTEP Identifier	|	Not displayed if not populated	|		|		|
|		|		|	DCP Identifier	|	Not displayed if not populated	|		|		|
|		|		|	Other Identifer	|	Not displayed if not populated	|		|		|
|		|		|	Amendment Number	|	Not displayed if not populated	|		|		|
|		|		|	Amendment Date	|	Not displayed if not populated	|		|		|
|	Gen Trial Details	|	General Details	|	Research Category	|		|		|	Required	|
|		|		|	Lead Org	|		|		|	Required	|
|		|		|	Sponsor	|		|		|	Required	|
|		|		|	Responsible Party	|		|		|	Required	|
|		|		|	Investigator	|		|	Only Displayed when Responsible Party is not Sponsor	|	Required	|
|		|		|	Investigator Title	|		|	Only Displayed when Responsible Party is not Sponsor	|	Required	|
|		|		|	Investigator Affiliation	|		|	Only Displayed when Responsible Party is not Sponsor	|	Required	|
|		|		|	PI	|		|		|	Required	|
|		|		|	PI Affiliation	|		|		|	Required	|
|		|	Collaborators	|	Name	|	Not displayed if not populated	|		|		|
|		|	Status/Dates	|	Current Trial Status	|		|		|	Required	|
|		|		|	Trial start Date - actual	|		|		|	Required	|
|		|		|	"Primary Completion Date-
(DISPLAY AS 'Anticipated' OR 'Actual' OR 'NA')"	|		|		|	Required	|
|		|		|	Trial Completion Date- Actual OR Anticipated	|	Not displayed if not populated	|		|		|
|	Summary 4 Information	|		|	Study Source	|		|		|	Required	|
|		|		|	Funding Sponsor/Source	|		|		|	Required	|
|		|	Anatomic site code	|	Anatomic site	|		|		|	Required	|
|	Regulatory Information 	|	Regulatory Information 	|	Oversight Authorities	|		|		|	Required	|
|		|		|	FDA Regulation Intervention?	|		|		|	Required	|
|		|		|	Section 801?	|		|		|	Required	|
|		|		|	DMC Appointed?	|		|		|	Required	|
|		|		|	IND/IDE Study?	|		|		|	Required	|
|	 	|	IND/IDE 	|	Type	|		|		|	Required	|
|		|		|	Grantor	|		|		|	Required	|
|		|		|	Number	|		|		|	Required	|
|		|		|	Holder Type	|		|		|	Required	|
|		|		|	Holder  	|		|		|	Required	|
|	 	|	Human Suject safety	|	Board Approval Status	|		|		|	Required	|
|		|		|	Board Approval Number	|		|		|	Required	|
|		|		|	Board	|		|		|	Required	|
|		|		|	Address	|	Not displayed if not populated	|		|		|
|		|		|	Phone	|	Not displayed if not populated	|		|		|
|		|		|	Email	|	Not displayed if not populated	|		|		|
|		|		|	Affiliation	|		|		|	Required	|
|	Trial Design	|		|	Primary Purpose	|		|		|	Required	|
|		|		|	Primary Purpose Other	|	Not displayed if not populated	|		|		|
|		|		|	Secondary Purpose	|	Not displayed if not populated	|		|		|
|		|		|	Secondary Purpose Other	|	Not displayed if not populated	|		|		|
|		|		|	Trial Phase	|		|		|	Required	|
|		|		|	Intervention Model	|		|	Conditional if Research Category is Interventional	|	Required 	|
|		|		|	Study Model	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Time Perspective	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Time Perspective Other	|	Not displayed if not populated	|	Conditional if Time Perspective = 'Other'	|		|
|		|		|	Bio-Specimen Retention	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Bio-Specimen Description	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Number of Arms/Groups	|		|		|	Required 	|
|		|		|	Masking	|		|	Conditional if Research Category is Observational	|	Required	|
|		|		|	Masking Roles	|		|	Conditional if Masking is not Open	|	Required 	|
|		|		|	Allocation	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Study Classification	|		|	Conditional if Research Category is Observational	|	Required 	|
|		|		|	Target Enrollment	|		|		|	Required	|
|	Trial description	|		|		|		|		|		|
|		|	Brief Title	|	Brief Title	|		|		|	Required	|
|		|	Brief Summary	|	Brief Summary	|		|		|	Required	|
|		|	Objectives	|	Objectives	|		|		|	Required	|
|		|	Detailed Description	|	Detailed Description	|		|		|	Required	|
|		|		|		|		|		|		|
|	Intervention(s)	|		|		|		|		|		|
|		|	Intervention Type	|	Intervention Type	|		|		|	Required	|
|		|	Preferred name	|	Preferred name	|		|		|	Required	|
|		|	Synonyms	|	Synonyms	|		|		|	Required	|
|		|	Description	|	Description	|		|		|	Required	|
|	Arm/Group(s)	|		|	Arm Type	|		|		|	Required	|
|		|		|	Label	|		|		|	Required	|
|		|		|	Description	|		|		|	Required	|
|		|		|	Interventions	|		|		|	Required	|
|	Eligibility Criteria	|		|	Accepts Healthy Volunteers?	|		|		|	Required	|
|		|		|	Gender	|		|		|	Required	|
|		|		|	Minimum Age	|		|		|	Required	|
|		|		|	Maximum Age	|		|		|	Required	|
|		|		|	Sampling Method	|		|	Conditional if Research Category is Observational	|	Required	|
|		|		|	Study Population	|		|	Conditional if Research Category is Observational	|	Required	|
|		|	Inclusion Criteria	|	inclusion criteria	|		|		|	Required	|
|		|	Exclusion Criteria	|	exclusion criteria	|		|		|	Required	|
|	Disease/ Condition	|		|	Diseases/Conditions	|		|		|	Required	|
|		|		|	Disease Code	|		|		|	Required	|
|	Primary Outcome Measures	|		|		|		|		|		|
|		|	Title	|	Title	|		|		|	Required	|
|		|	Description	|	Description	|		|		|	Required	|
|		|	Time Frame	|	Time Frame	|		|		|	Required	|
|		|	Safety Issue?	|	Safety Issue?	|		|		|	Required	|
|	Secondary Outcome Measure	|		|		|		|		|		|
|		|	Title	|	Title	|		|		|	Required	|
|		|	Description	|	Description	|		|		|	Required	|
|		|	Time Frame	|	Time Frame	|		|		|	Required	|
|		|	Safety Issue?	|	Safety Issue?	|		|		|	Required	|
|	Sub-Groups Stratification Criteria	|		|		|		|		|		|
|		|	Label	|	Label	|		|		|	Required	|
|		|	Description	|	Description	|		|		|	Required	|
|	Biomarkers	|		|		|		|		|		|
|		|	Biomarker Name	|	Biomarkers Name	|		|		|	Required	|
|		|	Evaluation Type	|	Evaluation Type	|		|		|	Required	|
|		|	Assay Type	|	Assay Type	|		|		|	Required	|
|		|	Biomarker Use	|	Biomarker Use	|		|		|	Required	|
|		|	Biomarker Purpose	|	Biomarker Purpose	|		|		|	Required	|
|		|	Specimen Type	|	Specimen Type	|		|		|	Required	|
|	Participating Sites	|		|		|		|		|		|
|		|	Facility	|	Facility	|		|		|	Required	|
|		|	Contact	|	Contact	|		|		|	Required	|
|		|	Recruitment Status & Date(s)	|	Recruitment Status & Date(s)	|		|		|	Required	|
|		|	Target Accrual	|	Target Accrual	|		|		|	Required	|
|		|	Investigator(s)	|	Investigator(s)	|		|		|	Required	|

     



  



