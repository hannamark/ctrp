@Global
@PO
Feature: PO F3 Create an Organization

  Scenario: #1 As a Curator, the Add Organization screen will have default values
    Given I am a Curator and on the Add Organization screen
    When I look at the default values
    Then I will see "United States" as the default for Country
    And I will see "Active" as the default for Source Status
    And I will see "CTRP" as the default for Source Context
    And the Processing Status will be set to "Complete" 
     
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
    And I select the state or province of the organization <state> based on the country
    And I provide the city <city> of the organization
    And I provide the Postal Code <Postal Code> of the organization
    And I provide the Phone number of the organization <phone Number>
    And I provide Phone Extension of the provided phone number <Phone Number Extension>
    And I provide the email of the organization <email>
    When I click on the save button
    Then a unique CTRP Organization ID <Source ID> will be assigned to the created organization
    And a unique CTRP Context Organization ID <ContextOrgID> will be assigned to the created organization
    And a CTRP organization record that contains information type will be created
      
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
      
      When I select Reset 
     Then the information entered on the Add Organization screen fields will not be saved to the trial record 
      And the Add Organization information screen will be refreshed and blank
     
     
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
    Then Postal Code is not required
    
   
   
    Scenario:#4 Create Organization fields's character Limit 
    Given I am logged in to the PO Application
    And I am on the Add Organization Screen
     Then a comment appears below the field <Field> to display the number of characters available <Number of Characters left> to enter into the field
     | Field                | Number of Characters left  |
     |Organization Name     |254        |
     |Phone Number          |30         |
     |Phone Extension       |30         |
     |Email                 |254        |
	 And "x characters left" will be displayed as characters are added
 	 When all the characters <Number of Characters left> mentioned above for field have been entered
  	Then no additional text can be entered


  Scenario: #5 As any Curator, I can NOT create a duplicate Organization in CTRP 
    Given I am logged into CTRP PO application
    And I have selected the Add Organization function
    And I provide the full name of the organization I wish to create
    And the entered full name of the organizaton exists in CTRP with an Active Status
    When I select submit 
    And the system will search for organization with the same name for active status
    Then the system should indicate with a warning that the organization is a duplicate name in the same context
    And a duplicate Organization record should not be created

  
     Scenario:#6 As a Curator, I can Edit created Organization
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
     When I select Reset 
     Then the information entered or edited on the Add Organization screen fields will not be saved to the trial record 
      And the Add Organization information screen will be refreshed with the existing data
     
    Scenario: #7 As a Curator, I can associate a CTRP organization with an Existing CTEP organization
    Given I am a curator 
    And I am on the CTRP PO Application
     When I create an Organization record in CTRP
     Then I can click on the Associate Organization Context Button <Associate Organization Context> 
     Then CTRP will search "ACTIVE" Source Status for matching organization Context type
     	
        |CTEP|
        |NLM|
        
      When any match is found 
      Then the resulted search will display matching records in CTEP and NLM with columns type
   
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
      
     And Asscociation History Source Status can be of any status type
     
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
    
   
      
    
