@Global @test
Feature: Test search for persons

@runthis
Scenario: #1 As CTRP User, I am able to search for persons by first name
  Given the user login to the ctrp application
  And step definition test 1st attempt

@runthis
Scenario: #2 As CTRP User, I am able to look for persons by first name
  Given the user login to the ctrp application
  And step definition test 2nd attempt

@runthis
Scenario: #3 As any CTRP User, I am able to find persons by first name
  Given the user login to the ctrp application
  And step definition test 3rd attempt

@runthis
Scenario: #4 As any CTRP User, I am able to lookup persons by first name
  Given the user login to the ctrp application
  And step definition test 4th attempt
