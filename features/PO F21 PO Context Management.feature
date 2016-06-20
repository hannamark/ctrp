@Global@PO

Feature: PO F21 PO CTRP-CTEP-NLM Context Management Functionality


Scenario:#10 As a PO Curator,I can create a CTEP Context of a new Organization record 
    Given I am logged into the CTRP PO application
    When CTRP receives newly created CTEP Organization record through Restful Services
    Then The CTRP curator creates a new Organization in the CTEP Context with CTEP Context Status of pending in CTRP with information type
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Context ID|
    |CTEP Context Status|
      

Scenario: #1 As a PO Curator, I can search a NEW CTEP Organization to create a CTRP Context 
    Given Given I am logged into the CTRP PO application
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Organizations in the CTEP Context with Pending status with information Type
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Context ID|
    |CTEP Context Status|

    When the viewed CTEP Organization does not exist in CTRP
    Then the Curator creates a new CTRP Organization associated with the CTEP Context with the information type
    
     |CTRP Context|
     |CTRP Organization ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Public Research Email|
     |Public Research Phone|
     |Aliases|

    And the CTEP Context Status is changed from Pending to Active
    And The CTEP Organization Information Type is copied into the CTRP Context
    
    Scenario: #2 As a PO Curator,I can associate an existing CTRP Organization with the Organization in the CTEP Context
    Given I am logged into the CTRP PO application
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Organizations in the CTEP Context with Pending status with information Type
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Context ID|
    |CTEP Context Status|

    When the viewed CTEP Organization exists in CTRP
    Then the curator associated the existing CTRP Organization with the Organization in the CTEP Context
    And the CTEP Context Status is changed from Pending to Active
    And The CTRP Organization ID (PO ID) and CTEP Organization ID is sent to CTEP
    
  
 Scenario: #3 As a CTRP PO Curator, I can update Organization information with the New information received from CTEP
    Given I am on the Search Organizations Screen
    And I can view Organizations in the CTEP Context with Pending status and updated organization information sent to CTRP via Restful service
    And the CTRP Curator update the CTEP Context with the new information
    And The CTRP Context is automatically updated 
    When the CTEP Organization Status is inactive
    Then the CTRP Context won't be automatically updated
 
   Scenario: #4 As a CTRP PO Curator I can approve or deny a request for a new organization in CTRP 
    Given I am logged into the CTRP PO Application 
     And I have received a request to create a new organization in CTRP
     When I have searched existing organizations in CTRP
     And the requested organization exists in the CTRP Context
    Then I can deny the request 
    When the requested organization does not exist in the CTRP Context
    Then I can create the requested organization in the CTRP Context
    And I can send the CTRP Organization context to the CTEP-ECM (Do we get information back: CTEP Context ID and Status)


      Scenario:#5 As a CTRP PO Curator, I can link CTEP Organization with an existing CTRP organization 
    Given I am logged into the CTRP PO Application
     When The curator receives an Organization created in CTEP with CTEP Organization ID and a CTRP Organization ID (PO ID) based on a new Organization created in CTRP
    And the CTEP Organization information includes the CTEP Organization ID and the CTRP Organization ID (PO ID) and other information type
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Public Research Email|
    |Public Research Phone|
    |Funding Mechanism|
    |CTEP Context ID|
    |CTEP Context Status|
   
   Then a CTEP Context for the received organization is created and automatically linked to the CTRP Context

   
    Scenario:#6 As a CTRP Curator, I can create an NLM Context for an Imported trial  
    Given I am logged into the CTRP PO Application
     When a trial has been imported with a Sponsor Name that does not exist in the NLM Context in the CTRP
     Then I can create an NLM Context with an NLM Context Status of Pending in CTRP
     
       Scenario:#7 I can search a CTRP Organization associated with an Organization in the NLM Context 
    Given I am logged into the CTRP PO Application 
    And And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as NLM
    Then I can view Organizations in the NLM Context with Pending status with information Type
     
     | NLM Context|
     |Name (Sponsor)|
     |NLM Context ID|
     |NLM Context Status|
    
    When the Imported organization does not exist in the CTRP Context
    Then I can create a NEW CTRP Organization with information type
     
     |CTRP Context|
     |CTRP Organization ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Public Research Email|
     |Public Research Phone|
     |Aliases|
    
    And I can associate the created organization with the NLM Context
    And The NLM Context Status is changed from Pending to Active
    And The new CTRP Context information is sent to CTEP
    When the Imported Organization exists in CTRP
    Then the CTRP Curator associates an existing CTRP Organization with the NLM Context
    And The NLM Context Status is changed from Pending to Active

  Scenario:#8 Curator will be notified when two organizations are to be merged 
    Given I am logged into the CTRP PO Application 
     When CTEP Indicates via REST Service that two Organizations are to be merged
     And CTEP identifies one Organization will be Active and Another Organization will be Inactive as the result of a merger
     Then the pending CTRP Nullification event will be added to the curator work queue
     
     
       Scenario: #9 I can Nullify the Inactive Organization 
    Given I am logged into the CTRP PO Application
     When A curator is notified that a CTEP Organization merger is pending
    Then The curator will select the CTRP organization associated with the CTEP Inactive organization to be nullified
    And the curator will select the CTRP organization associated with the CTEP Active organization to replace the trail associations of the nullified organization
    (Nullification process is described in PO F06)
    

	Scenario:#10 As a PO Curator,I can create a CTEP Context of a new person record 
    Given I am logged into the CTRP PO application
    When CTRP receives newly created CTEP person record through Restful Services
    Then The CTRP curator creates a new person in the CTEP Context with CTEP Context Status of pending in CTRP with information type
    
      |CTEP Person ID|
      |CTEP Person Registration Type|
      |CTEP Person Registration Status|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Public Research Phone|
      |Public Research Email|
      |Person Status|
      |Affiliated Organization CTEP ID|
      |CTEP Context ID|
      |CTEP Context Status|
      
Scenario: #12 As a PO Curator, I can search a NEW person record to associate it with a person in the CTEP Context
    Given Given I am logged into the CTRP PO application
    And I am on the Search Persons Screen
    When I select Source status as pending
    And I select Source context as CTEP
    Then I can view Persons in the CTEP Context with Pending status 
    When the viewed CTEP Person does not exist in CTRP
    Then the Curator creates a new CTRP Person associated with the CTEP Context with the information type
      |CTRP Person ID|
      |CTRP Person Status|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Public Research Phone|
      |Public Research Email|
      |Person Status|
      |Affiliated Organization CTRP ID|
      
    
    And the CTEP Context Status is changed from Pending to Active
    And The CTEP Context Person Information is copied into the CTRP Context
    When the viewed CTEP Person exists in CTRP
    Then A CTRP Curator associates an existing CTRP Person record with the CTEP Context
    And The CTEP Context Status is changed from Pending to Active
    
     Scenario: #13 Rules for CTRP Organization Status based on CTEP Organization Status
    Given I am logged into the CTRP PO application
     When the Organization CTEP context status is Active
     Then the Organization CTRP context status cannot be inactive 
     When the Organization CTEP context status is Inactive
     Then the CTRP context can be Inactive (Can CTRP Organization have a different status?)
     When the CTEP context is active, the CTRP context should be active
     Then the CTRP context should be Active


      Scenario: #14 I can Nullify a Duplicate Person record in CTRP
     Given I am logged into the CTRP PO application
     And I am on the CTRP PO Curator Review screen
     When I have been notified of a CTEP Duplicate Person Record
     Then I will identify two Person Records in the CTRP Context that are duplicates
     And I select one of the Person Records to be retained
     And I select the other Person Record to be nullified
     And the Person Record to be nullified does not have an Active Status
     And all references in CTRP to the nullified Person Record will reference the retained Person Record
     And any unique Person Organization Affiliations on the nullified Person Record will be added to the retained Person Record
     And the status of the Person Record to be nullified will be "Nullified"

    
    
    