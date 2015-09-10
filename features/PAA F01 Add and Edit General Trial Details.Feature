@PA @global
Feature: As any CTRP PA User, I can enter general trial details 

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
And I select the Alternative Title Category of “Spelling/Formatting” or “Other” for each Alternative Title
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

Scenario: #8 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select the Responsible Party Type from a list of options as:
| Sponsor |
| Principal Investigator |
| Sponsor-Investigator |
Then the selected value will be recorded as the Responsible Party Type

Scenario: #9 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search
And I have selected a person as the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party and the Sponsor Organization will be recorded as the Investigator’s Affiliation Organization

Scenario: #10 I can define the Investigator’s Title
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I enter the Title for the Investigator (Field will be prefilled with “Principal Investigator”)
Then the selected value will be recorded as the Responsible Party Type

Scenario: #11 I can associate an organization an Affiliation of the Investigator
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have selected an organization as Affiliation of the Investigator
And the Responsible Party Type is Principal Investigator
And I have selected organization look-up
When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
Then the selected organization will be the Affiliation of the Investigator for the trial

Scenario: #12 I can associate the Primary Investigator as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I have selected the radio button for PI
And the phone # and e-mail address is displayed 
Then I can edit the phone # and e-mail address 
And the PI, phone # and e-mail address will be associated with this trail

Scenario: #13 I can associate a person as the Central Contact or for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for Person
And preform a person look and select a person
And the selected Person, their phone # and e-mail address will be displayed
Then I can edit the phone # and e-mail address 
And the Person, phone # and e-mail address will be associated with this trail

Scenario: #14 I can associate General Central Contact for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for General Contact
And I enter the Central Contact Name
And I enter either a Central Contact Phone Number or Central Contact E-Mail Address or both
Then the selected Central Contact, Phone # and e-mail address will be Central contact for the trial

Scenario: #15 I can associate a stored General Central Contact for the trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I am in the Central Contact section
And I select the radio button for General Contact
And I select the Contact Lookup 
And I select the Contact for the list of General Contacts 
Then the selected Central Contact, Phone # and e-mail address will be Central contact for the trial

Scenario: #16 Save General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select save 
Then the information entered or edited on the General Trails Details screen will be saved to the trial record

Scenario: #17 Cancel General Trials Details information
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When select Cancel
Then the information entered or edited on the General Trails Details screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario: #18 Protocol ID not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the protocol ID is Null
Then a warning message will appear “Please enter the Protocol Identifier”

Scenario: #19 Official Title not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Official Title is Null
Then a warning message will appear “Please enter the Official Title”

Scenario: #20 Lead Organization is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Lead Organization is Null
Then a warning message will appear “Please enter the Lead Organization”

Scenario: #21 Principal Investigator is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Principal Investigator is Null
Then a warning message will appear “Please enter the Principal Investigator”

Scenario: #22 Sponsor is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Sponsor is Null
Then a warning message will appear “Please enter the Sponsor”

Scenario: #23 Responsible Party Type is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Responsible Party Type is Null
Then a warning message will appear “Please enter the Responsible Party Type”

Scenario: #24 Investigator is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Investigator is Null
And the Responsible Party Type is “Sponsor Investigator”
Then a warning message will appear “Please enter the Investigator”

Scenario: #25 Investigator Title is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Investigator is Null
Then a warning message will appear “Please enter the Investigator”

Scenario: #26 Investigator Affiliation is not null
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
When I select save
And the Investigator Affiliation is Null
And the Responsible Party Type is “Principal Investigator”
Then a warning message will appear “Please enter the Investigator Affiliation”

Scenario: # 27 e-mail address format
Given I know which e-mail address I want to edit
And I am logged in to CTRP application
And I have selected e-mail address field 
And I change the e-mail address in the format "text"@"text"."text" 
When I change the e-mail address and the format is not "text"@"text"."text"
Then the system displays a warning message that says "The E-mail address is incorrect"

Scenario: #28 Organization lookup for Lead Organization on a clinical trial
Given I have selected a trial to abstract 
And I am on the General Trial Details screen
And I have performed an organization look-up
Then a can pick from a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, IRB) 
And if the organization is not listed, I can as a  as the trial's Lead Organization
Then the selected organization will be associated to the trial as Lead Organization


