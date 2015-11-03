@Global @Reg
Feature: Reg F13 Register Trial Documents

As a CTRP User, I can attach various documents to a trial registration

Scenario: #1 I can attach the protocol document, IRB, Informed Consent, and other documents to a trial registration
Given I have selected the option to register a National, Externally Peer-Reviewed, or Institutional trial
And I am on the Register Trial Related Document screen
When I have selected a file to attach as the Protocol Document
And I have selected a file to attach as the IRB Approval
And I have indicated if the Informed Consent is included with the Protocol Document as Yes or No
And I have selected a file to attach as the Informed Consent Document (required if Interventional and Informed Consent not included in Protocol Document)
And I have selected a file to attach as the list of Participating Sites (optional)
And I have selected one or more files to attach and entered the description of the file (optional)
Then the Register Trial Related Document for the trial registration will be complete

