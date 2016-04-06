@Global @Reg
Feature: Reg F02 View Persons

As any CTRP User, I am able to View Existing Persons


Scenario Outline: #1 I am able to view existing person in CTRP as a Registry user
  Given I am logged into the CTRP Registration application
  And the following parameters of a Person exist:
    |Prefix|PersonFirstName|PersonMiddleName|PersonLastName|Suffix|SourceContext|SourceID|SourceStatus |email |phone|Org Affiliation|
    |Ms|shiFNameTrial|shiMNameTrial |shiLNameTrial |Suffix|CTRP|shiSID|Active |shiPercukeTrial@pr.com| 420-999-8906|ShiOrg|
  And I have completed a person search 
  When I have cliked on the name of the person I want to view
  Then I will view person details type
      |Prefix  | Ms|
      |First Name  | shiFNameTrial|
      |Middle Name  | shiMNameTrial|
      |Last Name  | shiLNameTrial
      |Suffix  | Suffix|
      |Source Context  | CTRP|
      |Source ID  | shiSID|
      |Source Status  |Active|
      |Email  |shiPercukeTrial@pr.com| 
      |Phone Number  |420-999-8906|
      |Org Affiliation|ShiOrg|
      
And I should not be allowed to edit organization parameters
And I should not be allowed to delete an organization
And I should not view, edit or delete comments added by curators