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
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    |Context Organization ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,NULL)|
    |Processing Status (Incomplete, Complete)|
    
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
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,NULL)|
    |Processing Status (Incomplete, Complete)|
     

Scenario: #2 As a PO Curator, I can search a NEW CTEP Organization to create a CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from "Processing Status" 
    And I select Source context as CTEP
    And I select "Create" from "Service Request"
    Then I can view Organizations in the CTEP Context with "Processing Status" of "Incomplete" and a "Service Request" of "Create" 
    And the search results will display the column type
      |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Context Organization ID|
      |Name|
      |CTEP Org Type|
      |Funding Mechanism|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Families|
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
    |CTEP Organization Status (Active, Inactive, Legacy)|
    |Name|
    |Address|
    |Address2|
    |Address3|
    |City|
    |State_province|
    |Postal_code|
    |Country|
    |Email|
    |Phone|
    |Funding Mechanism|
    |Context Organization ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,NULL)|
    |Processing Status (Incomplete, Complete)|
    
    
 	When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context with both "organization Name" and "Organization State and Country" 
    And the CTEP Organization does not match an existing CTRP Context Organization name and Organization State and Country
    Then the CTEP Organization information will be copied into a new CTRP Organization with the field type 
   
    
     |CTRP Context|
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Email|
     |Phone|
     |Aliases|
     |Processing Status (Incomplete, Complete)|
     
    And the Created CTRP Context will be associated with the CTEP Context 
    And the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null 
    And the CTRP Context "Processing Status" will be "incomplete" until reviewed by curator
    And the both CTEP and CTRP "Source Status" will be "Active"
    And the CTEP Context must be linked to only one CTRP Context
    
    
   
    Scenario:#2a CTRP Context Mandatory Fields
    Given I am logged into the CTRP 
     When A CTRP Context is created
     Then the fields type are mandatory 
     
    |CTRP Context|
    |CTRP Organization ID|
    |Context Organization ID|
    |CTRP Organization Status|
    |Name|
    |Address|
    |City|
    |Country|
    |Processing Status (Incomplete, Complete)|

    
    Scenario: #3 As a PO Curator,I can associate an existing CTRP Organization with the Organization in the CTEP Context
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select"Incomplete" from "Processing Status" 
    And I select Source context as CTEP
    And I select "Create" from "Service Request"
    Then I can view Organizations in the CTEP Context with "Processing Status" of "Incomplete" and a "Service Request" of "Create" 
    And the CTEP context fields type will be displayed in the CTEP Context screen
    
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
    |CTEP Org PK ID|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,NULL)|
    |Processing Status (Incomplete, Complete)|
    
    When the Curator clicks on the "Clone" button
    Then the CTRP system will search Active CTRP Context for both "organization Name" and "Organization State and Country" 
    When the CTEP Organization does match any existing CTRP Context Organization name and Organization State and Country
    Then Matching CTRP organizaiton will be displayed in a grid with the information type
    |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Context Organization ID|
      |Name|
      |CTEP Org Type|
      |Funding Mechanism|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Families|
      |Phone|
      |Email|
      |Last Updated by|
      |Last Updated Date|
      |City|
      |State|
      |Country|
      |Postal Code|
    And the curator will review the displayed options and select an organization to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the CTEP Processing Status will be changed from "Incomplete" to "Complete"
    And the CTEP Service Request will be change from Create to Null
    And the CTRP Processing status will be complete
    And every CTRP Organization can be associated with only one Organization in the CTEP Context
 
    
    Scenario: #4  CTRP Organization information gets updated with the New information received from CTEP
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
    
   
 
   Scenario: #5 As a CTRP PO Curator I can approve or deny a CTRP request for creating a new organization in CTRP
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

    
    Scenario:#6 CTRP links CTEP created organization record based on a new organization created in CTRP
    Given I am logged into the CTRP 
    When CTEP creates an organization based on a new organization created in CTRP
    Then CTEP sends organization records to CTRP via Restful Services
    And the CTEP Organization record includes the CTEP Organization ID and the CTRP Organization ID (PO ID) and other information type
    
    |CTEP Context|
    |CTRP Organization ID|
    |Source ID|
    |Context Organization ID|
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
    |Email|
    |Research Phone|
    |Funding Mechanism|
    |Service Request (Create,Update,Merge with CTEP ID,Link with CTRP ID,NULL)|
    |Processing Status (Pending, Complete)|
    
  Then a CTEP Context for the received organization is created and automatically linked to the CTRP Context
   And CTEP Context Organization ID  will be sent to CTEP

       Scenario: #6' NLM context created in CTRP
    Given I am logged into the CTEP
     When A trial is imported with a Sponsor Name that does not exist in the NLM Context
     Then CTRP creates an NLM Context with an Incomplete Processing Status and Create Service Request


    Scenario:#7 I can search a NLM Organization associated with an Organization in the CTRP Context 
    Given I am logged into the CTRP 
    And I am on the Search Organizations Screen
    When I select Source status as pending
    And I select Source context as NLM
    Then I can view Organizations in the NLM Context with Incomplete status with information Type
     
     |NLM Context|
     |Name (Sponsor)|
     |NLM Context Organization ID|
     |Service Request (Create)|
     |Processing Status (Incomplete, Complete)|
    
    When the Imported organization does not exist in the CTRP Context
    Then I can create a NEW CTRP Organization with information type
     
     |CTRP Context|
     |CTRP Organization ID|
     |Context Organization ID|
     |Source ID|
     |CTRP Organization Status| 
     |Name|
     |Address|
     |Address2|
     |City|
     |State_province|
     |Postal_code|
     |Country|
     |Email|
     |Phone|
     |Aliases|
     |Processing Status (Complete)|
     
    And I can associate the created organization with the NLM Context
    And The NLM "Processing Status" is changed from "Incomplete" to "Complete"
    And The new CTRP Context information is sent to CTEP
    When the Imported Organization exists in CTRP
    Then Then Matching CTRP organization will be displayed in a grid with the information type
    |CTRP ID|
      |CTEP ID|
      |Source ID|
      |Context Organization ID|
      |Name|
      |CTEP Org Type|
      |Funding Mechanism|
      |Source Status|
      |Source Context|
      |Processing Status|
      |Service Request|
      |Families|
      |Phone|
      |Email|
      |Last Updated by|
      |Last Updated Date|
      |City|
      |State|
      |Country|
      |Postal Code|
    And the curator will review the displayed options and select an organization to associate
    And the curator will click on the Associate Selection Button
    And both contexts will be associated 
	Then the NLM Processing Status will be changed from "Incomplete" to "Complete"
    And the NLM Service Request will be change from Create to Null
    And the NLM CTRP association will be complete
    
    
     Scenario:#8 Curator can identify when two organizations are to be merged 
    Given I am logged into the CTRP 
     When CTEP Indicates via REST Service that two Organizations are to be merged
     And the CTEP Organizations <OrganizationType> will have PK ID <PKIDType>, CTRP ID <CTRPIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Organization status <StatusType>
     
     |OrganizationType| PKIDType|CTRPIDType|ServiceRequestType |processingStatusType |StatusType|
     |Organization 1  |PK ID 1  |CTRP ID 1 | Merge ID 2        |Pending             |Active    |
     |Organization 2  |PK ID 2  |CTRP ID 2 | Merge ID 1        |Pending             |Inactive  |
     
     Then the curator will search CTEP Context for organization where Service request is "Merge"
     And the curator will search for matching organizations in the CTRP Context
     When Matching CTRP organizations found
     Then The CTRP organization matching CTEP organization with inactive status will be Nullified
     And  the organizations <OrganizationType> will have PK ID <PKIDType>, CTRP ID <CTRPIDType>, Service request <ServiceRequestType>, processing status <ProcessingStatusType>, and Organization status <StatusType> 
     
     |OrganizationType| PKIDType|CTRPIDType|ServiceRequestType |ProcessingStatusType |StatusType|
     |Organization 1  |PK ID 1  |CTRP ID 1 | Null              |Complete            |Active    |
     |Organization 2  |PK ID 2  |CTRP ID 2 | Null              |Complete             |Inactive  |
     And the curator will select the CTRP organization associated with the CTEP Active organization to replace the trial associations of the nullified organization
     
    
    
    Scenario:#10 CTEP Context of a new person record created
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
      
        Scenario:#10a CTEP Person Context Mandatory Fields 
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
      

      
Scenario: #11 As a PO Curator, I can search a NEW person record to associate it with a person in the CTRP Context
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
     
      
     Scenario: #13 Rules for CTRP Organization Status based on CTEP Organization Status
    Given I am logged into the CTRP 
     When the Organization CTEP context status is Active
     Then the Organization CTRP context status must be active  
     When the Organization CTEP context status is Inactive
     Then the CTRP context can be Inactive OR Nullified
     


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
     
    
    
    