@PO @Global
Feature: Edit Organization Information

  @runthis
  Scenario: As a Curator, I can Edit organization name
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the name of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the organization name in the organization record to the new name
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization address
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the address of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the organization address in the organization record to the new address
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As Curator, I can Edit organization phone number
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the phone number of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the organization phone number in the organization record to the new phone number
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization email
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the email of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the organization email in the organization record to the new email
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization city
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the city of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the city in the organization record to the new city
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization state
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the state of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the state in the organization record to the new state
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization country
  Given I know which organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the country of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the country in the organization record to the new country
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organization zip code
  Given I know which CTRP organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change the zip code of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change the zip code in the organization record to the new zip code
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can Edit organizations with multiple parameters
  Given I know which CTRP organization I want to edit
  And I am logged in to CTRP PO application
  And I have searched for a CTRP organization and found the one I wish to edit
  And I have selected the function Edit Organization
  And I am on the edit organization information screen
  And I change multiple parameters of the organization I wish to edit
  And I set the organization status to either Pending or Active
  And I submit my edit request
  Then the system should change all the parameters in the organization record
  And my name should be listed as last update with the current date and time
  And the organization status should be Pending or Active as indicated

  Scenario: As a Curator, I can reset the edit values during the edit process
  Given I am in the Edit Organization feature
  And I want to cancel my changes
  When I select the Reset function
  Then edit form will be refreshed with the last committed values for the selected organization

