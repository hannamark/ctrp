@Global
@PO
Feature: PO F3 Create an Organization

  Scenario: #1 As a Curator, the Add Organization screen will have default values
    Given I am a Curator and on the Add Organization screen
    When I look at the default values
    Then I will see "United States" as the default for Country
    And I will see "Active" as the default for Source Status
    And I will see "CTRP" as the default for Source Context
    And the Processing Status will be set to "Incomplete" (Pending)

  Scenario: #2 As a Curator, I can Create new Organization in CTRP (original)
    Given I am logged in to CTRP PO application
    And I have completed a Search for Organization and a duplicate is not found
    And I know the information for the organization I wish to create
    When I provide the full name <Name> of the organization
    And I can enter name Alias <Name Alias> 
    And I can click on the add button to add the entered Name Alias
    And I provide the address1 <Address1> of the organization
    And I provide the address2 <Address2> of the organization
    And I country selection as defaulted to "United States" 
    And I can change the country selection 
    And I select the state or province of the organization based on the country
    And I provide the city of the organization
    And I provide the Postal Code <Postal Code> of the organization
    And I provide the Phone number of the organization
    And I provide Phone Extension of the provided phone number
    And I provide the email of the organization
    When I click on the save button
    Then a unique CTRP Organization ID <Source ID> will be assigned to the created organization
    And  the system should create an organization record that contains information type
    ------------------Meeting note: CTRP Org PK ID/CTRP ID/Source ID---------------------
      
      |CTRP Organization ID|
      |organization Name|
      |Source Context: CTRP|
      |Source ID|
      |Source Status:Active|
      |Processing Status|
      |Name Alias|
      |address1|
      |address2|
      |country|
      |State or Province|
      |City|
      |Postal Code|
      |Phone Number|
      |Phone Extension|
      |eMail|
      |Processing Status: Incomplete(Pending)|
      |Created By|------
      |Updated By|----
      
        Scenario: #3 Create Organization Mandatory fields
    Given I am a curator
    And I am logged into the CTRP PO application
     When I have not entered a Organization detail <OrgInfo>
     Then The error message <OrgError> will be displayed
     
     |<OrgInfo>  |<OrgError>|
     |Name       |Name is Required|
     |Address1   |Address1 is Required|
     |Country    |Country is Required|
     |City       |City is Required|
     |Postal Code|Postal Code is Required|
    When I provide the country other than the "United States"
    Then Post Code is not required
   
    
      Scenario:#4 Create Organization fields's character Limit 
    Given I can request the creation of a new Organization in CTRP
     When I provide the field name <FieldName>
     Then the entered field name will respect the field character limit <FieldLength>
     
     |FieldName        |FieldLength|
     |Organization Name|254        |
     |Phone Number     |30         |
     |Phone Extension  |30         |
     |Email            |254        |


  Scenario: #5 As any Curator, I can create a new Organization in CTRP (Duplicate Exists)
    Given I am logged in to CTRP PO application
    And I have complete a Search for Organization
    And I have selected the Add Organization function
    And I know the name of the organization I wish to create
    And I provide the full name of the organization I wish to create
    And I select submit 
    And the system will search for organization with the same name for active status
    Then the system should indicate with a warning that the organization is a duplicate name in the same context

  Scenario: #6 As a Curator, I can clear any data I entered
    Given I am logged in to CTRP PO application
    And I am on the create organization feature
    When The organization record is not saved 
    Then I select the reset option on create organization to clear all Organization entered values
    
      Scenario: #7 As a Curator, I can associate a CTRP organization with an Existing CTEP organization
    Given I am a curator 
    And I am on the CTRP PO Application
     When I create an Organization record in CTRP
     Then I can click on the Associate Button <Associate> 
     Then CTRP will search "ACTIVE" Source Status for matching organization with CTEP Context 
     And CTRP will search Name and Alias for matching organization with NLM Context  
      When any match is found 
      Then the resulted search will display the grid below with columns type
      -------------------------------------------------------------------------
      
       |CTRP ID|
       |CTEP ID|
       |NLM Org PK ID|
       |Name|
       |Source Status|
       |Source Context|
       |Source ID|
       |Phone|
       |Email|
       |Last Updated By|
       |Last Updated Date|
       |City|
       |State|
       |Country|
       |Postal Code|
       |Processing Status|
       |Service Request|
       
     Scenario: #7 As a Curator, I can associate a CTRP organization with an Existing CTEP organization
    Given I am a curator 
    And I am on the CTRP PO Application
     When I can click on the Associate Button <Associate> 
     Then CTRP will search "ACTIVE" Source Status for matching organization with CTEP Context 
     When A mactch is found
     Then CTRP is associated to a CTEP context  
   And the CTRP Processing Status will be complete
    And the CTEP Processing status will be complete
    And the CTEP context will be displayed the data type on the same screen in a new tap labeled "CTEP"
    
    |CTEP Context|
    |CTEP Organization ID|
    |CTEP Organization Type|
    |CTEP Organization Status (Active)|
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
    |Service Request (NULL)|
    |Processing Status (Complete)|

    

    Scenario: #7 As a Curator, I can associate a CTRP organization with an Existing NLM organization- Sponsor Name-
    Given I am a curator 
    And I am on the CTRP PO Application
     When I can click on the Associate Button <Associate> 
     Then CTRP will search "ACTIVE" Source Status for matching organization with NLM Context 
     When A mactch is found
     Then CTRP will be associated to a NLM context  
   And the CTRP Processing Status will be complete
    And the NLM Processing status will be complete
    And the NLM context will be displayed the data type on the same screen in a new tap labeled "NLM"
    
    |NLM Org PK ID|
    |Name: Sponsor Name|
    |NLM Organization Status|
    |NLM Service Request|
    |Processing Status|
    
    
