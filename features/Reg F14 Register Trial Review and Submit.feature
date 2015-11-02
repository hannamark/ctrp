@Global @Reg
Feature: Reg F14 Register Trial Review and Submit

As a CTRP User, I can review my registration and if no errors, I can submit the registration to CTRP

Scenario: #1 I can review my registration without errors
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have completed the registration sections
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
| Required Fields |
|CTRP Protocol ID - NCI-YYYY-NNNNN|
|Study Source|
|Lead Organization Trial Identifier|
|Title|
|Phase|
|Is this a Pilot?|
|Trial Type|
|Primary Purpose|
|Accrual Disease Terminology|
|Lead Organization|
|Principal Investigator|
|Sponsor|
|Responsible Party|
|Funding Source|
|Is this trial funded by an NCI grant?|
|Does this trial have an associated IND/IDE?|
|Trial Status Date|
|Trial Status|
|Trial Start Date|
|Trial Start Date Actual or Anticipated qualifier|
|Primary Completion Date|
|Primary Completion Date Actual or Anticipated qualifier|
|Completion Date|
|Completion Date Actual or Anticipated qualifier|
|Trial Oversight Authority Country|
|Trial Oversight Authority Organization Name|
|FDA Regulated Intervention Indicator|
|Section 801 Indicator|
|Delayed Posting Indicator|
|Protocol Document|
|IRB Approval Document|
And the CTRP application will check that all conditional fields have been entered
|Condition : Conditional Field|
|Principal Investigator as Responsible Party : Principal Investigator, Investigator Title, Investigator Affiliation|
|Sponsor-Investigator as Responsible Party : Investigator, Investigator Title, Investigator Affiliation|
|Funded by NCI Grant : Funding Mechanism, Institute Code, Serial Number, NCI Division/Program Code|
|IND/IDE : IND/IDE Type, IND/IDE Number, IND/IDE Grantor, IND/IDE Holder Type, NIH Institution or NCI Division|
|Interventional Trial : Informed Consent Document|
|Administratively Complete, Withdrawn, Temporarily Closed Trial Status : Why Study Stopped|
And the CTRP application will check if any optional fields have been entered
|Optional Fields|
|ClinicalTrials.gov Identifier|
|Other Protocol Identifiers|
|Secondary Purpose|
|Program Code|
|Completion Date|
|Completion Date Anticipated or Actual qualifier|
|List of Participating Site Documents|
|Other Documents|
And the CTRP application will check that all registration sections have been completed
And the option to Register Trial will be available

Scenario: #2 I can review my registration with errors
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have completed the registration sections but with errors
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
And the CTRP application will check that all registration sections have been completed
And the registration errors will be displayed
And the option to Register Trial will be not available

Scenario: #3 I can submit my completed trial registration
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I have performed the Review Trial action without errors
When I have selected Register Trial
Then all registration information will be entered in CTRP
And the trial status will be Submitted
And the trial milestone Submission Received Date will be created with the current date and time
