@Reg @global
Feature: Reg F25 View Clinical Trials
As any CTRP User, I can view a CTRP clinical trial record after a Clinical Trial Search

Scenario: #1 I can view for my clinical trials registered in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the option to search "My Trials"
And CTRP displays all trials where I am listed as a Trial Owner and the trials match the trial search criteria
And I select a trial from the Clinical Trial Search Results
Then I will be able to view the Trial Details as
|Section: Trial Identifiers|
|NCI Trial Identifier|
|All other Trial Identifier Type and Identifiers|
|Section: Amendment Details|
|Last Amendment Number and Amendment Date|
|Section: Trial Details|
|Title|
|Phase|
|Research Category|
|Primary Purpose|
|Secondary Purpose|
|Accrual Disease Terminology|
|Section: Lead Organization / Principal Investigator|
|Lead Organization|
|Principal Investigator|
|Section: Sponsor / Responsible Party |
|Sponsor|
|Responsible Party|
|Section: Data Table 4 Information|
|Study Source|
|Funding Source|
|Section: Status / Dates|
|Current Trial Status|
|Current Trial Status Date|
|Why Study Stopped|
|Trial Start Date with Actual/Anticipated Indicator|
|Primary Completion Date with Actual/Anticipated Indicator|
|Completion Date with Actual/Anticipated Indicator|
|Section: FDA IND/IDE Information|
|IND/IDE Type, IND/IDE Number, IND/IDE Grantor, IND/IDE Holder Type, NIH/NCI Division/Program|
|Section: NIH Grant Information|
|Funding Mechanism, NIH Institute Code,Serial Number, NCI Division/Program|
|Section: Regulatory Information|
|Trial Oversight Authority Country|
|Trial Oversight Authority Organization Name|
|FDA Regulated Intervention Indicator|
|Section 801 Indicator|
|Delayed Posting Indicator|
|Data Monitoring Committee Appointed Indicator|
|Section: Trial Related Documents|
|Protocol Document (latest)|
|IRB Approval Document (latest)|
|Change Memo Document (latest)|
|TSR (all)|
  


Scenario: #2 I can search all clinical trials registered in CTRP
Given I am logged into the CTRP Registration application
And I am on the Search Clinical Trials Screen
When I select the option to search "All Trials"
And CTRP displays all trials that match the trial search criteria
And I select a trial from the Clinical Trial Search Results
Then I will be able to view the Trial Details as
|Section: Trial Identifiers|
|NCI Trial Identifier|
|All other Trial Identifier Type and Identifiers|
|Section: Amendment Details|
|Last Amendment Number and Amendment Date|
|Section: Trial Details|
|Title|
|Phase|
|Research Category|
|Primary Purpose|
|Secondary Purpose|
|Accrual Disease Terminology|
|Section: Lead Organization / Principal Investigator|
|Lead Organization|
|Principal Investigator|
|Section: Sponsor / Responsible Party |
|Sponsor|
|Responsible Party|
|Section: Data Table 4 Information|
|Study Source|
|Funding Source|
|Section: Status / Dates|
|Current Trial Status|
|Current Trial Status Date|
|Why Study Stopped|
|Trial Start Date with Actual/Anticipated Indicator|
|Primary Completion Date with Actual/Anticipated Indicator|
|Completion Date with Actual/Anticipated Indicator|
