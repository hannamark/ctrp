@PA @global
Feature: As any CTRP PA User, I can add and edit Trial Related Documents

Scenario: #1 I can add Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select add a document
And have browsed and selected file to attach
And have selected the Document type from the list of:
|Protocol Document|
|IRB Approval Document|
|Informed Consent Document|
|Participating Sites|
|Protocol Highlighted Document|
|TSR|
|Complete Sheet|
|Change Memo|
|Other|
And have entered a Description of the Document when the document type is Other
Then the Trial Related Document will be associated with the trail
And the date the document was will be listed with the document 
And the users name that added the document will be listed with the document

Scenario: #2 I can Edit the Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select Edit a document
And have browsed and selected a new file to attach
And have selected the Document type from the list of:
|Protocol Document|
|IRB Approval Document|
|Informed Consent Document|
|Participating Sites|
|Protocol Highlighted Document|
|TSR|
|Complete Sheet|
|Change Memo|
|Other|
And have entered a Description of the Document when the document type is Other
Then the Trial Related Document will be associated with the trail
And the date the document was will be listed with the document 
And the users name that added the document will be listed with the document

Scenario: #3 I can Delete Trial Related Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select one or more document to delete
Then the Trial Related Document will be Unassociated with the trail

Scenario: #4 Save Trial Related Documents
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When select save 
Then the information entered or edited on the Trial Related Documents screen will be saved to the trial record

Scenario: #6 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Related Documents screen
When select Cancel
Then the information entered or edited on the Trial Related Documents screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #7 I can Not delete the Protocol or IRB Approval Documents 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Related Documents screen
When I select Delete one or more documents
And have selected a document with a type of :
|Protocol Document|
|IRB Approval Document|
Then the system will display a warning message that the Protocol Document and or IRB Approval Document cannot be deleted
