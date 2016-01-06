@PA @global
Feature: PAA F01 Add and Edit General Trial Details

As any CTRP PA User, I can enter general trial details 

Scenario: #1 I can enter the different Protocol Identifiers for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I can edit the lead organization trial identifier
And I can optionally enter or edit one or more Other Trial Identifiers
Then the Protocol Identifier section will be complete

Scenario: #2 I can enter the Acronym and Official Title for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I edit the Official Title for the trial  
And I can optionally enter or edit the Acronym for the trial
Then the title section will be complete

Scenario: #3 I can enter Alternative Titles for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I add or edit the Alternative Title 
And I select the Alternative Title Category for each Alternative Title from the list:
|Spelling/Formatting Correction|
|Other|
And I select the source for the Alternative Title for each Alternative Title from the list:
|Protocol|
|Complete Sheet|
|IRB|
|Other|
Then the Alternative Titles section will be complete

Scenario: #4 I can enter the Keywords for a trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I can enter or edit the Keywords for the trial identifier
Then the Keywords section will be complete

Scenario: #5 I can associate an organization as the Lead Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, IRB) are displayed
Then I can select an organization from the list or search for an organization
And the selected organization will be associated to the trail as the Lead Organization

Scenario: #6 I can associate a person as the Principal Investigator on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I have performed a person look-up
And I have selected a person as the trial's Principal Investigator
Then the selected person will be associated to the trial as Principal Investigator

Scenario: #7 I can associate an organization as the Sponsor Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (Lead , IRB) are displayed
Then I can select an organization from the list or search for an organization
And the selected organization will be associated to the trail as the Sponsor

Scenario: #8 I can associate the Primary Investigator as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I have selected the radio button for PI
And the phone # and e-mail address is displayed 
Then I can edit the phone # and e-mail address 
And the PI, phone # and e-mail address will be associated with this trail

Scenario: #9 I can associate a person as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for Person
And preform a person look and select a person
And the selected Person, their phone # and e-mail address will be displayed
Then I can edit the phone # and e-mail address 
And the Person, phone # and e-mail address will be associated with this trail

Scenario: #10 I can associate General Central Contact for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for General Contact
And I enter the Central Contact Name
And I enter either a Central Contact Phone Number or Central Contact E-Mail Address or both
Then the selected Central Contact, Phone # and e-mail address will be Central contact for the trial

Scenario: #11 I can associate a stored General Central Contact for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for General Contact
And I select the Contact Lookup 
And I select the Contact for the list of General Contacts 
Then the selected Central Contact, Phone # and e-mail address will be Central contact for the trial

Scenario: #12 Save General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select save 
Then the information entered or edited on the General Trails Details screen will be saved to the trial record

Scenario: #13 Cancel General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select Cancel
Then the information entered or edited on the General Trails Details screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #14 Protocol ID not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the protocol ID is Null
Then a warning message will appear “Please enter the Protocol Identifier”

Scenario: #15 Official Title not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Official Title is Null
Then a warning message will appear “Please enter the Official Title”

Scenario: #16 Lead Organization is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Lead Organization is Null
Then a warning message will appear “Please enter the Lead Organization”

Scenario: #17 Principal Investigator is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Principal Investigator is Null
Then a warning message will appear “Please enter the Principal Investigator”

Scenario: #18 Sponsor is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Sponsor is Null
Then a warning message will appear “Please enter the Sponsor”

Scenario: # 19 e-mail address format
Given I know which e-mail address I want to edit
And I am logged in to CTRP application
And I have selected e-mail address field 
And I change the e-mail address in the format "text"@"text"."text" 
When I change the e-mail address and the format is not "text"@"text"."text"
Then the system displays a warning message that says "The E-mail address is incorrect"

Scenario: #20 Organization lookup for Lead Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have performed an organization look-up
Then a can pick from a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, IRB) 
And if the organization is not listed, I can as a  as the trial's Lead Organization
Then the selected organization will be associated to the trial as Lead Organization


