@PA @global
Feature: Global F04 Field Annotations and Help

As any CTRP PA User, I will see helpful comments on Trial Date and Status fields

Scenario: #1 PA Trial Status Comments (Trial Status)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the comment appears below the Trial Status Date field
|Please refer to the Trial Status Transition Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules |

Scenario: #2 PA Trial Status Comments (Completion Dates)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the comment appears below the Completion Date field
|Please refer to the Trial Status Rules for Start and Completion Dates Rules https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates |

Scenario: #3 PA Trial Status Comments (Why Study Stopped?)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the comment appears below the Why Study Stopped?
| Administratively Complete, Withdrawn, and Temporarily Closed statuses only|

Scenario: #4 PA Trial Status Comments (Trial Status Values)
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Status Screen
Then the comment appears below the Trial Status?
| In Review - The trial is in development and waiting for final approval.|
|Approved - Trial has been approved.|
|Active � The trial is open for Accrual.| 
|Temporarily Closed to Accrual - Trial is temporarily not accruing.|
|Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
|Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
|Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
|Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
|Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
|Withdrawn - Trial has been withdrawn from development and review.|


Scenario: #8 PA General Trials Details Keywords field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the General Trails Details Screen
Then a comment appears below the Keywords field to display the number of characters available to enter into the field.  
|4000 characters left|
And "x characters left" will be displayed as characters are added
When 4000 characters have been entered
Then no additional text can be entered

Scenario: #9 PA Regulatory Information � Human Subject Safety Board Name field character count
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Regulatory Information � Human Subject Safety Screen
Then a comment appears below the Board Name field to display the number of characters available to enter into the field.  
|160 characters left|
And "x characters left" will be displayed as characters are added
When 160 characters have been entered
Then no additional text can be entered


