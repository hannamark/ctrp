@Global@PO

Feature: PO F21 PO CTRP-CTEP-NLM Context Management Functionality

Scenario:#1 CTEP Context of a new Organization record can be created in CTRP
    Given CTEP creates a new organization and sends it via RESTful Services to CTRP
    When CTRP receives newly created CTEP Organization record through Restful Services
    Then A CTEP record will be created in CTRP 
    And the newly created Organization in the CTEP Context will display the field types below 
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |CTEP Organization Type|
    |CTEP Organization Status|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal Code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    |Context Organization ID|
    |Service Request (Create)|
    |Processing Status (Incomplete)|
    
    And a CTEP Context Organization ID will be assigned to the CTEP context
    And the assigned CTEP Context Organization ID will be sent to CTEP
    And the Service Request will be set to "Create"
    And the Processing Status Will be set to "Incomplete"
   
    
Scenario: #1a CTEP Context Mandatory Fields
    Given I am logged into the CTRP 
     When A CTEP Context is created in CTRP
     Then the fields type are mandatory
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |City|
    |Country|
    |Context Organization ID|
    |Service Request (Create,Update,Merge with CTEP ID)|
    |Processing Status (Incomplete, Complete)|
    
    
      Scenario:#1b As I Curator, I can use the Clone function available on the CTEP screen 
    Given I am logged into the PO aplication 
    And I am on the CTEP view of an organization
    When the CTEP organization is associated with a CTRP Organization
    And the displayed CTRP Organization ID on the CTEP context screen is not NULL 
 	Then the "Clone" button will be disabled 
    When the CTEP organization is NOT associated with a CTRP Organization
    And the displayed CTRP Organization ID on the CTEP context screen is NULL 
 	Then the "Clone" button will be enabled
    And the Curator can click on the clone button to search all CTRP organizations matching CTEP context
    
   
   Scenario: #2 As a PO Curator, I can search a NEW CTEP Organization to create a CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from Processing Status field
    And I select Source context as CTEP
    And I select "Create" from Service Request field
    Then I can view Organizations in the CTEP Context with Processing Status of "Incomplete" and a Service Request of "Create" 
    And the search results will display the column type
      
      |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Context Organization ID|
      |Name|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Family Name|
      |Phone|
      |Email|
      |Last Updated by|
      |Last Updated Date|
      |City|
      |State|
      |Country|
      |Postal Code|
      
    When I click on the selected CTEP Organization 
    Then the CTEP context fields type will be displayed in a CTEP context screen
   
   	|CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |CTEP Organization Type|
    |CTEP Organization Status|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    |Context Organization ID|
    |Service Request (Create)|
    |Processing Status (Incomplete)|
    
    When the curator clicks on the Clone button
    Then the CTRP system will search Active CTRP Context organizations with  matching "organization Name" and "Organization State and Country" 
    When the CTEP Organization does not match an existing CTRP Context Organization name and Organization State and Country
    Then a new CTRP Organization will be created with the field type 
   
      |CTRP Organization ID|
      |Context Organization ID|
      |Name|
      |Source Context: CTRP|
      |Source ID|
      |Source Status:Active|
      |Processing Status: Complete|
      |Name Alias|
      |address1|
      |address2|
      |country|
      |State|
      |City|
      |Postal Code|
      |Email|
      |Phone Number|
      |Phone Number Extension|
      |Created By|
      |Updated By|
     
    And the Created CTRP Context will be associated with the CTEP Context 
    And the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null 
    And the CTRP Context "Processing Status" will be "Complete" 
    And the both CTEP and CTRP "Source Status" will be "Active"
    And the CTEP Context must be linked to only one CTRP Context
    
 
    
    Scenario: #3 As a PO Curator,I can associate an existing CTRP Organization with the Organization in the CTEP Context
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from "Processing Status" 
    And I select Source context as CTEP
    And I select "Create" from "Service Request"
    Then I can view Organizations in the CTEP Context with Processing Status of "Incomplete" and a Service Request of "Create" 
    When I select a CTEP organization from the search results
    Then the CTEP context fields type will be displayed in the CTEP Context screen
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |CTEP Organization Type|
    |CTEP Organization Status|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    |Context Organization ID|
    |Service Request (Create)|
    |Processing Status (Incomplete)|
    
   	When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context for both "organization Name" and "Organization State and Country" 
    When the CTEP Organization does match any existing CTRP Context Organization name and Organization State and Country
    Then a Warning:"Possible Matching CTRP Organization" will be dispalyed with list displaying CTRP Context ID
    And the curator will review the displayed options and Search CTRP organizations to associate with the CTEP organization
    
    
    Scenario: #4 As a Curator, I can associate a CTRP organization with an Existing CTEP organization
    Given I am a curator 
    And I am on the CTRP PO Application
     When I create an Organization record in CTRP
     Then I can click on the Associate Organization Context Button <Associate Organization Context> 
     Then CTRP will search "ACTIVE" Source Status for matching organization Context type
     	
        |CTEP|
        |NLM|
        
      When any match is found 
      Then the resulted search will display matching records in CTEP and NLM contexts with columns type
   
       |CTRP Organization ID|
       |CTEP Organization ID|
       |Source ID|
       |Context Organization ID|
       |Name|
       |Source Status|
       |Source Context|
       |Processing Status|
       |Service Request|
       |Family Name|
       |Phone|
       |Email|
       |Last Updated By|
       |Last Updated Date|
       |City|
       |State|
       |Country|
       |Postal Code|
     
      And the curator can select the matching CTEP organization to link to CTRP org
      And the curator can select the matching NLM Organization to link to CTRP org
      When the curator clicks on Associate Selection Button <AssociateSelection> to associate selection
      Then the CTRP association is complete
      And the Processing status will be complete for context type
      |CTEP|
      |NLM|
      And the Service Request will be NULL for context type
      |CTEP|
      |NLM|
      And CTRP Organization must be associated to only one CTEP organization
      And CTRP Organization can be associated to more than one NLM context
      And all organization Source Status must be Active
      And Organizations can be associated only from the CTRP context 
      And all Associated Organizations will be displayed under the CTRP organization screen with information type
      
       |CTRP Organization ID|
       |CTEP Organization ID|
       |Source ID|
       |Context Organization ID|
       |Name|
       |Source Status|
       |Source Context|
       |Processing Status|
       |Service Request|
       |Family Name|
       |Phone|
       |Email|
       |Last Updated By|
       |Last Updated Date|
       |City|
       |State|
       |Country|
       |Postal Code|
       |Association Start Date|
       |Association End Date|
      
     And Asscociations History Source Status can be of any status type
     
     |Active|
     |Inactive|
     |Pending|
     |Nullified|
     |Legacy|
     
     And the curator can delete associations (should we provide a reason for deletion?)
     And the CTEP context will be displayed on the same screen in a new tab labeled "CTEP"
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |Context Organization ID|
    |Service Request (NULL)|
    |Processing Status (Complete)|
    |CTEP Organization Type|
    |CTEP Organization Status (Active)|
    |Funding Mechanism|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |Country|
    |State|
    |City|
    |Postal code|
    |Email|
    |Phone|
    
    
    And the NLM context will be displayed on the same screen in a new tab called "NLM" with data type
    
    |CTRP Organization ID|
    |Context Organization ID|
    |Name: Sponsor Name|
    |NLM Organization Status: Active|
    |NLM Service Request: NULL|
    |Processing Status: Complete|
    
    
 
    Scenario: #5  CTRP Organization information gets updated with the New information received from CTEP
    Given I am on the Search Organizations Screen
    When CTEP updated organization information is sent to CTRP via Restful service
    Then the CTEP Service Request will be set to "Update"
    And the CTEP "Processing Status" will be set to "Incomplete"
    Then CTEP Context will be updated automatically with the new information received from the Restful service
    When CTEP updates are new organization address type
    	|Address|
        |Address 2|
        |City|
        |State| 
        |Postal Code|
        |Country|
        |Email|
        |Phone|
        
    And the CTEP Orgnization Status is Active
    Then The CTRP Context fields will be automatically Updated
    And the CTRP Context Processing Status will be Complete
    When the CTEP context update include a New Organization Name
    And the CTEP Organization is Active
    Then the CTRP Context field type is not automatically updated
    |Organization Name|
    And the CTRP Processing Status will be "Incomplete"
    And The CTRP Curator will be able to identify by searching CTEP Organization with Service Request "Update"
    When CTRP Curator will determine the updates for the CTRP Context
    Then the CTRP Processing Status will be "Complete"
    
   
 
   Scenario: #6 As a CTRP PO Curator I can approve or deny a CTRP request for creating a new organization in CTRP
    Given I am logged into the CTRP  
     And I have received a request to create a new organization in CTRP
     When I have searched existing CTRP organizations with a CTRP Context 
     And the requested organization exists in the CTRP Context
    Then I can deny the request 
    When the requested organization does not exist in the CTRP Context
    Then I can create the requested organization in the CTRP Context
    And the CTRP Context Organization Status is "Active"
    And the CTRP Context Processing Status is "Complete"
    And I can send the CTRP Organization context to the CTEP-ECM

    
    Scenario:#7 CTRP links CTEP created organization record based on a new organization created in CTRP
    Given I am logged into the CTRP 
    When CTEP creates an organization based on a new organization created in CTRP
    Then CTEP sends organization records to CTRP via Restful Services
    And the CTEP Organization record includes the CTEP Organization ID and the CTRP Organization ID (PO ID) and other information type
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |Context Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State|
    |Postal Code|
    |Country|
    |Email|
    |Research Phone|
    |Funding Mechanism|
    |Service Request (Null)|
    |Processing Status (Complete)|
    
  Then a CTEP Context for the received organization is created and automatically linked to the CTRP Context
   And CTEP Context Organization ID  will be sent to CTEP

       Scenario: #8 NLM context created in CTRP
    Given I am logged into the CTEP
     When A trial is imported with a Sponsor Name that does not exist in the NLM Context
     Then CTRP creates an NLM Context with an "Incomplete" Processing Status and "Create" Service Request with iformation type
     
     |NLM Context|
     |Name (Sponsor)|
     |NLM Context Organization ID|
     |Service Request (Create)|
     |Processing Status (Incomplete)|

    Scenario:#9 I can search a NLM Organization to be associated with an Organization in the CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Processing status of "Incomplete"
    And I select Source context of "NLM"
    And I select a Service Request of "Create"
    Then I can view Organizations in the NLM Context with Incomplete status with information Type
     
     |NLM Context|
     |Name (Sponsor)|
     |NLM Context Organization ID|
     |Service Request (Create)|
     |Processing Status (Incomplete)|
    
    When the Imported organization does not exist in the CTRP Context
    Then I can create a NEW CTRP Organization with information type
     
     |CTRP Context|
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |Source Status: Active| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State|
     |Postal Code|
     |Country|
     |Email|
     |Phone Number|
     |Phone Number Extension|
     |Aliases|
     |Processing Status (Complete)|
     
    And I can associate the created organization with the NLM Context
    And The NLM "Processing Status" is changed from "Incomplete" to "Complete"
    And The new CTRP Context information is sent to CTEP
    When the Imported Organization exists in CTRP
    Then the curator will search for Matching NLM Name (Sponsor) in the CTRP Context 
    And the curator will review the search results options and select a CTRP organization to associate to the NLM context
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the NLM Processing Status will be changed from "Incomplete" to "Complete"
    And the NLM Service Request will be change from Create to Null
    And the NLM-CTRP association will be complete
    
    
     Scenario:#8 Curator can identify when two organizations are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Organizations are to be merged
     And the CTEP Organizations <OrganizationType> will have CTEP Context Org ID <CTEPContextOrgID>, CTRP Org ID <CTRPOrgIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Organization status <StatusType>
     
     |<OrganizationType>|<CTEPContextOrgID>|<CTRPOrgIDType>    |<ServiceRequestType> |<processingStatusType> |<StatusType>|
     |Organization 1    |PK ID 1  |CTRP ID 1 | Merge ID 2        |Pending              |Active    |
     |Organization 2    |PK ID 2  |CTRP ID 2 | Merge ID 1        |Pending              |Inactive  |
     
     Then the curator will search CTEP Context for organization where Service request is "Merge"
     And the curator will search for matching organizations in the CTRP Context
     When Matching CTRP organizations found
     Then The CTRP organization matching CTEP organization with inactive status will be Nullified
     And  the organizations <OrganizationType> will have PK ID <PKIDType>, CTRP ID <CTRPIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Organization status <StatusType> 
     
     |OrganizationType| PKIDType|CTRPIDType|ServiceRequestType |ProcessingStatusType |StatusType|
     |Organization 1  |PK ID 1  |CTRP ID 1 | Null              |Complete            |Active    |
     |Organization 2  |PK ID 2  |CTRP ID 2 | Null              |Complete             |Inactive  |
     And the curator will select the CTRP organization associated with the CTEP Active organization to replace the trial associations of the nullified organization
     
    
    
   
    
    