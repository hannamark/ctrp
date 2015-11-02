  @PO @Global
  Feature: PO F5 Delete Organization 

  @runthis
  Scenario: As a PO Curator, I can Delete an Organization with no Trial Records
    Given I know which organization I want to delete
    And I am logged in to CTRP PO application
    And I have searched for an organization and found the one I wish to delete
    When I have selected the function Delete Organization
    And I submit my delete request
    And the organization is not referenced as a lead organization on a trial
    And the organization is not referenced as a participating site on a trial
    And the organization is not referenced as a Person record Affiliated Organization
    And the organization is not referenced as a CTRP User Affiliated Organization
    And the organization is not part of a Family Organization
    Then the system will delete the organization record

  Scenario: As a PO Curator, I cannot Delete Organization with Trial Records
    Given I know which organization I want to delete
    And I am logged in to CTRP PO application
    And I have searched for an organization
    And the organization is referenced as a lead organization on a trial or participating site on a trial or Person record Affiliated Organization or CTRP User Affiliated Organization or part of a Family Organization
    Then the Delete operation will stop and the error message "This organization cannot be deleted" will be displayed

