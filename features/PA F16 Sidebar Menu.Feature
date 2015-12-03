@Global @PA

Feature: PA F16 Sidebar Menu

Description:  As any CTRP User, I can view the menus for my role

Scenario: #1 Abstaction Sidebar Menu Tabs
Given I am logged into the CTRP application
And I have selected a trial to abstract
Then the sidebar menu will be displayed expanded:
|Trial Abstraction - <Current Trial ID>|
|Trial Identification (Section)|
|Trial History|
|Trial Milestones|
|On Hold Info|
|View TSR|
|Assign Ownership|
|Check Out History|
|Administrative Data (Section)|
|General Trial Details|
|Collaborators|
|Trial Status|
|Trial Funding|
|Regulatory Information - FDAAA|
|Regulatory Information - Human Subject Safety|
|Regulatory Information - IND/IDE|
|Participating Sites|
|Trial Related Documents|
|NCI Specific Information|
|Scientific Data (Section)|
|Trial Design|
|Trial Description|
|Interventions|
|Arms|
|Eligibility Criteria|
|Associated Trials|
|Disease / Condition|
|Data Table 4 Anatomic Sites|
|Outcome Measures|
|Sub-Groups|
|Bio Markers|
|Completion (Section)|
|Abstraction Validation|

Scenario: #2 Abstaction Sidebar Menu Tabs collapsed
Given I am logged into the CTRP application
And I have selected a trial to abstract
And I have selected the unexpand arrow on the Trial Abstraction menu item
Then the sidebar menu will collapse displayed the section headers:
|Trial Abstraction - <Current Trial ID>|
|Trial Identification|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #3 Expand Abstaction Sidebar Menu Tab
Given I am logged into the CTRP application
And I have selected a trial to abstract
And the side bar is collapsed
And I have selected the expand arrow on the Trial Abstraction menu item
Then the sidebar menu will be fully expanded collapse displayed the section headers:
|Trial Abstraction - <Current Trial ID>|
|Trial Identification|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #4 Expand Abstaction Sidebar Menu Tab sections
Given I am logged into the CTRP application
And I have selected a trial to abstract
And the side bar is collapsed
And I have selected the expand arrow on the the side bar section
Then that sidebar menu section will be expanded"
|Trial Abstraction - <Current Trial ID>|
|Trial Identification|
|Administrative Data|
|Scientific Data|
|Completion|

Scenario: #5 Trial Validation Sidebar Menu Tab for imported trails
Given I am logged into the CTRP application
And I have selected a trial to Validate
And the trial study source is
|Industrial|
|Other|
|Expanded Access|
Then the sidebar menu will be displayed expanded:
|Trial Validation - <Current Trial ID>|
|Participating Sites|
|Submission Validation|

Scenario: #6 Trial Validation Sidebar Menu Tab for non imported trials
Given I am logged into the CTRP application
And I have selected a trial to Validate
And the trial study source is
|National|
|Externally Peer-Reviewed|
|Institutional|
Then the sidebar menu will be displayed expanded:
|Trial Validation - <Current Trial ID>|
|Regulatory Information - FDAAA|
|Regulatory Information - IND/IDE|
|Trial Status|
|Trial Funding|
|Trial Related Documents|
|Submission Validation|

