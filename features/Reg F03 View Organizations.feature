@Global @Reg
Feature: Reg F03 View Organizations

As a CTRP User, I am able to View Organizations 

    
     Scenario Outline: #1 I am able to View organizations in CTRP
    Given I am logged into the CTRP Registration application
    And the following parameters of an Organization exist:
    |CTRPID |Name|SourceContext|SourceID|SourceStatus|NameAlias|Address1|Address2|Country|State|City|PostalCode|Email|Phone|Fax|Families|
    |9999999|SopNameCancer|CTRP|999999|Active|SopAlias|SopAddress1|SopAddress2|Morocco|Ifrane|SopCity|22306|SopPercukeTrial@pr.com|420-999-8906|420-999-8906|SopFamilies|
    
    And I have completed an organization search 
    When I click on the organization name
    Then I will be able to view Organization details type
    
    
      |CTRPID  |999999  |
      |Name  |SopNameCancer  |
      |SourceContext  |CTRP  |
      |SourceID  |999999  |
      |SourceStatus  |Active  |
      |NameAlias  |SopAlias  |  
      |Address1  |SopAddress1|
      |Address2  |SopAddress2  |
      |Country  |Morocco  |
      |State  |Ifrane  |
      |City  |SopCity  |
      |PostalCode  |22306  |
      |Email  |SopPercukeTrial@pr.com  |
      |Phone  |420-999-8906  |
      |Fax  |420-999-8906  |
      |Families  |SopFamilies  |
      
  And I should not be allowed to edit person parameters
And I should not view, edit or delete comments added by curators
When I click on Family Link
Then I will view family details type

      |Family Name  |
      |Family Status  |
      |Family Type  |
      |Membership Size  |

And I will view Organization details type

      |CTRPID  |
      |CTEPID|
      |Organization Name  |
      |Relationship  |
      |Effective Date  |
      |Expiration Date  |
      

And family detail might include all Organization statuses type

      |Inactive  |
      |Pending  |
      |Nullified  |
      |CTEP flavor of Org  |

And user can click to view details of these Organizations
And Once on Family View page, user can also Search for another Family by going to Search Family

