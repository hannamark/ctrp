@Global @Reg
Feature: As a CTRP User, I can Register a Trial's Protocol Identifiers

Scenario: #1 I can enter the different protocol identifiers for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Protocol Identifiers screen
When I have entered the lead organization trial identifier
And I have optionally entered the clinicaltrials.gov trial identifier
And I have optionally entered one or more Other Trial Identifiers
And I have submitted the trial identifier section
Then the Register Trial Protocol Identifiers section will be complete

Scenario: #2 I must enter the lead organization trial identifier
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
and I am on the Register Trial Protocol Identifiers screen
When I have not entered the lead organization trial identifier
and I have optionally entered the clinicaltrials.gov trial identifier
and I have optionally entered one or more Other Trial Identifiers
And I have submitted the trial identifier section
Then the TRegister Trial Protocol Identifiers section will indicate an error "Lead Organization Trial Identifier is Required"
when I click on the Review Trial button
