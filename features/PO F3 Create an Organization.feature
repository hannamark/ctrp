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
      
      |CTRP Organization ID (Grouping ID)|
      |Context Organization ID (Primary Key)|
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
      |Phone Number: Extension|
      |Created By|
      |Updated By|
      
      RESET SCENARIO 
     
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


  Scenario: #5 Duplicate Organization rules in CTRP 
    Given I am logged into CTRP PO application
    And I have selected the Add Organization function
    And I provide the full name of the organization I wish to create
    And the system will search for organization with the same name for active status
    When the entered full name of the organizaton exists in CTRP with an Active Status 
    Then the system should indicate with a warning: "Organization exists in the database. Please verify and create a new Organization record."
    And the curator review the warning and decides to create the Organization record 
    When the Curator saves the added organization parameters
    Then the organization will be created

  
    
     
     
    