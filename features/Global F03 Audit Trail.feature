@Global
Feature: Global F03 Audit Trail

As a CTRP User, when I add or update a record in CTRP, an Audit trial will be created for the record with my name and the date and time

Scenario: #1 I can create or update a record in CTRP and an Audit Trial will be generated
Given I am on a CTRP data entry screen
When I create or update a record
Then in addition to the data I entered and audit trial with my name, the date and time will be recorded in CTRP


