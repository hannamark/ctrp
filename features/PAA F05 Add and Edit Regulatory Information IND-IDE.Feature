@PA @global
Feature: As any CTRP PA User, I can add and edit Regulatory Information (IND/IDE)

Scenario: #1 I can add and edit Regulatory IND or IDE Information for a Trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have selected the IND/IDE Type from a list
|IND|
|IDE|
And I have entered the IND/IDE number
And I have selected the IND/IDE Grantor from a list based on IND or IDE selected
|IND: CDER, CBER|
|IDE: CDRH, CBER|
And I have selected the IND/IDE Holder Type from a list
|Investigator|
|Organization|
|Industry|
|NIH|
|NCI|
And I have selected the NIH Institution or NCI Division/Program Code from a list
|NIH Values Below:|
|NEI-National Eye Institute|
|NHLBI-National Heart, Lung, and Blood Institute|
|NHGRI-National Human Genome Research Institute|
|NIA-National Institute on Aging|
|NIAA-National Institute on Alcohol Abuse and Alcoholism|
|NIAID-National Institute of Allergy and Infectious Diseases|
|NIAMS-National Institute of Arthritis and Musculoskeletal and Skin Diseases|
|NIBIB-National Institute of Biomedical Imaging and Bioengineering|
|NICHD-NICHD-Eunice Kennedy Shriver National Institute of Child Health and Human Development|
|NIDCD-National Institute on Deafness and Other Communication Disorders|
|NIDCR-National Institute of Dental and Craniofacial Research|
|NIDDK-National Institute of Diabetes and Digestive and Kidney Diseases|
|NIDA-National Institute on Drug Abuse|
|NIEHS-National Institute of Environmental Health Sciences|
|NIGMS-National Institute of General Medical Sciences|
|NIMH-National Institute of Mental Health|
|NINDS-National Institute of Neurological Disorders and Stroke|
|NINR-National Institute of Nursing Research|
|NLM-National Library of Medicine|
|CIT-Center for Information Technology|
|CSR-Center for Scientific Review|
|FIC-John E. Fogarty International Center for Advanced Study in the Health Sciences|
|NCCAM-National Center for Complementary and Alternative Medicine|
|NCMHD-National Center on Minority Health and Health Disparities|
|NCRR-National Center for Research Resources (NCRR)|
|CC-NIH Clinical Center|
|OD-Office of the Director|
|NCI Values Below:|
|CCR|
|CCT/CTB|
|CIP|
|CDP|
|CTEP|
|DCB|
|DCCPS|
|DCEG|
|DCP|
|DEA|
|DTP|
|OD|
|OSB/SPOREs|
|TRP|
|RRP|
|N/A|
Then the IND/IDE Information for the trial will be associated with the trial

Scenario: #2 I can add and edit Regulatory IND and IDE information for multiple IND or IDE registrations for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have entered the information for an IND or IDE
Then I will be able to select "Add IND/IDE" and enter the information for multiple IND/IDEs

Scenario: #3 I can remove Regulatory IND and IDE information for one or more IND or IDE registrations for a trial
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have selected the IND or IDE
Then I will be able to remove the IND or IDE information for one or more INDs or IDEs

Scenario: #4 Save Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information (IND/IDE) screen
When select save 
Then the information entered or edited on the Regulatory Information (IND/IDE) screen will be saved to the trial record

Scenario: #5 Cancel Regulatory Information
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Register Trial Regulatory Information (IND/IDE) screen
When select Cancel
Then the information entered or edited on the Regulatory Information (IND/IDE) screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #6 Regulatory IND or IDE Information must be complete 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Trial Regulatory Information (IND/IDE) screen
When I have not selected values the IND/IDE Type 
And I have not entered the IND/IDE number
And I have not selected the IND/IDE Grantor
And I have not selected the IND/IDE Holder Type 
And I have not selected the NIH Institution or NCI Division/Program Code when the IND/IDE Holder Type is 
|NCI|
|NIH|
And selected Save
Then the system will display a warning that each of values that were not entered must be entered in order to associate the IND/IDE Information for the trial 

