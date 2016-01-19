Feature: Certainly Ignore me
Scenario Outline: Create An Organization
    Given I am logged in as a curator
    And I want to create a new organization
     When I am on the Create Organization screen
     And I enter the organization name as <name>
     And I enter the organization alias as <alias>
     And I choose <click-yes-no> on Add button
     And I enter the organization Address line 1 as <addline1>
     And I enter the organization Address line 2 as <addline2>
     And I enter the organization City as <city>
     And I enter the organization City as <state>
     And I enter the organization Country as <country>
     And I enter the organization zip as <zip>
     And I enter the organization Contact Phone as <phone>
     And I enter the organization Contact fax as <fax>
     And I enter the organization Contact email as <email>
     Then the state of button <button-save> should be <button-save-state>
     And I click on the button-save <button>
     Then the system should display a message of type <messagtype> and text <messagetext>
     

  Example: 

      |name         |alias         |click-yes-no  |addline1               |addline2  |city       |state  |country       |zip    |phone         |fax         |email  |button-save|button-save-state| button |messagetype  |messagetext           |
      |sophia org   |sophia-alias  |yes           |9605 med center drive  |suite 370 |rockville  |MD     |Unite States  |20850  |276-889-7654  |276-889-0867|email  |Save       |Active           |Save    |Success      |org created           |
      |sophia org1  |sophia-alias  |yes           |9605 med center drive  |suite 370 |rockville  |MD     |Unite States  |       |276-889-7654  |276-889-0867|email  |Save      ||Save    |Error        |zip code missing      |
      |sophia org2  |sophia-alias  |yes           |9605 med center drive  |suite 370 |some_city  |Bern   |Germany       |       |276-889-7654  |276-889-0867|email  |||Save    |Success      |organization created  |
      |sophia org3  |sophia-alias  |yes           |9605 med center drive  |suite 370 |some_city  |Bern   |Poland        |20ABC  |276-889-7654  |276-889-0867|email  |||Save    |Success      |organization created  |
      |             |sophia-alias  |yes           |9605 med center drive  |suite 370 |some_city  |Bern   |Poland        |20ABC  |276-889-7654  |276-889-0867|email  |Save|Blocked|NA|NA|NA|
      
