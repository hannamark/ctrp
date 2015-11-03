@PA @global
Feature: PAA F08 Add and Edit Trial Participating Sites

As any CTRP PA User, I can add and edit Trial Participating Sites

Scenario Outline: #1 I can add one or more a participating sites for a trial 
Given I am on the Participating Site Page
And I have selected an organization <organization name> with the Organization look up
And I have entered or edited the Local Trial Identifier <Local Trial Identifier >
And I have selected the Site Recruitment Status <Site Recruitment Status> 
And I have selected the Site Recruitment status date <Site Recruitment Status Date>
And I have entered Site Recruitment status comments <Site Recruitment status comments>
And I have entered the program code <Site Specific Program Code>
And I have entered a Target Accrual Number < Target Accrual Number>
And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
And I have selected the role for each investigator <Site Principal Investigator Role>
|Principal Investigator|
|Sub Investigator|
And I have selected the “use Investigator contact information” if the investigator is the Participating site contact
And I have selected a central contact <Central Contact> is the contact for the participating site is a generic using the generic contact look up  
And I have added or edited the contact phone number for the contact <Phone #>
And I have added or edited the contact e-mail for the contact <e-mail address>
Then the participating site information will be associated with the trial
And the organization address information <Org City> <Org State> <Org Country><Org zip code> will be associated with the trial 
And the system will display the list of participating sites ordered assending alphanumeric by participationg site name


Scenario Outline: #2 I can edit a participating site for a trial 
Given I am on the Participating Site Page
And I have selected the Participating site <organization name> 
And I have entered or edited the Local Trial Identifier <Local Trial Identifier >
And I have selected the Site Recruitment Status <Site Recruitment Status> 
And I have selected the Site Recruitment status date <Site Recruitment Status Date>
And I have entered Site Recruitment status comments <Site Recruitment status comments>
And I have entered or edited the program code <Site Specific Program Code>
And I have entered or edited the Target Accrual Number < Target Accrual Number>
And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
And I have selected the role for each investigator <Site Principal Investigator Role>
|Principal Investigator|
|Sub Investigator|
And I have selected the “use Investigator contact information” if the investigator is the Participating site contact
And I have selected a central contact <Central Contact> is the contact for the participating site is a generic using the generic contact look up  
And I have added or edited the contact phone number for the contact <Phone #>
And I have added or edited the contact e-mail for the contact <e-mail address>
Then the participating site information will be associated with the trial
And the organization address information <Org City> <Org State> <Org Country><Org zip code> will be associated with the trial 
And the system will display the list of participating sites ordered assending alphanumeric by participationg site name

Scenario: #3 Delete participating site information for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
And I select one or more participating site
When select delete participationg sites
Then the Participating Site will be removed from the trial record

Scenario: #4 Save participating site information for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
When select save participating sites 
Then the information entered or edited on the Participating Site screen will be saved to the trial record

Scenario: #5 Cancel participating site information for a trial 
Given I am logged into the CTRP Protocol Abstraction application
And I am on the Participating Site Page
When select Cancel participating sites
Then the information entered or edited on the Participating Site screen will not be saved to the trial record 
And the screen will be refreshed with the existing data

Scenario Outline: #6 Warning messages for participating sites for a trial 
Given I am on the Participating Site Page
And I have selected the Participating site <organization name> 
And I have entered or edited the Local Trial Identifier <Local Trial Identifier >
And I have selected the Site Recruitment Status <Site Recruitment Status> 
And I have selected the Site Recruitment status date <Site Recruitment Status Date>
And I have entered Site Recruitment status comments <Site Recruitment status comments>
And I have entered or edited the program code <Site Specific Program Code>
And I have entered or edited the Target Accrual Number < Target Accrual Number>
And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
And I have selected the role for each investigator <Site Principal Investigator Role>
|Principal Investigator|
|Sub Investigator|
And I have selected the “use Investigator contact information” if the investigator is the Participating site contact
And I have selected a central contact <Central Contact> is the contact for the participating site is a generic using the generic contact look up  
And I have added or edited the contact phone number for the contact <Phone #>
And I have added or edited the contact e-mail for the contact <e-mail address>
Then the participating site information will be associated with the trial
And the organization address information <Org City> <Org State> <Org Country><Org zip code> will be associated with the trial 
And the system will display the list of participating sites ordered assending alphanumeric by participationg site name 
Examples:
|Organization name ||Org City||Org State||Org Country||Org zip code|| Local Trial Identifier ||Site Recruitment Status||Site Recruitment Status Date||Site Recruitment status comments||Site Specific Program Code|| Target Accrual Number||Site Principal Investigator||Site Principal Investigator Role||Central Contact      ||Phone #       ||e-mail address||Message|
|Mayo              ||New York||NY       ||USA        ||10101       || 123                    ||Approved               ||30-Sep-2015                 ||Free Text                       ||48                        || 100                  ||Jane Doe                   ||Principal Investigator          ||Jane Doe             ||212-123-4567  ||jane@mayo.com ||Participating Site Has been Updated|
|Wake Forest       ||<null>  ||NY       ||USA        ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||Principal Investigator          ||<null>               ||212-123-4567  ||<null>        ||Address Information is Missing|
|Wake Forest       ||New York||<null>   ||USA        ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||Principal Investigator          ||<null>               ||212-123-4567  ||<null>        ||Address Information is Missing|
|Wake Forest       ||New York||NY       ||<null>     ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||Principal Investigator          ||<null>               ||212-123-4567  ||<null>        ||Address Information is Missing|
|Wake Forest       ||New York||NY       ||USA        ||<null>      || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||Principal Investigator          ||<null>               ||212-123-4567  ||<null>        ||Address Information is Missing|
|Wake Forest       ||New York||NY       ||USA        ||10101       || <null>                 ||<null>                 ||30-Sep-2015                 ||comments                        ||abc123                    || 48                   ||Sam Smith                  ||Sub Investigator                ||Sam Smith            ||<null>        ||sam@WF.com    ||Participating Site Status Missing|
|MDA               ||New York||NY       ||USA        ||10101       || <null>                 ||approved               ||<null>                      ||comments                        ||123abc                    || 25                   ||john Smith                 ||Principal Investigator          ||Clinical Trial Center||1-888-123-4567||CTC@mda.com   ||Participationg site status Date is Missing|
|Wake Forest       ||New York||NY       ||USA        ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||<null>                          ||<null>               ||212-123-4567  ||<null>        ||Investigator Role has not been added|
|Wake Forest       ||New York||NY       ||USA        ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||<null>                     ||Principal Investigator          ||<null>               ||212-123-4567  ||<null>        ||Investigator has not been added|
|Wake Forest       ||New York||NY       ||USA        ||10101       || 123                    ||approved               ||30-Sep-2015                 ||<null>                          ||<null>                    || 37                   ||John Doe                   ||Principal Investigator          ||<null>               ||<null>        ||<null>        ||Contact Phone number or E-mail address has not been added|
