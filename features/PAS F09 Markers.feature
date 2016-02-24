@PA @global
Feature:  PAS F09 Markers 
As a CTRP Scientific Abstractor, I can add and Markers

Scenario: #1 I can add Markers for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Markers screen
And I select Add
And the Add Marker screen displays
And I have entered a Name
And I have checked <Evaluation Type>
And have checked more than one Evaluation Type
|Evaluation Type|
|Level/Quantity|
|Genetic Analysis|
|Cell Functionality|
|Subtyping|
|Protein Activity|
|Proteolytic Cleavage|
|Phosphorylation|
|Methylation|
|Acetylation|
|Activation Status|
|Loss of Heteozygosity (LOH)|
|Germline Variant|
|Somatic Variant|
|Chromosomal Amplification| 
|Chromosomal Deletion|
|Other|
And I have checked <Assay Type>
And I have checked more than one Assay Type
|Assay Type|
|PCR|
|In Situ Hybridization|
|Microarray|
|ELISA|
|Immunohistochemistry|
|Western Blot (Immunoblot)|
|Flow Cytometry|
|Sequencing|
|Microscopy/Imaging|
|ELISPOT|
|Proliferatoin Assay|
|Cytotoxicity Assay|
|Mass Spectometry|
|TUNEL assay|
|Real-Time RT-PCR (qRT-PCR)|
|HPLC|
|RT-PCR|
|Multiplex Immunoassay|
|Real-Time PCR (quantitative PCR)|
|Unspecified|
|Other|
And I have selected <Biomarker Use>
|Biomarker Use| 
|Integral|
|Integrated| 
And I have checked <Biomarker Purpose>
And I have checked more than one Biomarker Purpose
|Biomarker Purpose|
|Eligibility Criterion|
|Treatment Assignment|
|Stratification Factor|
|Research|
|Response Assessment|
And I have checked Specimen type(s)
And I have checked more than one Specimen type
|Specimen type|
|Serum|
|Plasma|
|Blood|
|Tissue|
|Urine|
|PBMCs|
|CSF|
|Bone Marrow|
|Saliva|
|Cyorpreserved Cells|
|Buccal Mucosa|
|Feces|
|Unspecified|
|Other|

When I click save
Then the Markers list will be displayed
 

      |Name                |
      |Evaluation Type                   |
      |Biomarker Use                    |
      |Biomarker Purpose  |
      |Specimen Type                   |
      |Record Status                       |
      |Edit| 
      |Delete| 

  Scenario: #2 Biomarker Use rule
    Given I am on the Add Marker Screen 
     When I select "Integrated" for Biomarker Use
     Then the Biomarker Purpose is not required



Scenario: #3 Set Marker Record Status
Given I am on the Add Marker Screen
When I have selected Name from caDSR
Then Record Status is set to Active
And the Record Status displays as Active
When Name is not selected from caDSR
And I select save
Then the record status "Pending" will be displayed on the Markers table
And the pending marker will be added to the "New Marker Requests" screen

Scenario:  #4 Marker Mandatory Fields Rules
Given I am on the Markers screen
When the Marker <MarkerField> is not entered 
And I select Save
Then an error message <MarkerErrorMessage> will be displayed

|<MarkerField>     |  <MarkerErrorMessage>|
| Evaluation Type  | Evaluation Type must be entered|
|   Name           |   Name must be entered|
|  Assay Type      |   Assay Type must be entered|
|Biomarker Use     |   Biomarker Use must be entered|
|Biomarker Purpose | Biomarker Purpose must be entered|
|Specimen Type     |  Specimen Type must be entered|

Scenario:#5 Selection of Other for Evaluation Type
 Given I am on the Add Marker screen
 When I have selected" Other" for Evaluation Type
Then a required text box appears 
When I have not entered text in the Evaluation Type Other Text
Then the error message type "Evaluation Type Other Text is required" will be displayed

Scenario:#6 Selection of Other for Assay Type
 Given I am on the Add Marker screen
 When I have selected Other for Assay Type
Then a required text box appears
When I have not entered text in the Assay Type
Then the error message type "Assay Type Other Text is required"

Scenario:#7 Selection of Other for Specimen Type
 Given I am on the Add Marker screen
 When I have selected Other for Specimen Type
Then a required text box appears 
When I have not entered text in the Specimen Type
Then the error message type "Specimen Type Other Text is required"


Scenario:  #8 Select Name from caDSR
 Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
And Case-Sensitive Search is defaulted to No
And Highlight Query Text is defaulted to Yes
And Search Scope is defaulted to Both
When I have entered a Search Term 
And I can enter a Public ID
And have selected the Search button
Then a results table type will be displayed

      |Permissible Value  |
      |Meaning  |
      |Marker Synonym  |
      |Description  |
      |Public ID  |
      |Select  |

When I select the Select button
Then the selected marker displays on Add Marker screen

  Scenario: #9 Rules for Marker Search in caDSR 
    Given I am on the Marker Search in caDSR screen
     When I have not entered a Search term Value
     And I have not entered a Public ID value
     Then an error message "Please enter at least one search criteria." will be displayed 
     
       Scenario:#10 case sensitive search
    Given I am on the Marker Search in caDSR screen
    And the Case-Sensitive Search will be defaulted to "No"
    When Case-Sensitive Search is changed to "Yes"
    And I click on the search button
    Then the Case-Sensitive Searched term will be highlighted


Scenario: #11 Select Search Scope in caDSR Marker Search screen       
Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I have selected Primary Term for Search Scope
And I select the Search button
Then a results table displays with markers with the Search Term in the Permissable Value field
When I have selected Synonym for Search Scope
And I select the Search button
Then a results table displays with markers with the Search Term in the Marker Synonym field

Scenario:  #12 Highlight Query Text in caDSR Marker Search screen
Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I select Highlight Query Text = No
And I select the search button
Then the Search Term in the Permissable Value field is not highlighted 

Scenario:  #13 Enter Public ID in caDSR Marker Search screen
Given I am on the Add Marker screen
 And I have selected the caDSR button
And I am on the Marker Search in caDSR screen 
When I enter a valid caDSR Public ID
And there is a match in caDSR
Then the exact valid Public ID will be displayed in the result table
When I enter an invalid Public ID
And there is no match in caDSR
Then a 'Nothing found to display' message is displayed

Scenario:  #14  Create new marker with attributes of existing marker
Given I am on the Markers screen 
When I have selected Edit for a specific marker
Then the Edit Marker screen displays
When I have selected the Save & Retain Attributes button
Then the Name field is blank
When I have entered a value for Name
And I have selected the Save button
Then the new marker will be associated to the trial
And the Markers screen displays
And a 'Record Created' message is displayed

Scenario:  #15 Edit Marker Attributes  
Given I am on the Markers Screen   (Markers Screen)
When I have selected Edit for a specific marker
Then the Edit Marker Displays
When I have edited Evaluation Type
And I have edited Assay Type
And I have edited Biomarker Use
And I have edited Biomarker Purpose
And I have edited Specimen Type
And I have selected the Save button
Then the updated marker will be associated to the trial
And the Markers screen displays
  
Scenario:  #16 Edit Attributes for Multiple Markers 
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Marker screen
And I have selected one marker
And I have selected more than one marker
When I have selected Edit Selected button 
Then Edit Marker screen displays
And Name includes Multiple Marker names
And boxes are checked for attributes that are the same for selected markers for the field type
     
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  |
 
When I uncheck a box for the field type
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  | 
Then it is unchecked for all selected markers
When I check the box for the field type
      |Evaluation Type  |
      |Assay Type  |
      |Biomarker Purpose  |
      |Specimen Type  |
Then it is checked for all selected markers
When I have edited Biomarker Use type

      |Integral  |
      |Integrated  |

Then it is edited for all selected markers
When I have selected the Save button
Then the attributes are updated for each marker 
And the updated markers are associated to the trial
And the Markers screen displays
And a 'Record(s) Updated' message is displayed

Scenario:  #17 I can Delete Markers for a Trial
Given I am on the Markers screen
When I have selected the Delete check box for an individual Marker
And I can select the delete check box for more than one Marker
When have clicked on Delete button
Then the message displays 'click OK to remove selected Marker(s) form the study. Click Cancel to abort'
When I have clicked on  OK
Then the Marker(s) is removed from the trial record
And 'Record(s) deleted' message is displayed
When I have clicked on the Cancel button
Then the Marker(s) is not removed from the trial record
And 'Record(s) deleted' message is not displayed
When I have deleted a Marker where Marker Status is pending
Then the marker is removed from the "New Marker Requests" screen

 Scenario:  #18 I can Reset Add Markers screen for a Trial                    
 Given I am logged into the CTRP Protocol Abstraction application  
 And I have selected a trial
And I am on the Add/edit Markers screen
When I have selected Reset
Then the updated information on the Add Markers screen will not be saved to the trial record
And the screen will be refreshed with the data since the last save