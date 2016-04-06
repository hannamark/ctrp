@Global @Reg
Feature: Reg F14 Register Trial Review and Submit

As a CTRP User, I can review my registration and if no errors, I can submit the registration to CTRP

Scenario Outline: #1 I can review my registration without errors
Given I have selected the option to register a trial <trialType>
And I have completed the registration sections
When I have selected Review Trial
Then the CTRP application will check that all required fields have been entered
| Required Fields |
|Study Source|
|Lead Organization Trial Identifier|
|Title|
|Phase|
|Pilot|
|Research Category|
|Primary Purpose|
|Accrual Disease Terminology|
|Lead Organization|
|Principal Investigator|
|Sponsor|
|Data Table 4 Funding Source|
|Is this trial funded by an NCI grant?|
|Trial Status Date|
|Trial Status|
|Trial Start Date|
|Trial Start Date Actual or Anticipated qualifier|
|Primary Completion Date|
|Primary Completion Date Actual or Anticipated qualifier|
|Completion Date Actual|
|Completion Date Actual or Anticipated qualifier|
|Does this Trial have an associate IND/IDE|
|Protocol Document|
|IRB Approval Document|
And the CTRP application will check that all conditional fields have been entered
|Condition : Conditional Field|
|Describe "Other" Secondary Purpose|
|Principal Investigator as Responsible Party :Investigator, Investigator Title, Investigator Affiliation|
|Sponsor-Investigator as Responsible Party : Investigator, Investigator Title, Investigator Affiliation|
|Funded by NCI Grant : Funding Mechanism, Institute Code, Serial Number, NCI Division/Program Code|
|IND/IDE : IND/IDE Type, IND/IDE Number, IND/IDE Grantor, IND/IDE Holder Type, NIH Institution or NCI Division|
|Interventional Trial : Informed Consent Document|
|Administratively Complete, Withdrawn, Temporarily Closed Trial Status : Why Study Stopped|
And the CTRP application will check if any optional fields have been entered
|Optional Fields|
|Other Identifiers: Protocol ID Type and Protocol ID|
|Secondary Purpose|
|Program Code|
|List of Participating Site Documents|
|Other Documents|
And the CTRP application will check that all registration sections have been completed
And the option to Register Trial will be available


 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |


Scenario Outline: #2 I can review my registration with errors
Given I have selected the option to Register a trial <TrialType>
And I have completed the registration sections but with errors
When I have selected Review Trial
Then the registration errors will be displayed
And the option to Register Trial will be not available

Examples:
  |TrialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |

Scenario Outline: #2a Check for Duplicate trials
Given I have selected the option to register a trial <trialType>
When I have entered the same Lead Organization Trial Identifier for a Lead Organization which exists in another Trial
Then on review, the error message " A Trial exists in the system with the same Lead Organization Trial identifier for the selected Lead Organization" will be displayed
And the option to Register Trial will be not available

 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |


Scenario Outline: #3 I can submit my completed trial registration
Given I have selected the option to register a trial <trialType>
And I have performed the Review Trial action without errors
When I have selected Register Trial
Then all registration information will be entered in CTRP
And the trial status will be Submitted
And the trial milestone Submission Received Date will be created with the current date and time
And the trial record will have the NCI Identifer with the format NCI-YYYY-NNNNN 
And the Submission Source is a Cancer Center
And the submission method is Registry
And the Submission Type is Original
And an email entitled "Trial Registration" will be sent to the trial submitter (Email list in the shared drive under Functional/Registration: CTRP System Generated Emails)

 Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |


Scenario Outline: #4 I can edit my completed trial registration
Given I have selected the option to register a trial <trialType>
When I have performed the Review Trial action without errors
Then I will have the option to continue editing by trial registration

Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |

Scenario Outline: #5 I can print my completed trial registration
Given I have selected the option to register a trial <trialType>
When I have performed the Review Trial action without errors
Then I will have the option to print a summary of my trial registration
And after printing I will have the options Submit and Edit

Examples:
  |trialType                |
  |National                 |
  |Externally Peer-Reviewed |
  |Institutional            |