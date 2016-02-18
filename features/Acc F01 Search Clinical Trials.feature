@Acc @global

Feature: Acc F01 Search Clinical Trials
As a CTRP User, I can search CTRP clinical trial in the CTRP Accrual Application 

  Scenario: #1 I can search for Active CTRP clinical trials   (Active)
    Given I am logged into the CTRP Accrual Application 
    And I can view a list of trials I have accrual access for with information type
      |NCI Trial Identifier  |
      |Official Title  |
      |Current Trial Status  |
      |Trial Type  |
      |Accrual Disease Terminology  |

     When I have entered an NCI Trial Identifier
     And I have entered a ClinicalTrials.gov ID
     And I have entered a Trial's Official Title
     And I have clicked on the Search Trials Button
     Then the searched trial will be displayed 
     When the user does not have accrual access for the searched NCI Trial Identifier 
    Then the message "Nothing found to display" will be displayed 
    And no trials will be listed
    
      Scenario:#2 I can choose Trial information to be displayed on the list of trials
    Given I am on the Trial Search screen
     When I have clicked on the Choose column drop down button on the Search field
     Then A drop down list of Trial Information type displays
     
      |NCI Trial Identifier  |
      |Official Title  |
      |Current Trial Status  |
      |Trial Type  |
      |Accrual Disease Terminology  |

     
     When I can check a trial information box
     Then the checked trial information will be displayed as a column on the list of trials table
     When I don't check a box
     Then the trial information column won't be displayed on the trial list

      

    Scenario: #3 I can view study subjects
      Given I am on the Trial Search screen 
      And I can view a list of Trials
     When I have clicked on the NCI Trial Identifier of the selected trial
     Then the trial details type will be displayed at the top of the screen
     
      |NCI Trial Identifier: Title  |
      |Lead Organization Trial ID: 9672 |
      |Principal Investigator: George,Suzanne  |
      |Lead Organization: Dane-Farber Cancer Institute  |

   And  the Search Study Subject screen will be displayed with data type
     
        
      |Study Subject ID  |
      |Participating Site  |
      |Study Subject Birth Date (MM/YYYY)  |
 
     And the list of Study Subjects will be displayed with the data type
     
     
      |Study Subject ID  |
      |Registration Date  |
      |Participating Site  |
      |Last Update Date/Time  |
      |Actions  |
  
    Scenario: #4 I can search study subject 
    Given I am on the Search Study Subject Screen
    And I can see the list of study subject section
    And I can search study subjects using <dataType>
       
      |Study Subject ID  | 
      |Registration Date  |
      |Participating Site  |
      |Last Update Date/Time  |

     When I enter a <dataType> 
     Then The exact data type information will be displayed on the list of Study Subject

 
   
   
  Scenario:#5 I Can search a Study Subject
    Given I am on the Search Study Subject Screen
     And I have entered a Study Subject ID
     And I have selected a Participating Site
     And I have entered a Study Subject Birth Date
     When I have clicked on the search Button
     Then the study Suject will be displayed
     
       Scenario:#6 I can Add New Study Subject 
    Given I am on the Search Study Subject Screen
     When I click on the Add New Study Subject Button
     Then The Add Study Subject screen will be displayed
     And I have entered a Study Subject ID
     And I have entered a Study Subject Birth Date(MM/YYYY)
     And I have selected a Study Subject Gender Type
     
      |Male  |
      |Female  |
      |Unspecified  |
      |Unknown  |

     And I have selected a Study Subject Race Type
     
     
      |American Indian or Alaska Native  |
      |Asian  |
      |Black or African American  |
      |Native Hawaiian or Other Pacific Islander  |
      |Not Reported  |
      |Unknown  |
      |White  |

    And I can select more than one Study Subject race "To select multiple races, select one race, and then press and hold the CTRL key as you select the other(s)"
    And I have selected Study Subject Ethnicity type
    
      |Hispanic or Latino  |
      |Not Hispanic or Latino  |
      |Not Reported  |
      |Unknown  |
    And I have selected a Study Suject Country
    And I entered a Study Subject Zip Code
    And I have entered a Registration Date
    And I have selected a Study Subject method of payment Type
    
      |Private Insurance  |
      |Medicare  |
      |Medicare and Private Insurance  |
      |Medicaid  |
      |Medicaid and Private Insurance  |
      |Military or Veterans Sponsored, NOS  |
      |Military Sponsored(Including CHAMPUS & TRICARE)  |
      |Veterans Sponsored  |
      |Self-Pay (No Insurance)  |
      |No Means of Payment (No Insurance)  |
      |Managed Care  |
      |State Supplemental Health Insurance  |
      |Other  |
      |Unknown  |
   And I can Look up a Disease
   And I can select a Participating Site
   When I have clicked on the save button
   Then the new study subject will be added to the study
   When I have clicked on the Cancel button
   then the new study subject will not be added to the study
   
   
     Scenario:#7 Look Up Disease Function
    Given I am on the Add Study Subject Screen
     When I have clicked on the Look Up button to select a Disease
     Then the Search Disease sceen will be displayed
     And I can enter Disease Name
     And I can enter Disease Code
     And the Disease Code System Type will be populated 
     And the Disease Code Sytem type can't be changed
     When I have clicked on the search button
     Then a list of Diseases information type will be displayed 
     
      |Name  |
      |Code  |
      |System  |
      |Menu Display Name  |
      |Select  |
    
     When I enter a disease name in the search box provided
     Then a filtered list will display the entered disease name
     When I select a disease name 
     Then the disease name will be populated in the Disease field
     
     
       Scenario:#8 Search Disease Mandatory Fields
    Given I am on the Search Disease Screen
     When I have not entered a Disease Name
     And I have not entered a Disease code
     Then the error "Please enter a name or code to search" will be displayed
     
    Scenario:#9 Add Study Subject Mandatory fields
    Given I am on the Add Study Subject Screen
     When I have not entered the "AddStudySubjectType"
     Then The "AddStudySubjectErrorType" will be displayed
     
      |<AddStudySubjectType>              |<AddStudySubjectErrorType>  |
      |Study Subject ID                   |Study Subject is required   |
      |Study Subject Birth date(MM/YYYY)  |Birth Date is required  |
      |Study Subject Gender               |Gender is required  |
      |Study Subject Race                 |Race is required  |
      |Study Subject Ethnicity            |Ethnicity is required  |
      |Study Subject Country              |Study Subject Country is required 
      |Registration date                  |Registration Date is required  |
      |Disease                            |Disease is required  |
      |Participating Site                 |Participating Site is required  |
     When the Subject Country is "United States"
     Then I must enter a Study Subject Zip Code
    
    Scenario: #10 I can view a Study Subject information details
  	Given I am on the search study subject screen
     When I have clicked on a study subject 
     Then the view study subject screen will be display with the information type
     

      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Disease  |
      |Participating Site  |
      |User who created  |
      |Last Updated Date/Time  |

   And I can click on the Edit Button to update the Study Subject information 
   And I can click on the Back button to go back to the Search Study Subject Screen
   
   
     Scenario:#11 I can Update Study Subject Information
    Given I am on the Search Study Subject screen
    And I can view a list of study Subjects
     When I have clicked on the edit icon on the actions column for the selected study subject
     Then the Update Study Subject screen open
     And I can update Study Subject data type
      |Study Subject ID  |
      |Study Subject Birth Date(MM/YYYY)  |
      |Study Subject Gender  |
      |Study Subject Race  |
      |Study Subject Ethnicity  |
      |Study Subject Country  |
      |Study Subject Zip Code  |
      |Registration Date  |
      |Study Subject method of Payment  |
      |Disease  |
      |Participating Site  |
     When I have clicked on the save button
     Then all the updated are saved 
     And the "message:Record Updated" will be displayed
     When I have clicked on the cancel button
     Then the study subject last saved date won't be updated 
     And the search Study Subject screen will be displayed

  Scenario: #12 I can delete Study Subject Information
    Given I am on the Search Study Subject screen
    And I can view a list of study Subjects
     When I have clicked on the delete icon on the actions column for the selected study subject
     Then The subject Delete Reason screen will be displayed
     And I must select a reason type
     
      |Enrolled in Incorrect Study  |
      |Other Administrative Error  |

    When I have clicked on the OK Button
    Then the study subject is deleted
    And the "Message: Record Deleted" will be displayed
    When I have clicked on the Cancel Button
    Then the study subject won't be deleted