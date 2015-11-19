@Global @Reg
Feature: Reg F05 Register Trial Protocol Identifiers

As a CTRP User, I can Register a Trial's Protocol Identifiers

Scenario: Registering a trial Lead Organization Protocol Identifier
When registering a National, Externally Peer-Reviewed, or Institutional Trial
Then the Lead Organization Trial Identifer is required

Scenario: Registering other trial Identifiers
When registering a National, Externally Peer-Reviewed, or Institutional Trial
Then the ClinicalTrials.gov identifier can be optionally registered
And Other Trial Identifiers can be optionally registered


