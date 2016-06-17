@Global@PO

Feature: PO F21 Create a CTEP Organization with Pending Source Status

1.	CTEP creates a new organization and sends it via RESTful Services to CTRP
a.	CTRP creates a CTEP Context with a CTEP Context Status of Pending and returns a CTEP Context ID to CTEP


 Scenario: #1 As a PO Curator,I can create a CTEP Context with a Pending Status in CTRP
    Given I am logged into the CTRP PO application
    When CTRP receives newly created CTEP organizations through Restful Services
    Then The CTRP curator creates a CTEP Context with CTEP Context Status of pending in CTRP and information type
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
    And CTRP Curator returns a CTEP Context ID to CTEP


Scenario: #2 As a PO Curator, I can search a NEW CTRP Organization to associate it with an Organization in the CTEP Context
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
 
   Scenario: #4 As a CTRP PO Curator I can approve or deny a request for a new organization in CTRP (Who sends the request to the curator)
    Given I am logged into the CTRP PO Application 
     And I have received a request to create a a new organization in CTRP
     When I have searched existing organizations in CTRP
     And the requested organization exists in the CTRP Context
    Then I can deny the request 
    When the requested organization does not exist in the CTRP Context
    Then I can create the requested organization in the CTRP Context
    And I can send the CTRP Organization context to the CTEP-ECM


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
     
       Scenario:#7 I can search create a CTRP Organization associated with an Organization in the NLM Context 
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




    
    
    