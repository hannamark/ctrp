@Global @Reg
Feature: Reg F11 Register Trial Dates and Trial Status

  As a CTRP User, I can register a trial's key dates and trial status

  Scenario Outline: #1 Trial Status Transition Rules
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial status from <statusFrom> to trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there

      |statusFrom	                                    |statusTo	                                    |whyStudyStopped    |errorsWarnings	                                                                                                                                                                                                                                                                |
      |STATUSZERO	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |STATUSZERO	                                    |In Review	                                    |			        |                                                                                                                                                                                                                                                                               |
      |STATUSZERO	                                    |Approved	                                    |		            |WARNING: Interim status [In Review] is missing	                                                                                                                                                                                                                                |
      |STATUSZERO	                                    |Withdrawn	                                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Active	                                        |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Enrolling by Invitation	                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing	                                                                                                                                                                                |
      |STATUSZERO	                                    |Closed to Accrual	                            |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |
      |STATUSZERO	                                    |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                            |
      |STATUSZERO	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                    |
      |STATUSZERO	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                |
      |STATUSZERO	                                    |Complete	                                    |			        |WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	|
      |STATUSZERO	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [In Review] is missing\nWARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	|
      |In Review	                                    |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |In Review	                                    |In Review	                                    |			        |ERROR: Duplicate [In Review] status is not allowed	                                                                                                                                                                                                                            |
      |In Review	                                    |Approved	                                    |			        |                                                                                                                                                                                                                                                                               |
      |In Review	                                    |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |In Review	                                    |Active                                       	|			        |WARNING: Interim status [Approved] is missing                                                                                                                                                                                                                                	|
      |In Review	                                    |Enrolling by Invitation                        |			        |WARNING: Interim status [Approved] is missing                                                                                                                                                                                                                                	|
      |In Review	                                    |Closed to Accrual                            	|			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                                                                    |
      |In Review	                                    |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                            |
      |In Review	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing	                                                                                                                                                                                    |
      |In Review	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing                                                                                                                	|
      |In Review	                                    |Complete	                                    |			        |WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                   	|
      |In Review	                                    |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Approved] is missing\nWARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                |
      |Approved	                                        |STATUSZERO                                   	|			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Approved] to [In Review] 	                                                                                                                                                                                                            |
      |Approved	                                        |Approved	                                    |			        |ERROR: Duplicate [Approved] status is not allowed	                                                                                                                                                                                                                            |
      |Approved	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Active	                                        |			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Enrolling by Invitation	                    |			        |                                                                                                                                                                                                                                                                               |
      |Approved	                                        |Closed to Accrual	                            |			        |WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                                |
      |Approved	                                        |Closed to Accrual and Intervention	            |			        |WARNING: Interim status [Active] is missing\nWARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                        |
      |Approved	                                        |Temporarily Closed to Accrual  	            |Add Stopped Reason	|WARNING: Interim status [Active] is missing	                                                                                                                                                                                                                                |
      |Approved	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Interim status [Active] is missing\nWARNING: Interim status [Temporarily Closed to Accrual] is missing	                                                                                                                                                            |
      |Approved	                                        |Complete	                                    |			        |ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                    |
      |Approved	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Interim status [Active] is missing\nERROR: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                      |
      |Withdrawn	                                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Withdrawn	                                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [In Review] 	                                                                                                                                                                                                            |
      |Withdrawn	                                    |Approved                                     	|Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Approved] 	                                                                                                                                                                                                            |
      |Withdrawn	                                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Duplicate [Withdrawn] status is not allowed	                                                                                                                                                                                                                            |
      |Withdrawn	                                    |Active	                                        |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Active]	                                                                                                                                                                                                                |
      |Withdrawn	                                    |Enrolling by Invitation	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Withdrawn	                                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual]	                                                                                                                                                                                                    |
      |Withdrawn	                                    |Closed to Accrual and Intervention	            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Closed to Accrual and Intervention]                                                                                                                                                                                    |
      |Withdrawn	                                    |Temporarily Closed to Accrual  	            |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |
      |Withdrawn	                                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                        |
      |Withdrawn	                                    |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Complete]	                                                                                                                                                                                                                |
      |Withdrawn	                                    |Administratively Complete	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Withdrawn] to [Administratively Complete]	                                                                                                                                                                                            |
      |Active	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Active	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Active] to [In Review]	                                                                                                                                                                                                                |
      |Active	                                        |Approved	                                    |			        |ERROR: Invalid status transition from [Active] to [Approved]	                                                                                                                                                                                                                |
      |Active	                                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Active	                                        |			        |ERROR: Duplicate [Active] status is not allowed	                                                                                                                                                                                                                            |
      |Active	                                        |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Active] to [Enrolling by Invitation]	                                                                                                                                                                                                    |
      |Active	                                        |Closed to Accrual	                            |			        |                                                                                                                                                                                                                                                                               |
      |Active	                                        |Closed to Accrual and Intervention             |			        |WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
      |Active	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Active	                                        |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
      |Active	                                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Enrolling by Invitation	                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Enrolling by Invitation	                        |In Review	                                    |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [In Review]	                                                                                                                                                                                                                |
      |Enrolling by Invitation	                        |Approved	                                    |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [Approved]	                                                                                                                                                                                                                |
      |Enrolling by Invitation	                        |Withdrawn	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling by Invitation	                        |Active	                                        |			        |ERROR: Invalid status transition from [Enrolling by Invitation] to [Active]                                                                                                                                                                                                                            |
      |Enrolling by Invitation	                        |Enrolling by Invitation	                    |			        |ERROR: Duplicate [Enrolling by Invitation] status is not allowed	                                                                                                                                                                                                    |
      |Enrolling by Invitation	                        |Closed to Accrual	                            |			        |                                                                                                                                                                                                                                                                               |
      |Enrolling by Invitation	                        |Closed to Accrual and Intervention             |			        |WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling by Invitation	                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Enrolling by Invitation	                        |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Enrolling by Invitation	                        |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Closed to Accrual	                            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |In Review	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [In Review]	                                                                                                                                                                                                    |
      |Closed to Accrual                                |Approved	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Approved]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                                    |
      |Closed to Accrual                            	|Active	                                        |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Active]	                                                                                                                                                                                                        |
      |Closed to Accrual                            	|Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Closed to Accrual] to [Enrolling by Invitation]	                                                                                                                                                                                        |
      |Closed to Accrual                            	|Closed to Accrual	                            |			        |ERROR: Duplicate [Closed to Accrual] status is not allowed 	                                                                                                                                                                                                                |
      |Closed to Accrual                            	|Closed to Accrual and Intervention             |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual	                            |Temporarily Closed to Accrual                  |Add Stopped Reason	|WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual]	                                                                                                                                                                                |
      |Closed to Accrual	                            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|WARNING: Invalid status transition from [Closed to Accrual] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                |
      |Closed to Accrual	                            |Complete	                                    |			        |WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
      |Closed to Accrual	                            |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual and Intervention	            |In Review	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Approved	                                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Active	                                        |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Active]	                                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Enrolling by Invitation]	                                                                                                                                                                    |
      |Closed to Accrual and Intervention	            |Closed to Accrual	                            |			        |ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Closed to Accrual]	                                                                                                                                                                            |
      |Closed to Accrual and Intervention	            |Closed to Accrual and Intervention             |			        |ERROR: Duplicate [Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                                |
      |Closed to Accrual and Intervention	            |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Closed to Accrual and Intervention] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                            |
      |Closed to Accrual and Intervention	            |Complete	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Closed to Accrual and Intervention	            |Administratively Complete	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [In Review]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Approved]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Withdrawn]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual                  	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Enrolling by Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual  	                |Closed to Accrual and Intervention             |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual                  	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Duplicate [Temporarily Closed to Accrual] status is not allowed	                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual  	                |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual] to [Complete]	                                                                                                                                                                                        |
      |Temporarily Closed to Accrual  	                |Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing                                                                                                                                                |
      |Temporarily Closed to Accrual and Intervention	|STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [In Review]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Approved]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Withdrawn]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Active	                                        |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Enrolling by Invitation	                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual	                            |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Temporarily Closed to Accrual and Intervention	|Closed to Accrual and Intervention             |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing	                                                                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Temporarily Closed to Accrual]	                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Duplicate [Temporarily Closed to Accrual and Intervention] status is not allowed	                                                                                                                                                                                    |
      |Temporarily Closed to Accrual and Intervention	|Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Temporarily Closed to Accrual and Intervention] to [Complete]	                                                                                                                                                                        |
      |Temporarily Closed to Accrual and Intervention	|Administratively Complete	                    |Add Stopped Reason	|WARNING: Interim status [Closed to Accrual] is missing\nWARNING: Interim status [Closed to Accrual and Intervention] is missing	                                                                                                                                            |
      |Complete	                                        |STATUSZERO	                                    |			        |                                                                                                                                                                                                                                                                               |
      |Complete	                                        |In Review	                                    |			        |ERROR: Invalid status transition from [Complete] to [In Review]	                                                                                                                                                                                                            |
      |Complete                                    	    |Approved	                                    |			        |ERROR: Invalid status transition from [Complete] to [Approved]	                                                                                                                                                                                                                |
      |Complete                                    	    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Withdrawn]	                                                                                                                                                                                                            |
      |Complete                                    	    |Active	                                        |			        |ERROR: Invalid status transition from [Complete] to [Active]	                                                                                                                                                                                                                |
      |Complete	                                        |Enrolling by Invitation	                    |			        |ERROR: Invalid status transition from [Complete] to [Enrolling by Invitation]	                                                                                                                                                                                                |
      |Complete	                                        |Closed to Accrual	                            |			        |ERROR: Invalid status transition from [Complete] to [Closed to Accrual]	                                                                                                                                                                                                    |
      |Complete	                                        |Closed to Accrual and Intervention             |			        |ERROR: Invalid status transition from [Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                                    |
      |Complete	                                        |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                                        |
      |Complete	                                        |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Temporarily Closed to Accrual and Intervention]                                                                                                                                                                        |
      |Complete	                                        |Complete	                                    |			        |ERROR: Duplicate [Complete] status is not allowed	                                                                                                                                                                                                                            |
      |Complete	                                        |Administratively Complete	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Complete] to [Administratively Complete]	                                                                                                                                                                                            |
      |Administratively Complete	                    |STATUSZERO	                                    |Add Stopped Reason	|                                                                                                                                                                                                                                                                               |
      |Administratively Complete	                    |In Review	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [In Review]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Approved	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Approved]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Withdrawn	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Withdrawn]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Active	                                        |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Active]	                                                                                                                                                                                                |
      |Administratively Complete	                    |Enrolling by Invitation	                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Enrolling by Invitation]	                                                                                                                                                                                |
      |Administratively Complete	                    |Closed to Accrual	                            |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual]	                                                                                                                                                                                    |
      |Administratively Complete	                    |Closed to Accrual and Intervention             |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Closed to Accrual and Intervention]                                                                                                                                                                    |
      |Administratively Complete	                    |Temporarily Closed to Accrual                  |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual]	                                                                                                                                                                        |
      |Administratively Complete	                    |Temporarily Closed to Accrual and Intervention	|Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Temporarily Closed to Accrual and Intervention]	                                                                                                                                                    |
      |Administratively Complete	                    |Complete	                                    |Add Stopped Reason	|ERROR: Invalid status transition from [Administratively Complete] to [Complete]	                                                                                                                                                                                            |
      |Administratively Complete	                    |Administratively Complete	                    |Add Stopped Reason	|ERROR: Duplicate [Administratively Complete] status is not allowed	                                                                                                                                                                                                            |

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |

  Scenario Outline: #2 I can enter a trial status and trial status date for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a <status date> and a status <statusType> and explained why study stopped <why study stopped>
      |status date                                            | statusType                                    |why study stopped      |
      |Date Entered                                           |In Review                                      |                       |
      |Future Date based on previous status entered           | Approved                                      | 					  |
      |Future Date based on previous status entered           | Active                                        |                   	  |
      |Future Date based on previous status entered           | Enrolling by invitation                       |                       |
      |Future Date based on previous status entered           | Closed to accrual                             |                       |
      |Future Date based on previous status entered           | Close to accrual and Intervention             |                       |
      |Future Date based on previous status entered           | Temporarily Closed to accrual                 |Text                   |
      |Future Date based on previous status entered           | Temporarily closed to accrual and Intervention|Text                   |
      |Future Date based on previous status entered           | Withdrawn                                     |                       |
      |Future Date based on previous status entered           | Administratively Complete                     |Text                   |
      |Future Date based on previous status entered           | Complete                                      |Text                   |
    Then no errors will be displayed

    Examples:
      |trialType  |
      |National                 |
      |Externally Peer-Reviewed |
      |Institutional            |


  Scenario Outline:#3 I can enter a trial status and trial status date for a trial
    Given I have selected the option to register a trial <trialType>
    And I am on the Register Trial Status screen
    When I add a trial date <statusDateFrom> and trial status from <statusFrom> to trial date <statusDateTo> trial status <statusTo> along with why study stopped reason <whyStudyStopped> the respective checks <errorsWarnings> will be there
      |statusDateFrom   |statusFrom	  |statusDateTo                 |statusTo	   |whyStudyStopped    |errorsWarnings	                                          |
      |Date Entered Now |Approved     |Same Date entered later      |In Review     |                   |Warning: Invalid Transition from [Approved] to [In Review]|
      |Date Entered Now |Approved     |Different Date in the Future |In Review     |                   |Warning: Invalid Transition from [Approved] to [In Review]|
      |Date Entered past|Active       |Date entered Now             |Approved      |                   |Warning: Invalid Transition from [Active] to [Approved]

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
      |Primary Completion date  |
    Then an error message " Please Enter a valid date " will be displayed
    When I have not entered a Trial Date type for the mandatory Trial Dates
      |Actual |
      |Anticipated  |
    Then the error message " Please enter a valid date type " will be displayed

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

     




     
     

 
   
   

 
  

