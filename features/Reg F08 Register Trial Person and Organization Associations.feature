@Global @Reg
Feature: As a CTRP User, I can associate Persons and Organizations with a Clinical Trial

Scenario 1: I can associate an organization as the lead organization on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Lead Organization/Principal Investigator screen
When I have performed an organization look-up
And I have selected an organization as the trial's Lead Organization
Then the selected organization will be associated the the trial as Lead Organization

Scenario 2: I can associate a person as the principal investigator on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Lead Organization/Principal Investigator screen
When I have performed a person look-up
And I have selected a person as the trial's Principal Investigator
Then the selected person will be associated the the trial as Principla Investigator

Scenario 3: I can associate an organization as the Sponsor on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When I have performed an organization look-up
And I have selected an organization as the trial's Sponsor
Then the selected organization will be associated the the trial as Sponsor

Scenario 4: I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When I select the Responsible Party Type from a list of options as:
| Sponsor |
| Principal Investigator |
| Sponsor-Investigator |
Then the selected value will be recorded as the Responsible Party Type

Scenario 5: I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search
And I have selected a person and the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party

Scenario 6: I can associate an organization as the Funding Source on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Funding Source screen
When I have performed an organization look-up
And I have selected an organization as the trial's Funding Source
Then the selected organization will be associated the the trial as Funding Source
