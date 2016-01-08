@PA @global
Feature:  PAS F08 Data Table 4 Anatomic Sites 
As a CTRP Scientific Abstractor, I can add and Delete Summary 4 Anatomic Sites

Scenario: #1 I can add Data Table 4 Anatomic Sites for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Data Table 4 Anatomic Sites screen
And I select Add
And I have selected one or more items from the sorted <Anatomic Site> list 
When I select Save
Then the Data Table 4 Anatomic Sites for the trial will be associated with the trial
|Data Table 4 Anatomic Site|
|Anus|
|Bones and Joints|
|Brain and Nervous System|
|Breast - Female|
|Breast - Male|
|Cervix|
|Colon|
|Corpus Uteri|
|Esophagus|
|Eye and Orbit|
|Hodgkin's Lymphoma|
|Ill-Defined Sites|
|Kaposi's Sarcoma|
|Kidney|
|Larynx|
|Leukemia, not otherwise specified|
|Leukemia, other|
|Lip, Oral Cavity and Pharynx|
|Liver|
|Lung|
|Lymphoid Leukemia|
|Melanoma, Skin|
|Multiple|
|Multiple Myeloma|
|Mycosis Fungoides|
|Myeloid and Monocyte Leukemia|
|Non-Hodgkin's Lymphoma|
|Other Digestive Organ|
|Other Endocrine System|
|Other Female Genital|
|Other Hematopoietic|
|Other Male Genital|
|Other Respiratory/Intrathoracic Organs|
|Other Skin|
|Other Urinary|
|Ovary|
|Pancreas|
|Prostate|
|Rectum|
|Small Intestine|
|Soft Tissue / Sarcoma|
|Stomach|
|Thyroid|
|Unknown Sites|
|Urinary Bladder|

Scenario:  #2 I can Delete Data Table 4 Anatomic Sites for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I have selected a trial
And I am on the Data Table 4 Anatomic Sites screen
When I have selected the Delete check box for an individual anatomic site 
And have clicked on Delete button
And the message displays 'click OK to remove selected Anatomic site(s) form the study. Click Cancel to abort'
And I have clicked on  OK
Then the Data Table 4 Anatomic Site(s) is removed from the trial record
When I have Clicked the Select All button
Then the Delete check box is checked for all entries
When I click on Delete button
Then the message displays 'click OK to remove selected Anatomic site(s) form the study. Click Cancel to abort'
When I have clicked on  OK
Then the Data Table 4 Anatomic Site(s) is removed from the trial record
And the message 'Record(s) deleted displays
When I click on Cancel
Then the Data Table 4 Anatomic Site(s) are not removed from the trial record
And no message displays

Scenario: #3 I can cancel from Add Data Table 4 Anatomic Site
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Data Table 4 Anatomic Sites Screen
And I select Add
And I have selected one or more items from the <Anatomic Site> list 
When I select Cancel 
Then the Data Table 4 Anatomic Site screen displays
And the selected Anatomic Sites will not be associated to the trial record 