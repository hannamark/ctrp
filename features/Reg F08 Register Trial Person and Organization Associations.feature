@Global @Reg
Feature: Reg F08 Register Trial Person and Organization Associations

As a CTRP User, I can associate Persons and Organizations with a Clinical Trial

Scenario: #1 I can associate an organization as the lead organization on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Lead Organization/Principal Investigator screen
When I have performed an organization look-up in Search Organizations
And I have selected an organization as the trial's Lead Organization
Then the selected organization will be associated the the trial as Lead Organization

Scenario: #2 I can associate a person as the principal investigator on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Lead Organization/Principal Investigator screen
When I have performed a person look-up in Search Persons
And I have selected a person as the trial's Principal Investigator
Then the selected person will be associated the the trial as Principla Investigator

Scenario: #3 I can associate an organization as the Sponsor on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When I have performed an organization look-up in Search Organizations
And I have selected an organization as the trial's Sponsor
Then the selected organization will be associated the the trial as Sponsor

Scenario: #4 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When I select the Responsible Party Type from a list of options as:
| Sponsor |
| Principal Investigator |
| Sponsor-Investigator |
Then the selected value will be recorded as the Responsible Party Type

Scenario: #5 I can select an Investigator when the Responsible Party is the Sponsor
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When the Responsible Party Type is Sponsor
Then the Sponsor organization will be recorded as the Responsible Party

Scenario: #6 I can select an Investigator when the Responsible Party is the Principal Investigator
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When the Responsible Party Type is Principal Investigator
Then the Principal Investigator selected will be recorded as the Responsible Party
And the Investigator Title will be displayed as "Principal Investigator"
And the Investigator Title may be edited
And the Investigator Affiliation will be the Principal Investigator's organization affiliation
And the Investigator Affiliation can be changed

Scenario: #7 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Sponsor/Responsible Party screen
When the Responsible Party Type is Sponsor-Investigator
And I have performed a person search in Search Persons
And I have selected a person and the Investigator
Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party
And the Investigator Title will be displayed as "Principal Investigator"
And the Investigator Title may be edited
And the Investigator Affiliation will be the Sponsor organization
And the Investigator Affiliation cannot be changed

Scenario: #8 I can associate one or more organizations as the Funding Source on a clinical trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Funding Source screen
When I have performed an organization look-up
And I have selected an organization as the trial's Funding Source
Then the selected organization will be associated the the trial as Funding Source
And I have the option to associate another organization as the trial Funding Source

