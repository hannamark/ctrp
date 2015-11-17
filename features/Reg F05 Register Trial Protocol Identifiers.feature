@Global @Reg
Feature: Reg F05 Register Trial Protocol Identifiers

As a CTRP User, I can Register a Trial's Protocol Identifiers

Scenario: #1a I can enter the different protocol identifiers for a trial
Given I am registering a National, Externally Peer-Reviewed, or Institutional trial
When I have entered the lead organization trial identifier
Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

Scenario: #1b I can enter the different protocol identifiers for a trial
Given I am registering a National, Externally Peer-Reviewed, or Institutional trial
When I have entered the lead organization trial identifier
And I have entered an Other Trial Identifier and identified the Other Trial Identifier Type
Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

Scenario: #1c I can enter the different protocol identifiers for a trial
Given I am registering a National, Externally Peer-Reviewed, or Institutional trial
When I have entered the lead organization trial identifier
And I have entered more than one Other Trial Identifiers and identified the Other Trial Identifier Types
Then the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review

Scenario: #2 I must enter the lead organization trial identifier
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
and I am on the Register Trial Protocol Identifiers screen
When I have not entered the lead organization trial identifier
and I have optionally entered one or more Other Trial Identifiers and the Other Trial Identifier Type
When I click on the Review Trial button Then the TRegister Trial Protocol Identifiers section will indicate an error "Lead Organization Trial Identifier is Required"

