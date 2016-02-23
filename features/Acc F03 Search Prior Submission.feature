@Acc @global

Feature: Acc F03 Search Prior Submissions
As a CTRP Accrual User, I can search Prior Submissions in the CTRP Accrual Application 

  Scenario: #1 I can search Prior Submissions 
    Given I am logged into the CTRP Accrual Application 
    And I can view all prior Submissions results
    When I enter submission Date period
    Then submissions entered during the same period of time will be displayed
    And the submissions <detailstype> will be viewed
    
      |<detailstype>  |
      |Trial ID  |
      |File/Subject  |
      |Submission Method  |
      |Submission Date/Time  |
      |Submitted By  |
      |Submission Accepted?  |
      
      And I can search submission by <detailstype>
      When I enter a <detailstype> in the search field
      Then only results with the entered <detailstype> will be displayed
      

    