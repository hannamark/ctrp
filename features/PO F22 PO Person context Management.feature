@Global@PO

Feature: PO F22 PO Person CTRP-CTEP Context Management Functionality

Scenario:#1 CTEP Context of a new person record created
    Given I am logged into the CTRP 
    When CTRP receives newly created CTEP person record through Restful Services
    Then a new person record will be created in the CTEP Context with Processing Status of "Incomplete" and Service Request of "Create" in the CTRP 
    And the new person record will display the field type
      
      |CTEP Person ID|
      |CTEP Context Person ID|
      |CTEP Person Registration Type|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Phone|
      |Email|
      |Person Status|
      |Affiliated Organization CTEP ID|
      |Service Request (Create, Update, Merge with CTEP ID, NULL)|
      |Processing Status (Incomplete, Complete)|
      
      And a CTEP Context Person ID will be sent to CTEP
      And the Person Processing status will be " InComplete"
      And the Service Request will be set to "Create"
      
        Scenario:#1a CTEP Person Context Mandatory Fields 
    Given I am logged into the CTRP 
     When CTEP Context of a person record is created
     Then the person record fields type are mandatory

      |CTEP Person ID|
      |CTEP Context Person ID|
      |CTEP Person Registration Type|
      |First Name|
      |Last Name|
      |Person Status|
      |Affiliated Organization CTEP ID|
      |CTEP Service Request (Create, Update, Merge with CTEP ID, NULL)|
      |Processing Status (Incomplete, Complete)|
      

      
Scenario: #2 As a PO Curator, I can search a NEW person record to associate it with a person in the CTRP Context
    Given Given I am logged into the CTRP 
    And I am on the Search Persons Screen
    When I select Processing status as"Incomplete"
    And Service Request as "Create"
    And I select Source context as CTEP
    Then I can view Persons in the CTEP Context with "Processing Status" of "Incomplete" and Service request of "Create"
    When When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context for both "Person Name" and "Phone, email" 
    When the CTEP Person does not match any existing CTRP Context person name and phone, email
    Then the CTRP Person will be created and associated to the CTEP Context with the information type
      
      |CTRP Person ID|
      |CTRP Context Person ID|
      |Prefix|
      |Suffix|
      |First Name|
      |Middle Name|
      |Last Name|
      |Phone|
      |Email|
      |Person Status|
      |Affiliated Organization CTRP ID|
      |Processing Status (Complete)|
      
   And both the CTRP and CTEP context will be linked
    When the CTEP Person does match any existing CTRP Context Person name and Phone, email
    Then Matching CTRP Person will be displayed in a grid with the information type
    |CTRP Person ID|
    |CTEP Person ID|
    |Context person ID|
    |Source ID|
    |Source Context|
    |Source Status|
    |CTEP Person Registration Type|
    |First Name|
    |Middle Name|
    |Last Name|
    |Processing Status|
    |Service Request|
    |Affiliated Orgs|
    |Last Updated Date|
    |Last Updated By|
    |Prefix|
    |Suffix|
    
    And the curator will review the displayed options and select a person to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null
    And the CTEP CTRP association will be complete
    
    
    
    Scenario:#12 CTRP Person Context Mandatory Fields 
    Given I am logged into the CTRP 
     When CTRP Context of a person record is created
     Then the person record fields type are mandatory
     
      |CTRP Person ID|
      |CTRP Context Person ID|
      |CTRP Person Status|
      |First Name|
      |Last Name|
      |Person Status|
      |Affiliated Organization CTRP ID|
      |Processing Status (Incomplete, Complete)|
    
    
    Scenario: #4  CTRP Person information gets updated with the New information received from CTEP
    Given I am on the Search Person Screen
    When CTEP updated Person information is sent to CTRP via Restful service
    Then the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When CTEP updates are new organization address type
    	|Prefix|
        |Suffix|
        |Email|
        |Phone|
        
    And the CTEP Person Status is Active
    Then The CTRP Context fields will be automatically Updated
    And the CTRP Context Processing Status will be Complete
    When the CTEP context update include a New Person Name
    And the CTEP Organization is Active
    Then the CTRP Context field type is not automatically updated
    |Person Name|
    And the CTRP Processing Status will be "pending"
    And The CTRP Curator will be able to identify by searching CTEP Person with Service Request "Update"
    When CTRP Curator will determine the updates for the CTRP Context
    Then the CTRP Processing Status will be "Complete"
     
Scenario:#8 Curator can identify when two Persons are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Persons are to be merged
     And the CTEP person <PersonType> will have PK ID <PKIDType>, CTRP ID <CTRPIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Person status <StatusType>
     
     |PersonType| PKIDType|CTRPIDType|ServiceRequestType |rocessingStatusType |StatusType|
     |Person 1  |PK ID 1  |CTRP ID 1 | Merge ID 2        |Pending             |Active    |
     |Person 2  |PK ID 2  |CTRP ID 2 | Merge ID 1        |Pending             |Inactive  |
     
     Then the curator will search CTEP Context for person where Service request is "Merge ID"
     And the curator will search for matching persons in the CTRP Context
     When Matching CTRP persons found
     Then The CTRP person matching CTEP organization with inactive status will be Nullified
     And  the person <PersonType> will have PK ID <PKIDType>, CTRP ID <CTRPIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Person status <PersonType> 
     
     |PersonType| PKIDType|CTRPIDType|ServiceRequestType |ProcessingStatusType |StatusType|
     |Person 1  |PK ID 1  |CTRP ID 1 | Null              |Complete             |Active    |
     |Person 2  |PK ID 2  |CTRP ID 2 | Null              |Complete             |Inactive  |
     And the curator will select the CTRP person associated with the CTEP Active person to replace the trail associations of the nullified person
     And all references in CTRP to the nullified Person Record will reference the retained Person Record
     And any unique Person Organization Affiliations on the nullified Person Record will be added to the retained Person Record
     
    
    
    