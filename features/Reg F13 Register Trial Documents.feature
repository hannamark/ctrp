@Global @Reg
Feature: Reg F13 Register Trial Documents

As a CTRP User, I can attach various documents to a trial registration
  @runthis
  Scenario Outline: #1 I can attach Trial Related Documents to a trial registration
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Related Documents screen
    When I have selected a file to attach as the Protocol Document
    And I have selected a file to attach as the IRB Approval
    And I have selected a file to attach as the list of Participating Sites
    And I have selected a file to attach as the Informed Consent Document
    And I have selected one or more files to attach as Other file and entered the description of the file
    Then the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review

      Examples:
        |TrialType                |
        |National                 |
        |Externally Peer-Reviewed |
        |Institutional            |

  Scenario Outline:#2 I must enter the Protocol Document and the IRB Approval
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Related Documents screen
    When I have not attached a file as the Protocol Document
    And I have not attached a file as the IRB Approval 
    And I click on the Review Trial button
    Then Trial Related Documents section will indicate an error 
    
        |Protocol Document is required  |
        |IRB Approval is required       |

    
      Examples:
        |TrialType                |
        |National                 |
        |Externally Peer-Reviewed |
        |Institutional            |
 
  Scenario Outline:#3 Informed consent rules
    Given I have selected the option to register a trial <TrialType>
    And I am on the Register Trial Related Documents screen
    When And I have indicated if the Informed Consent is included with the Protocol Document as Yes or No
    And I must have selected a file to attach as the Informed Consent Document if Interventional and Informed Consent not included in Protocol Document)
    Then the Trial Related Documents section will not indicate any errors during Trial Review

      Examples:
        |TrialType                |
        |National                 |
        |Externally Peer-Reviewed |
        |Institutional            |


  Scenario Outline: #4 I can only attach documents with permitted document types
    Given I am on the Register Trial Related Documents screen
    When I have selected a file to attach <FileType> as a trial document
    Then The Trial Related Documents section will not indicate any errors during Trial Review

      Examples:
        |FileType |
        |pdf      |
        |zip      |
        |xls      |
        |xlsx     |
        |csv      |
        |doc      |
        |docx     |





