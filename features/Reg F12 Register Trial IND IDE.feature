@Global @Reg
Feature: As a CTRP User, I can indicate if a trial has an associated IND or IDE and if so, enter information about the IND or IDE

Scenario 1: I can indicate that the trial does not have an associated IND or IDE
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial IND/IDE Information screen
When I have selected "No" for the question "Does this trial have an associated IND or IDE?"
Then the IND/IDE Information for the trial registration will be complete

Scenario 2: I can enter the IND or IDE information for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial IND/IDE Information screen
And I have selected "Yes" for the question "Does this trial have an associated IND or IDE?"
When I have selected the IND/IDE Type from a list
And I have entered the IND/IDE number
And I have selected the IND/IDE Grantor from a list based on IND or IDE selected
And I have selected the IND/IDE Holder Type from a list
And I have selected the NIH Institution or NCI Division/Program Code from a list
And I have selected "Yes" or "No" for Expanded Access
And I have selected the Expanded Access Type if I selected "Yes" for Expanded Access
And I have selected "Yes" or "No" for Exempt
Then the IND/IDE Information for the trial registration will be complete

Scenario 3: I can enter the IND and IDE information for multiple IND or IDE registrations for a trial
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial IND/IDE Information screen
And I have selected "Yes" for the question "Does this trial have an associated IND or IDE?"
When I have entered the information for an IND or IDE
Then I will be able to select "Add IND/IDE" and enter the information for multiple IND/IDEs
