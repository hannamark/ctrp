@PA @global
Feature: PAA F02 Add and Edit NCI Specific Information

As any CTRP PA User, I can enter NCI Specific Information 

Scenario: #1 I can view and edit the value for Study Source
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
And see the value for Study Source
When I select a different Study Source value of National, Externally Peer-Reviewed, Institutional, Industrial, or Other
Then the selected value for Study Source will be associated with the trial

Scenario: #2 I can associate one or more organizations as the Specific Funding Source for a clinical trial
Given I have selected a trial to abstract 
And I am on the NCI Specific Information page screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be associated to the trial as Specific Funding Source

Scenario: #3 I can unassociate one or more organizations from the Specific Funding Source for a clinical trial
Given I have selected a trial to abstract 
And I am on the NCI Specific Information page screen
When I have selected the organization to remove from the trial's Specific Funding Source
Then the selected organization will not be associated to the trial as Specific Funding Source

Scenario: #4 I can view and edit the Program Code 
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
When I select the Program Code field I can edit the value for Program Code
Then the selected value for Program Code will be associated with the trial

Scenario: #5 I can view and edit the values for NIH/NCI Division/Department Identifier
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
And see the value for NIH/NCI Division/Department Identifier
When I select one or more values from the for the NIH/NCI Division/Department Identifier (CCR, CTEP, DCP, NHLBI)
Then the selected value(s) for NIH/NCI Division/Department Identifier will be associated with the trial

Scenario: #6 I can view and edit the values for NIH/NCI Division/Department Identifier
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
And see the value for NIH/NCI Division/Department Identifier
When I select one or more values from the for the NIH/NCI Program Identifier (BIQSFP, SPORE, Steering Committee Reviewed)
Then the selected value(s) for NIH/NCI Program Identifier will be associated with the trial

Scenario: #7 I can view and edit the “Send Trial Information to ClinicalTrials.gov?”
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
And the Trial Sponsor is "National Cancer Institute" (Trial/Sponsor_ID where organizations/name = "National Cancer Institute")
And the Trial Lead Organization is not "NCI - Center for Cancer Research" (Trial/Lead_Org_ID where Organizations/Name = "NCI - Center for Cancer Research")
And the Trial processing status is “Verification Pending”, "Abstracted", "No Response”, or “Abstracted, Response” 
And the Trial Overall Status is not “Complete”, “Administratively Complete” or “Terminated”  
And the trial Research Category is "Interventional" (Trial/Research_Category_id where Research_Categories/Name = "Interventional")
When I select the radio button for Yes or No for “Send Trial Information to ClinicalTrials.gov?” 
Then the selected value for “Send Trial Information to ClinicalTrials.gov?” will be Yes or No

Scenario: #8 I can view and edit the NCI Specific Information Comments 
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
When I select the Comments field I can enter or edit comments
Then the information entered for Comments will be associated with the trial

Scenario: #9 Save NCI Specific Information
Given I have selected a trial to abstract 
And I am on the NCI Specific Information screen
When select save 
Then the information entered or edited on the NCI Specific Information screen will be saved to the trial record

Scenario: #10 Cancel NCI Specific Information 
Given I have selected a trial to abstract 
And I am on the NCI Specific Information screen
When select Cancel
Then the information entered or edited on the NCI Specific Information screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario Outline: #11 I cannot view the “Send Trial Information to ClinicalTrials.gov?”
Given I am logged into the CTRP PA application
And I am on the NCI Specific Information screen
When the follow <conditions> exist
Then the label and element for “Send Trial Information to ClinicalTrials.gov?” will not be visible

Examples:

|<Conditions>|
|Trial is not sponsored by "National Cancer Institute" |
|Trial Lead Organization is "NCI - Center for Cancer Research"|
|Trial processing status is not “Verification Pending”|
|Trial processing status is not "Abstracted| 
|Trial processing status is not “No Response”|
|Trial processing status is not “Abstracted, Response”|
|Trial Overall Status is “Complete”|
|Trial Overall Status is “Administratively Complete”|
|Trial Overall Status is “Terminated”| 
|Trial Research Category is not "Interventional"|




