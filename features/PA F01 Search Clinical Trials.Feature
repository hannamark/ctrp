@PA @global
Feature: As any CTRP PA User, I can search CTRP clinical trials by various criteria and trial ownership

Scenario: #1 I can search for clinical trials registered in CTRP
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more of the values to search all trials
|Official Title|
|Organization Type|
|Organization|
|Trial Identifier Type|
|Trial Identifier|
|Principle Investigator|
|Primary Purpose|
|Trial Phase|
|Pilot|
|Current Trial Status|
|Processing Status|
|Milestone|
|On Hold Status|
|My Trials|
|Submission Type|
|Study Source|
|Clinical Research Category|
|Submission Method|
|NIH/NCI Division/Department Identifier|
|NIH/NCI Program Identifier|



Then CTRP will then display the results for all the Clinical Trials Search Results:
|NCI Trial Identifier|
|Processing Priority|
|Other ID Source and Other ID|
|Official Title|
|Sponsor|
|Lead Organization|
|Participating Sites|
|Principle Investigator|
|NIH/NCI Division/Department Identifier|
|NIH/NCI Program Identifier|
|Current Trial Status|
|Milestone (current) and Milestone Date|
|Admin Milestone (current) and Admin Milestone Date|
| Scientific Milestone (current) and Scientific Milestone Date|
|Processing Status|
|Processing Status Date|
|Record Verification Date|
|On Hold Reasons|
|On Hold Date| (if more than 1 on hold reason, first on hold active is displayed)
|Submission Type| 
|Submission Source|
|Checked Out for Admin Use by|
|Checked out for Scientific Use by|
|Action|
|Super User Action|
|View TSR |

Scenario: #2 I can search for clinical trials by Official Title
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I enter text in the official title selection
And select a search option
Then the search results will display all trials that contain the official title search text
And the alternative title text

Scenario: #3 I can search for clinical trials by Organization
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Organizations
And select the search option
Then the search results will display trials that match the Organizations selected for the trial from |Sponsor|
|Lead Organization|
|Collaborator|
|Participating Site|
|IRB|

Scenario: #4 I can search for clinical trials by Identifier Type  
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I enter select one or more Identifier Types 
|NCI |
|CTEP|
|DCP|
|CCR|
|ClinicalTrials.gov (NCT)|
|Other|
And select search 
Then the search results will display trials that contain that Identifier type 

Scenario: #5 I can search for clinical trials by Identifier   
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I enter text in the Identifier   
And select search 
Then the search results will display trials that contain the identifier 

Scenario: #6 I can search for clinical trials by Principal Investigator
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more persons from a person name search
And select search
Then the search results will display trials where the persons selected are principal investigator

Scenario: #7 I can search for clinical trials by primary purpose
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more trial primary purposes
|Treatment|
|Prevention|
|Supportive Care|
|Screening|
|Diagnostic|
|Health Services Research|
|Basic Science|
|Other|
And select search
Then the search results will display trials that match the primary purposes selected

Scenario: #8 I can search for Phase
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Phase (0, I, I/II, II, II/III, III, IV, NA)
And select search 
Then the search results will display trials that have the selected Phases

Scenario: #9 I can search for pilot clinical trials
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select the Pilot "Yes" option
And select search 
Then the search results will display trials that have the Pilot criteria equal to "Yes"

Scenario: #10 I can search trials by current Trial Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more current Trial Status
|In Review|
|Approved|
| Active|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
| Closed to Accrual|
| Closed to Accrual and Intervention|
| Complete|
|Administratively Complete|
| Withdrawn|
And select search 
Then the search results will display trials that have the Current Trial Status

Scenario: #11 I can search trials by Processing Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Processing Status
|In Review|
|Approved|
| Active|
|Temporarily Closed to Accrual|
|Temporarily Closed to Accrual and Intervention|
| Closed to Accrual|
| Closed to Accrual and Intervention|
| Complete|
|Administratively Complete|
| Withdrawn|
And select search 
Then the search results will display trials that have that Processing Status

Scenario: #12 I can search trials by Milestone
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Milestones
| Submission Acceptance Date|
|Submission Rejection Date|
|Submission Terminated Date|
|Submission Reactivated Date|
|Administrative Processing Start Date|
|Administrative Processing Completed Date|
|Ready for Administrative QC Date|
|Administrative QC Start Date Administrative|
|QC Completed Date Scientific Processing Start|
|Date Scientific Processing Completed Date|
|Ready for Scientific QC Date|
|Scientific QC Start Date|
|Scientific QC Completed Date|
|Ready for Trial Summary Report Date|
|Trial Summary Report Date|
|Submitter Trial Summary Report Feedback Date|
|Initial Abstraction Verified Date|
 |On-going|
 |Abstraction Verified Date|
 |Late Rejection Date |
And select search 
Then the search results will display trials that have that Milestone

Scenario: #13 I can search trials by On Hold Status
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select the On Hold Status
|On-Hold |
|Not On-Hold|
And select search 
Then the search results will display trials that have that On Hold Status
Scenario: #14 I can search trials by Trials I have checked out
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select o Trials I have checked out 
And select search 
Then the search results will display trials that have that On Hold Status

Scenario: #15 I can search trials by Submission Type
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Submission Type
|Original|
|Update|
|Amendment|
And select search 
Then the search results will display trials that have that Submission Type

Scenario: #16 I can search trials by Submission Method
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Submission Method
|Batch|
|Registry|
|ClinicalTrials.gov|
|PDQ|
|Grid Service|
|REST Service Other|
And select search 
Then the search results will display trials that have that Submission Method

Scenario: #17 I can search for clinical trials by Study Source
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Study Sources
|National|
|Externally Peer-Reviewed|
|Institutional|
|Industrial|
|Other|
And select a search option
Then the search results will display trials with matching Study Sources

Scenario: #18 I can search for clinical trials by Clinical Research Category
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more Clinical Research Categories
|Interventional|
|Observational|
|Expanded Access|
|Ancillary Correlative|
And select a search option
Then the search results will display trials with matching Clinical Research Category

Scenario: #19 I can search for clinical trials by NIH/NCI Division/Department Identifier
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more NIH/NCI Division/Department Identifiers
|CTEP|
| DCP|
|CCR|
|NHLBI| 
|DEA|
|DCCPS|
And select a search option
Then the search results will display trials with matching NIH/NCI Division/Department Identifier

Scenario: #20 I can search for clinical trials by NIH/NCI Program Identifier
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I select one or more NIH/NCI Program Identifiers
|BIQSFP|
|SPORE |
And select a search option
Then the search results will display trials with matching NIH/NCI Program Identifier

Scenario: #21 I can search for clinical trials by Identifier Type NCI
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I enter select one or more Identifier Types 
|NCI |
And select search 
Then the search results will display trials that contain that Identifier type NCI and Duplicate NCI ID

Scenario: #22 I can search for clinical trials by Identifier Type ClinicalTrials.Gov (NCT)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Search Clinical Trials Screen
When I enter select one or more Identifier Types 
|ClinicalTrails.gov (NCT) |
And select search 
Then the search results will display trials that contain that Identifier type ClinicalTrails.gov (NCT) and Obsolete ClinicalTrails.gov (NCT) ID
