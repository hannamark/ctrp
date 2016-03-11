@Global @Reg
Feature: Reg F11 Register Trial Dates and Trial Status

  As a CTRP User, I can register a trial's key dates and trial status

  Scenario Outline: #1 Trial Status Transition Rules
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there 
    And Same day Transition rule <Sameday> will be validated

      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |errorsWarnings	                                                                                                                                                                                                                                                                |<Sameday>|
      |STATUSZERO	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes|
      |STATUSZERO	                                    |In Review	                                    |			        |                                                                                                                                                                                                                                                                               |yes|
      |STATUSZERO	                                    |Approved	                                    |		            |WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                                |yes|
      |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |yes|
      |STATUSZERO	                                    |Active	                                        |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |yes|
      |STATUSZERO	                                    |Enrolling by Invitation	                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |yes|
      |STATUSZERO	                                    |Closed to Accrual	                            |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |yes
      |STATUSZERO	                                    |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                            |yes
      |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |yes
      |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                |yes
      |STATUSZERO	                                    |Complete	                                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	|yes
      |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	|yes
      |In Review	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |In Review	                                    |In Review	                                    |			        |ERROR: Duplicate [In Review] status is not allowed	                                                                                                                                                                                                                            |yes
      |In Review	                                    |Approved	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |In Review	                                    |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |In Review	                                    |Active                                       	|			        |WARNING: Interim status [Approved] is missing                                                                                                                                                                                                                                	|yes
      |In Review	                                    |Enrolling by Invitation                        |			        |WARNING: Interim status [Approved] is missing                                                                                                                                                                                                                                	|yes
      |In Review	                                    |Closed to Accrual                            	|			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                                                                    |yes
      |In Review	                                    |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                            |yes
      |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                                                                    |yes
      |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing                                                                                                                	|yes
      |In Review	                                    |Complete	                                    |			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                   	|yes
      |In Review	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                |yes
      |Approved	                                        |STATUSZERO                                   	|			        |                                                                                                                                                                                                                                                                               |yes
      |Approved	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Approved] to [In Review] 	                                                                                                                                                                                                            |yes
      |Approved	                                        |Approved	                                    |			        |ERROR: Duplicate [Approved] status is not allowed	                                                                                                                                                                                                                            |yes
      |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Approved	                                        |Active	                                        |			        |                                                                                                                                                                                                                                                                               |yes
      |Approved	                                        |Enrolling by Invitation	                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Approved	                                        |Closed to Accrual	                            |			        |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                                |yes
      |Approved	                                        |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                        |yes
      |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                                |yes
      |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                                                                                                            |yes
      |Approved	                                        |Complete	                                    |			        |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                    |yes
      |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                       |yes
      |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Withdrawn	                                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [In Review] 	                                                                                                                                                                                                            |yes
      |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Approved] 	                                                                                                                                                                                                            |yes
      |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Duplicate [Withdrawn] status is not allowed	                                                                                                                                                                                                                            |yes
      |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Active]	                                                                                                                                                                                                                |yes
      |Withdrawn	                                    |Enrolling by Invitation	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Enrolling by Invitation]	                                                                                                                                                                                                |yes
      |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual]	                                                                                                                                                                                                    |yes
      |Withdrawn	                                    |Closed to Accrual and Intervention	            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual and Intervention]                                                                                                                                                                                      |yes
      |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |yes
      |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                          |yes
      |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Complete]	                                                                                                                                                                                                            |yes
      |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Administratively Complete]	                                                                                                                                                                                            |yes
      |Active	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Active	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Active] to [In Review]	                                                                                                                                                                                                                |yes
      |Active	                                        |Approved	                                    |			        |ERROR: Invalid status transition from [Active] to [Approved]	                                                                                                                                                                                                                |yes
      |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Active	                                        |Active	                                        |			        |ERROR: Duplicate [Active] status is not allowed	                                                                                                                                                                                                                            |yes
      |Active	                                        |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Active] to [Enrolling by Invitation]	                                                                                                                                                                                                |yes
      |Active	                                        |Closed to Accrual	                            |			        |Warning: Invalid status transition from [Active] to [Closed to Accrual] on the same day                                                                                                                                                                                        |no
      |Active	                                        |Closed to Accrual and Intervention             |			        |WARNING: Interim status [Closed to Accrual] is missing\n Warning: Invalid status transition from [Active] to [Closed to Accrual and Intervention] on the same day	                                                                                                            |no
      |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|Warning: Invalid status transition from [Active] to [Temporarily Closed to Accrual] on the same day	                                                                                                                                                                        |no
      |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|Warning: Invalid status transition from [Active] to [Temporarily Closed to Accrual and Intervention] on the same day	                                                                                                                                                        |no
      |Active	                                        |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |yes
      |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |yes
      |Enrolling by Invitation	                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Enrolling by Invitation	                        |In Review	                                    |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [In Review]	                                                                                                                                                                                                |yes             |
      |Enrolling by Invitation	                        |Approved	                                    |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [Approved]	                                                                                                                                                                                                |yes             |
      |Enrolling by Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Enrolling by Invitation	                        |Active	                                        |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [Active]                                                                                                                                                                                                    |yes                    |
      |Enrolling by Invitation	                        |Enrolling by Invitation	                    |			        |ERROR: Duplicate [Enrolling by Invitation] status is not allowed	                                                                                                                                                                                                            |yes
      |Enrolling by Invitation	                        |Closed to Accrual	                            |			        |                                                                                                                                                                                                                                                                               |yes
      |Enrolling by Invitation	                        |Closed to Accrual and Intervention             |			        |WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |yes
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Enrolling by Invitation	                        |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |yes
      |Enrolling by Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |yes
      |Closed to Accrual	                            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Closed to Accrual	                            |In Review	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [In Review]	                                                                                                                                                                                                    |yes
      |Closed to Accrual                                |Approved	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Approved]	                                                                                                                                                                                                    |yes
      |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                                    |yes
      |Closed to Accrual                            	|Active	                                        |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Active]	                                                                                                                                                                                                        |yes
      |Closed to Accrual                            	|Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Enrolling by Invitation]	                                                                                                                                                                                        |yes
      |Closed to Accrual                            	|Closed to Accrual	                            |			        |ERROR: Duplicate [Closed to Accrual] status is not allowed 	                                                                                                                                                                                                                |yes
      |Closed to Accrual                            	|Closed to Accrual and Intervention             |			        |                                                                                                                                                                                                                                                                               |yes
      |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual]	                                                                                                                                                                                |yes
      |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                |yes
      |Closed to Accrual	                            |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |yes
      |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |yes
      |Closed to Accrual and Intervention	            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Closed to Accrual and Intervention	            |In Review	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                                    |yes
      |Closed to Accrual and Intervention	            |Approved	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                                    |yes
      |Closed to Accrual and Intervention	            |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                                    |yes
      |Closed to Accrual and Intervention	            |Active	                                        |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Active]	                                                                                                                                                                                        |yes
      |Closed to Accrual and Intervention	            |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Enrolling by Invitation]	                                                                                                                                                                    |yes
      |Closed to Accrual and Intervention	            |Closed to Accrual	                            |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Closed to Accrual]	                                                                                                                                                                            |yes
      |Closed to Accrual and Intervention	            |Closed to Accrual and Intervention             |			        |ERROR: Duplicate [Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                                |yes
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                                |yes
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                 |yes
      |Closed to Accrual and Intervention	            |Complete	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Closed to Accrual and Intervention	            |Administratively Complete	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [In Review]	                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Approved]	                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual                  	|Enrolling by Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual  	                |Closed to Accrual and Intervention             |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Duplicate [Temporarily Closed to Accrual] status is not allowed	                                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Complete]	                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |yes
      |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual and Intervention	|Enrolling by Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Intervention             |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                    |yes
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Duplicate [Temporarily Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                    |yes
      |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Complete]	                                                                                                                                                                        |yes
      |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |yes
      |Complete	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |yes
      |Complete	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Complete] to [In Review]	                                                                                                                                                                                                            |yes
      |Complete                                    	    |Approved	                                    |			        |ERROR: Invalid status transition from [Complete] to [Approved]	                                                                                                                                                                                                                |yes
      |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Withdrawn]	                                                                                                                                                                                                            |yes
      |Complete                                    	    |Active	                                        |			        |ERROR: Invalid status transition from [Complete] to [Active]	                                                                                                                                                                                                                |yes
      |Complete	                                        |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Complete] to [Enrolling by Invitation]	                                                                                                                                                                                                |yes
      |Complete	                                        |Closed to Accrual	                            |			        |ERROR: Invalid status transition from [Complete] to [Closed to Accrual]	                                                                                                                                                                                                    |yes
      |Complete	                                        |Closed to Accrual and Intervention             |			        |ERROR: Invalid status transition from [Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                                       |yes
      |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |yes
      |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                           |yes
      |Complete	                                        |Complete	                                    |			        |ERROR: Duplicate [Complete] status is not allowed	                                                                                                                                                                                                                            |yes
      |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Administratively Complete]	                                                                                                                                                                                            |yes
      |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |yes
      |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [In Review]	                                                                                                                                                                                            |yes
      |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Approved]	                                                                                                                                                                                            |yes
      |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Withdrawn]	                                                                                                                                                                                            |yes
      |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Active]	                                                                                                                                                                                                |yes
      |Administratively Complete	                    |Enrolling by Invitation	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Enrolling by Invitation]	                                                                                                                                                                                |yes
      |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual]	                                                                                                                                                                                    |yes
      |Administratively Complete	                    |Closed to Accrual and Intervention             |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                      |yes
      |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                        |yes
      |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual and Intervention]	                                                                                                                                                        |yes
      |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Complete]	                                                                                                                                                                                            |yes
      |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|ERROR: Duplicate [Administratively Complete] status is not allowed	                                                                                                                                                                                                            |yes

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #2 I can enter a trial status and trial status date for a trial; valid transitions
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a <status date> and status transitions from <statusTransitions>
      |status date                                                      | statusTransitions                                    |
      |Dates entered increment respecting the valid transition sequence | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Withdrawn'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Withdrawn'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual and Intervention' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual and Intervention' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Active' TO 'Temporarily Closed to Accrual' TO 'Enrolling by Invitation' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Administratively Complete'|
      |Dates are entered on Future based on previous status | 'In Review' TO 'Approved' TO 'Enrolling by Invitation' TO 'Temporarily Closed to Accrual' TO 'Active' TO 'Closed to Accrual' TO 'Closed to Accrual and Intervention' TO 'Complete'|

    Then no errors-warnings will be displayed

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#2a I can enter a trial status and trial status date for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial date <statusDateFrom> and trial status from <statusFrom> to trial date <statusDateTo> trial status <statusTo> with the <condition> then the respective checks <errorsWarnings> will be there
      |statusDateFrom   |statusFrom	                                    |statusDateTo                 |statusTo	                                      |condition                                                                                                                  |errorsWarnings	                                                |
      |Date Entered Now |Approved                                       |Same Date entered later      |In Review                                      |                                                                                                                           |Warning: Invalid Transition from [Approved] to [In Review]       |
      |Date Entered Now |In Review                                      |Same Date entered later      |Approved                                       |                                                                                                                           |                                                                 |
      |Date Entered Now |Approved                                       |Different Date in the Future |In Review                                      |                                                                                                                           |Warning: Invalid Transition from [Approved] to [In Review]       |
      |Date Entered past|In Review                                      |Date entered Now             |Approved                                       |                                                                                                                           |Warning: Invalid Transition from [In Review] to [Approved]       |
      |Date Entered Now |Active                                         |Same Date entered later      |Temporarily Closed to Accrual                  |all the previous Status before Active has been added                                                                       |                                                                 |
      |Date Entered Now |Temporarily Closed to Accrual                  |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Temporarily Closed to Accrual has been added                 |                                                                 |
      |Date Entered Now |Temporarily Closed to Accrual                  |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |WARNING: Interim status [Active] is missing                      |
      |Date Entered Now |Active                                         |Same Date entered later      |Temporarily Closed to Accrual and Intervention |all the previous Status before Active has been added                                                                       |                                                                 |
      |Date Entered Now |Temporarily Closed to Accrual and Intervention |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Temporarily Closed to Accrual and Intervention has been added|                                                                 |
      |Date Entered Now |Temporarily Closed to Accrual and Intervention |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |WARNING: Interim status [Active] is missing                      |
      |Date Entered Now |Active                                         |Same Date entered later      |Closed to Accrual                              |all the previous Status before Active has been added                                                                       |                                                                 |
      |Date Entered Now |Closed to Accrual                              |Same Date entered later      |Active                                         |all the previous Status before Active including Active before Closed to Accrual has been added                             |Warning: Invalid Transition from [Closed to Accrual] to [Active] |
      |Date Entered Now |Closed to Accrual                              |Same Date entered later      |Active                                         |all the previous Status before Active has been added                                                                       |WARNING: Interim status [Active] is missing                      |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3 Order of Trial status list
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I click on the Trial status list
    Then the order of trial status list should be
      |In Review                                      |
      |Approved                                       |
      |Active                                         |
      |Enrolling by Invitation                        |
      |Closed to Accrual                              |
      |Closed to Accrual and Intervention             |
      |Temporarily Closed to Accrual                  |
      |Temporarily Closed to Accrual and Intervention |
      |Withdrawn                                      |
      |Administratively Complete                      |
      |Complete                                       |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3a Validation rule for Trial status fields
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I click on Review Trial without any Trial Status
    Then I should get an error message as "Trial Status is required"
    And On Add Trial Status if Status Date or Status is missing
    Then I should get an error message as "Please provide a Status Date and select a Status"
    And On Add Trial Status when the Status selected is
      |Temporarily Closed to Accrual                  |
      |Temporarily Closed to Accrual and Intervention |
      |Withdrawn                                      |
      |Administratively Complete                      |
    And Why Study Stopped reason is not provided
    Then I should get an error message as "Enter Why Study Stopped"

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline:#3b Validation rule for Trial status Dates
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I select a Status Date in Past
    Then It should not give any error message for status date
    When I select a Status Date in Today
    Then It should not give any error message for status date
    When I select a Status Date in Future
    Then It should not give any error message for status date

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #4 I can add and delete a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When When I add a trial status
    Then a new trial status will appear in the Trial Status History
    When I click on the delete button in the Actions column for a selected status
    Then Please provide a comment box will be displayed
    And I must provide a comment explaining why deleting this trial status
    When the comment is entered in the provided box
    And click on the delete button
    Then the selected status will be marked as deleted
    And the record will be deleted after the trial is submitted

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #5 I can enter a Trial Dates as either Actual or Anticipated
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    And I must enter Trial Dates values type
      |Trial Start Date  |
      |Primary Completion Date  |
      |Completion Date  |

    And I must Select Trial Date type for every Trial Date value
      |Actual  |
      |Anticipated  |
    When I have clicked on the review button
    Then no errors should be displayed

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#6 Trial Dates Mandatory Fields
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When I have not entered a Trial Date values for
      |Trial Start Date  |
      |Primary Completion date |
      |Completion Date|
    Then an error message type will be displayed
    
      |Trial Start Date is required  |
      |Primary Completion Date is required  |
      |Completion Date is required  |

    
    When I have not entered a Trial Date type for the mandatory Trial Dates
      |Actual |
      |Anticipated  |
    Then the error message type will be displayed
      
      |Trial Start Date Type is required  |
      |Primary Completion Date Type is required  |
      |Completion Date Type is required  |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline: #7 Rules for Status/Dates relationships
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Section
    When Current Trial Status is <TrialStatusType> then the Trial date Type must be <DateType>
      |TrialStatusType                          |DateType                                         |
      |Active                                   |Trial Start Date must be Actual                  |
      |Enrolling by Invitation                  |Trial Start Date must be Actual                  |
      |Closed to Accrual                        |Trial Start Date must be Actual                  |
      |Closed to Accrual and Intervention       |Trial Start Date must be Actual                  |
      |Temp Closed to Accrual                   |Trial Start Date must be Actual                  |
      |Temp Closed to Accrual and Intervention  |Trial Start Date must be Actual                  |
      |Complete                                 |All date types must be Actual                    |
      |Administratively Complete                |Trial Start Date must be Actual                  |
      |In Review                                |Trial Start Date could be Actual or Anticipated  |
      |Approved                                 |Trial Start Date could be Actual or Anticipated  |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |
  
  Scenario Outline: #8 Rules for Study Date types
    Given I have selected the option to register a trial <trialType>
    And I am on the Trial Dates Screen
    When the Trial date is in the past
    Then the Trial date type must be actual
    When  the Trial date is today
    Then the Trial Date type could be actual
    And the Trial date Type could be anticipated
    When the Trial date is in the future
    Then the Trial date type must always be anticipated

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline: #9 general rules for Study Date values are as follows
    Given I have selected the option to register a trial <trialType>
    And I am on the trial date section
    And The Trial Start Date can be in the past, present, or future
    And The Trial Start Date can be in the past, present, or future
    And The Completion Date is always the same as, or later than, the Primary Completion Date
    And The Primary Completion Date is always the same as, or later than, the Trial Start Date
    And The Primary Completion Date can be earlier than the Current Trial Status Dates Complete
    When the Primary Completion Date is Actual
    Then the primary Completion Date can be earlier than the Current Trial Status Dates Administratively Complete
    And The Completion Date is always the same as, or later than, the Primary Completion Date

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

     




     
     

 
   
   

 
  

