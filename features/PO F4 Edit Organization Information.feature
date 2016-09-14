@PO @Global
Feature: PO F4 Edit Organization Information


  Scenario:#1 As a Curator, I can Edit organization details
    Given I am logged in to CTRP PO application
    And I have searched CTRP Organizations 
    When I select the CTRP Organization I want to Edit
    Then the edit organization information screen will display
    And I edit the organization field type
    |Name|
    |Source Status|
    |Processing Status|
    |Address1|
    |Address2|
    |Country|
    |State|
    |City|
    |Postal Code|
    |Email|
    |Phone Number|
    |Phone Number Extension|
    
    And I save my edit request
    Then the system should save the updated information in the organization record 
    And my name should be listed as last update <Update By> with the current date and time "ctrpadmin (13-Sep-2016 12:26:23 EDT)" 
    
    
    Scenario:#2 As a Curator, I can Edit created Organization
    Given I am logged in to CTRP PO application
    And I am on the search Organization results screen
     When I select an organization I want to edit
     Then the edit screen will display
     And I can edit all fields except
     
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |Source Context|
     When I click on the save button
     Then the edited information will be saved to the trial records
     
    
  Scenario:#3 As a Curator, I can reset the edit values during the edit process
    Given I am On the Edit Organization screen
    And I want to cancel my changes
    When I select the Reset function
    Then edit form will be refreshed with the last committed values for the selected organization

  Scenario:#4 As a Curator, I am allowed to Edit Organization when I am on the CTRP Context
    Given I know which organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTRP context and my write mode should be on
    Then I should be allowed to edit editable features
    When I am on the CTRP Context and my write mode is off
    Then I will not be able to edit editable features

  Scenario:#5 As a Curator, I should not be allowed to Edit Organization when I am on the CTEP Context
    Given I know wich organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the CTEP Context and my write mode is on
    Then I should not be allowed to edit any features
    When I am on the CTEP Context and my write mode is off
    Then I should not be allowed to edit any features
    
    Scenario:#6 As a Curator, I should not be allowed to Edit Organization when I am on the NLM Context
    Given I know wich organization I want to edit
    And I am logged in to the CTRP PO Application
    And I have selected the organization I want to edit
    And I am on the Edit Organization screen
    When I am on the NLM Context and my write mode is on
    Then I should not be allowed to edit any features
    When I am on the NLM Context and my write mode is off
    Then I should not be allowed to edit any features


