@Global@PO

Feature: PO F22 PO Person CTRP-CTEP Context Management Functionality

Scenario:#1 CTEP Context of a new person record created
    Given I am logged into the CTRP 
    When CTRP receives newly created CTEP person record through Restful Services
    Then a new person record will be created in the CTEP Context 
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
      |Service Request (Create)
      |Processing Status (Incomplete)|
      
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
      |CTEP Service Request|
      |Processing Status|
      
      
       Scenario:#1b As I Curator, I can use the Clone function available on the CTEP screen 
    Given I am logged into the PO aplication 
    And I am on the CTEP view of a person
    When the CTEP persos is associated with a person in the CTRP context 
    And the displayed CTRP Person IDon the CTEP context screen is not NULL 
 	Then the "Clone" button will be disabled 
    When the CTEP person is not associated with a person in the CTRP context 
    And the displayed CTRP Person ID  on the CTEP context screen is NULL  
 	Then the "Clone" button will be enabled
    And the Curator can click on the clone button to search all CTRP persons matching CTEP context 
        

      
Scenario: #2 As a PO Curator, I can search a NEW person record to associate it with a person in the CTRP Context
    Given Given I am logged into the CTRP 
    And I am on the Search Persons Screen
    When I select Processing status as"Incomplete"
    And Service Request as "Create"
    And I select Source context as CTEP
    Then I can view Persons in the CTEP Context with "Processing Status" of "Incomplete" and Service request of "Create"
    When When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context for both "Person Name" and "Phone, email", and Person Affiliation Address
    When the CTEP Person does not match any existing CTRP Context person name and phone, email, and Affiliation Address
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
      |Source Context|
      |Source Status: Active|
      |Source ID|
      |Affiliated Organization CTRP ID|
      |Processing Status (Complete)|
      
   And both the CTRP and CTEP context will be linked
    When the CTEP Person does match any existing CTRP Context Person name and Phone, email, person Affiliation Address
    Then a warning will be displayed: "Possible Matching CTRP Persons"
    And A list of CTRP Context Person ID will be displayed to show matching person ID
    And the curator will search matching ID provided in the CTRP context
    And the curator will review the displayed options and select a person to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null
    And the CTEP CTRP association will be complete
    And both contexts will be displayed in different tabs on the same screen
    And the will be added to the person associations on the CTRP Context screen
    
    
    Scenario:#3 CTRP Person Context Mandatory Fields 
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
      |Processing Status |
    
    
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
     

     Scenario:#5 Curator can identify when two persons are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Persons are to be merged
     And the CTEP Person <PersonName> will have CTEP Context Person ID <CTEPContextPersonID>, CTRP Org ID <CTRPPersonIDType>, Service request <CTEPServiceRequestType>, processing status <CTEPProcessingStatusType>, and Person status <CTEPStatusType>
     
     |<PersonName>                         |<CTEPContextPersonID>     |<CTRPPersonIDType>    |<CTEPServiceRequestType> |<CTEPprocessingStatusType> |<CTEPStatusType>|
     |Daniel Evan                          |AB123                     |2026171               |Merge ID AB123            |Incomplete                 |Active          |         
     |Daniel Epner Evan                    |33303                     |28417522              |Merge ID 33303            |Incomplete                 |Inactive        |        
      
     Then the curator will search CTEP Context for Person where Service request is "Merge with CTEP ID"
     And the curator will search for matching persons in the CTRP Context
     When Matching CTRP perons found
     Then The CTRP persons matching CTEP persons with inactive status will be Nullified
    And the CTEP Person <PersonName> will have CTEP Context Person ID <CTEPContextPersonID>, CTRP Org ID <CTRPPersonIDType>, Service request <CTEPServiceRequestType>, processing status <CTEPProcessingStatusType>, and Person status <CTEPStatusType> and CTRP Person Status<CTRPPersonStatus>  
     
     |<PersonName>                         |<CTEPContextPersonID>     |<CTRPPersonIDType>    |<CTEPServiceRequestType> |<CTEPprocessingStatusType>  |<CTEPStatusType>|<CTRPStatusType>|
     |Daniel Evan                          |AB123                     |2026171               |Merge ID AB123            |Incomplete                 |Active          | Active|        
     |Daniel Epner Evan                    |33303                     |28417522              |Merge ID 33303            |Incomplete                 |Inactive        | Nullified|       
      
    
     And the curator will select the CTRP person associated with the CTEP Active person to replace the trial associations of the nullified person
     
    
    
    
    