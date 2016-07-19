/**
 * Created by singhs10 on 4/27/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var pg = require('pg');
var fs = require('fs');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';
var assert = require('assert');
var moment = require('moment');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');

var configurationFile;
configurationFile = '' + testConfiguration + '/testSettings.json';
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var conString = configuration.conString;
var client = new pg.Client(conString);
var self = this;

var dbConnection = function () {

    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();



    this.dbConnectionImportTrial = function (NCTID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the protocol ID', err);
                assert.fail(0, 1, 'error running Query.');
            }
            trialDBID = trialID.rows[0].trial_id;
            client.query("UPDATE other_ids SET protocol_id = 'NCT85' || " + projectFunctions.getRandomInt(1, 1000000) + " where protocol_id = '" + NCTID + "'", function (err) {
                if (err) {
                    console.error('error running the UPDATE query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                client.query("SELECT * FROM other_ids where trial_id = " + trialDBID  + ' and protocol_id_origin_id = 1', function (err, result) {
                    if (err) {
                        console.error('error running the SELECT query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    console.log('Value of Updated Row: ' + result.rows);
                    console.log('***** Updated NCT Protocol ID is ---- ' + result.rows[0].protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                    client.query("UPDATE trials SET lead_protocol_id = 'cukeScript' || " + projectFunctions.getRandomInt(1, 1000000) + " where id in (" + trialDBID + ")", function (err) {
                        if (err) {
                            console.error('error running the UPDATE query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        client.query("SELECT * FROM trials where id = " + trialDBID , function (err, result) {
                            if (err) {
                                console.error('error running the SELECT query', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            console.log('Value of Updated Row: ' + result.rows);
                            console.log('***** Updated Lead Protocol ID is ---- ' + result.rows[0].lead_protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                            client.on('end', function () {
                                console.log("Client was disconnected.")
                            });
                        });
                    });
                });
            });
        });
    };

    this.dbConnectionImportTrialUpdateNCTId = function (NCTID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the protocol ID', err);
                assert.fail(0, 1, 'error running Query.');
            }
            trialDBID = trialID.rows[0].trial_id;
            client.query("UPDATE other_ids SET protocol_id = 'NCT85' || " + projectFunctions.getRandomInt(1, 1000000) + " where protocol_id = '" + NCTID + "'", function (err) {
                if (err) {
                    console.error('error running the UPDATE query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                client.query("SELECT * FROM other_ids where trial_id = " + trialDBID, function (err, result) {
                    if (err) {
                        console.error('error running the SELECT query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    console.log('Value of Updated Row: ' + result.rows);
                    console.log('***** Updated NCT Protocol ID is ---- ' + result.rows[0].protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                            client.on('end', function () {
                                console.log("Client was disconnected.")
                            });
                        });
                    });
                });
    };

    this.dbConnectionImportTrialUpdateLeadID = function (leadProtocolID, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
                client.query("SELECT * FROM trials where lead_protocol_id = '" + leadProtocolID + "'", function (err, trialID) {
                    if (err) {
                        console.error('error running the SELECT query', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    trialDBID = trialID.rows[0].id;
                    client.query("UPDATE trials SET lead_protocol_id = 'cukeScript' || " + projectFunctions.getRandomInt(1, 1000000) + " where lead_protocol_id = '" + leadProtocolID + "'", function (err) {
                        if (err) {
                            console.error('error running the UPDATE query to update the lead Protocol ID', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        client.query("SELECT * FROM trials where id = " + trialDBID , function (err, result) {
                            if (err) {
                                console.error('error running the SELECT query', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            console.log('***** Updated Lead Protocol ID is ---- ' + result.rows[0].lead_protocol_id + ' ---- For Trial ID :' + trialDBID + ' ******');
                            client.on('end', function () {
                                console.log("Client was disconnected.")
                            });
                        });
                    });
                });
    };

    this.dbConnectionVerifyMyTrialCount = function (countOfMyTrialFromUI, userWhoCreatedTrial, err) {
        //  client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from trials where created_by = '" + userWhoCreatedTrial + "' and t1.is_draft IS NOT TRUE", function (err, result) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Value of Row: ' + result.rows);
            expect(countOfMyTrialFromUI).to.equal(result.rows[0].count);
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
    };

    //this.dbConnectionVerifyMyTrialCount = function (countOfMyTrialFromUI, userWhoCreatedTrial) {
    //    client.connect(function(err) {
    //        if (err) {
    //            return console.error('could not connect to postgres', err);
    //        }
    //        client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, result) {
    //            if (err) {
    //                console.error('error running the Select query', err);
    //                assert.fail(0, 1, 'error running Query.');
    //            }
    //            console.log('ID Of User : ' + result.rows[0].id + 'For the User :' + userWhoCreatedTrial);
    //            client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + result.rows[0].id + "and t1.is_draft IS NOT TRUE", function (err, countOfTrialsDB) {
    //                if (err) {
    //                    console.error('error running the Select query', err);
    //                    assert.fail(0, 1, 'error running Query.');
    //                }
    //                expect(countOfMyTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
    //                client.on('end', function(){console.log("Client was disconnected.")});
    //            });
    //        });
    //    });
    //};

    this.dbConnectionVerifyAllTrialCount = function (countOfAllTrialFromUI, err) {
        // client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from trials where is_draft IS NOT TRUE ", function (err, countOfTrialsDB) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

            expect(countOfAllTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
    };

    this.dbConnectionVerifySavedDraftCount = function (countOfAllTrialFromUI, userWhoCreatedTrial, err) {
        //  client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from trials where created_by = '" + userWhoCreatedTrial + "'and is_draft IS TRUE ", function (err, countOfTrialsDB) {
            if (err) {
                console.error('error running the Select query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

            expect(countOfAllTrialFromUI).to.equal(countOfTrialsDB.rows[0].count);
            client.on('end', function () {
                console.log("Client was disconnected.")
            });
        });
        //  });
    };


    this.buildDBConnection = function () {
        client.connect(function (value) {
            return value;
        })
    };

    this.closeDBConnection = function () {
        client.end();
        //client.on('end', function(){console.log("Client was disconnected.")});
    };

    this.dbConnectionVerifyCountQueryWithID = function (elementTableName, elementColumnName, elementTableValue, userWhoCreatedTrial, elementColumnNameInTrialTable, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from " + elementTableName + " where " + elementColumnName + " = '" + elementTableValue + "'", function (err, elementID) {
            if (err) {
                console.error('error running the 1st Select query', err);
                assert.fail(0, 1, 'error running 1st Query.');
            }
            elementDBID = elementID.rows[0].id;
            console.log('DB ID Of element : ' + elementDBID);
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
                if (err) {
                    console.error('error running the 2nd Select query', err);
                    assert.fail(0, 1, 'error running 2nd Query.');
                }
                userDBID = userID.rows[0].id;
                console.log('DB ID Of user : ' + userDBID);
                if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1." + elementColumnNameInTrialTable + "= " + elementDBID + "and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 3rd Select query', err);
                            assert.fail(0, 1, 'error running 3rd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName + ' -- and value provided -- ' + elementTableValue + ' -- with the My Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t1." + elementColumnNameInTrialTable + "= " + elementDBID + "and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName  + ' -- and value provided -- ' + elementTableValue + ' -- with the All Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1. " + elementColumnNameInTrialTable + "=" + elementDBID + "and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName +  ' -- and value provided -- ' + elementTableValue + ' -- with the Saved Drafts search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else {
                    assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                }
            });
        });
    };

    this.dbConnectionVerifyCountQueryWithThreeSelection = function (elementTableName, elementColumnName, elementTableValue1, elementTableValue2, elementTableValue3, userWhoCreatedTrial, elementColumnNameInTrialTable, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from " + elementTableName + " where " + elementColumnName + " = '" + elementTableValue1 + "'" + " OR " +  elementColumnName + " = '" + elementTableValue2 + "'" + " OR " + elementColumnName + " = '" + elementTableValue3 + "'", function (err, elementID) {
            if (err) {
                console.error('error running the 1st Select query', err);
                assert.fail(0, 1, 'error running 1st Query.');
            }
            elementDBID1 = elementID.rows[0].id;
            elementDBID2 = elementID.rows[1].id;
            elementDBID3 = elementID.rows[2].id;
            console.log('DB ID Of 1st element : ' + elementDBID1);
            console.log('DB ID Of 2nd element : ' + elementDBID2);
            console.log('DB ID Of 3rd element : ' + elementDBID3);
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
                if (err) {
                    console.error('error running the 2nd Select query', err);
                    assert.fail(0, 1, 'error running 2nd Query.');
                }
                userDBID = userID.rows[0].id;
                console.log('DB ID Of user : ' + userDBID);
                if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where t2.user_id = " + userDBID +
                    " and (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 +  "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 3rd Select query', err);
                            assert.fail(0, 1, 'error running 3rd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName +  ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3 + ' -- with the My Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 +  "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName +  ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3  + ' -- with the All Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id " +
                    "where t2.user_id = " + userDBID +
                    " and (t1." + elementColumnNameInTrialTable + "= " + elementDBID1 +  "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID2 + "OR t1." + elementColumnNameInTrialTable + "= " + elementDBID3 +
                    ") and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementTableName +  ' -- and values provided -- ' + elementTableValue1 + '; ' + elementTableValue2 + '; ' + elementTableValue3  + ' -- with the Saved Drafts search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else {
                    assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                }
            });
        });
    };

    this.dbConnVerifyCntTrialTbWithOneClm = function (elementColumnNameInTrialTable, elementColumnValue, userWhoCreatedTrial, whichSearchOption, countFromUI, err) {
        //client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
            client.query("select * from users where username = '" + userWhoCreatedTrial + "'", function (err, userID) {
                if (err) {
                    console.error('error running the 1st Select query', err);
                    assert.fail(0, 1, 'error running 1st Query.');
                }
                userDBID = userID.rows[0].id;
                console.log('DB ID Of user : ' + userDBID);
                if (whichSearchOption.toUpperCase() === 'MY TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1." + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.internal_source_Id = 2 and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 2nd Select query', err);
                            assert.fail(0, 1, 'error running 2nd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with My Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'ALL TRIALS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t1." + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.is_draft is not true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 2nd Select query', err);
                            assert.fail(0, 1, 'error running 2nd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);

                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with All Trials search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else if (whichSearchOption.toUpperCase() === 'SAVED DRAFTS') {
                    client.query("select count(*) from trials t1 join trial_ownerships t2 on t1.id = t2.trial_id where t2.user_id = " + userDBID + " and t1. " + elementColumnNameInTrialTable + "= '" + elementColumnValue + "' and t1.internal_source_Id = 2 and t1.is_draft is true", function (err, countOfTrialsDB) {
                        if (err) {
                            console.error('error running the 2nd Select query', err);
                            assert.fail(0, 1, 'error running 2nd Query.');
                        }
                        console.log('Count of Rows : ' + countOfTrialsDB.rows[0].count);
                        expect(countFromUI).to.equal(countOfTrialsDB.rows[0].count, 'Validation of Count of trials for the search Criteria -- ' + elementColumnNameInTrialTable + ' -- with Saved Drafts search option does not match.');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                }
                else {
                    assert.fail(0, 1, 'Given option --> ' + whichSearchOption + ' <-- does not exist. Either the option should be --My Trials-- OR --All Trials-- OR --Saved Drafts--.');
                    client.on('end', function () {
                        console.log("Client was disconnected.")
                    });
                }
        });
    };

    this.dbConnVerifyDocumentImpTrial = function (nciIDOfTrial, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + nciIDOfTrial + "'", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the Trial', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialID.rows[0].id;
            client.query("Select * from trial_documents where trial_id = " + trialDBID, function (err, document) {
                if (err) {
                    console.error('error running the Select query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                console.log('***** Trial Document Name is ---- ' + document.rows[0].file_name + ' ---- For NCI Trial ID :' + nciIDOfTrial + ' ******');
                expect(NCTIDWithNoOfficialTitle + '.xml').to.equal(document.rows[0].file_name, 'Verify the XML document name');
                expect('Other').to.equal(document.rows[0].document_type, 'Verify the XML document Type');
                expect('CtGov').to.equal(document.rows[0].source_document, 'Verify the XML document Source');
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            });
        });
    };

    this.dbConnVerifyMilestoneImpTrial = function (nciIDOfTrial, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select * from trials where nci_id = '" + nciIDOfTrial + "'", function (err, trialID) {
            if (err) {
                console.error('error running the Select query to find the Trial', err);
                assert.fail(0, 1, 'error running Query.');
            }
            var trialDBID = trialID.rows[0].id;
            client.query("select * from milestones where name = 'Submission Received Date'", function (err, milestoneID) {
                if (err) {
                    console.error('error running the Select query to find the Trial', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var milestoneDBID = milestoneID.rows[0].id;
                client.query("Select * from milestone_types where name = 'General'", function (err, milestoneTypeID) {
                    if (err) {
                        console.error('error running the Select query to find the Trial', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var milestoneTypeDBID = milestoneTypeID.rows[0].id;
                    client.query("Select * from milestone_wrappers where trial_id = " + trialDBID , function (err, milestones) {
                        if (err) {
                            console.error('error running the Select query', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        console.log('create Date Time in DB is:');
                        console.log(moment(milestones.rows[0].milestone_date).isValid());
                        console.log(moment.utc(milestones.rows[0].milestone_date).format('YYYY-MM-DD'));
                        expect(milestoneDBID).to.equal(milestones.rows[0].milestone_id, 'Verify the Milestone ID matches to \'Submission Received date\'');
                        expect(milestoneTypeDBID).to.equal(milestones.rows[0].milestone_type_id, 'Verify the Milestone Type matches');
                        expect(moment().format('YYYY-MM-DD')).to.equal((moment.utc(milestones.rows[0].milestone_date).format('YYYY-MM-DD')), 'Verify the Created Date');
                        client.on('end', function () {
                            console.log("Client was disconnected.")
                        });
                    });
                });
            });
        });
    };

    this.dbConnVerifyTrialRejectedORSubmissionTerminated = function (NCTID, wantREJ, wantSTR, err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("select count(*) from other_ids where protocol_id = '" + NCTID + "'", function (err, trialCntOtherIDTbl) {
            if (err) {
                console.error('error running the Select query to find the TrialID from Other_ids table', err);
                assert.fail(0, 1, 'error running Query.');
            }
            console.log('Count of Rows : ' + trialCntOtherIDTbl.rows[0].count);
            if(trialCntOtherIDTbl.rows[0].count === '1') {
                client.query("select * from other_ids where protocol_id = '" + NCTID + "'" + " ORDER BY id DESC LIMIT 1", function (err, trialIDOtherIDTbl) {
                    if (err) {
                        console.error('error running the Select query to find the TrialID from Other_ids table', err);
                        assert.fail(0, 1, 'error running Query.');
                    }

                     trialDBID = trialIDOtherIDTbl.rows[0].trial_id;
                    console.log('Trial DB Id' + trialDBID);
                });
            }
            else {
                projectFunctionsRegistry.parseXMLFromCtGov(NCTID);
                ctGovElement.then(function (value) {
                    var ctGovLeadProtocolID = value.clinical_study.id_info.org_study_id;
                    var ctGovLeadOrg = value.clinical_study.sponsors.lead_sponsor.agency;
                    client.query("select * from trials where lead_protocol_id = '" + ctGovLeadProtocolID + "' and study_source_id = 4 ORDER BY id DESC LIMIT 1", function (err, trialIDTrialTbl) {
                        if (err) {
                            console.error('error running the Select query to find the TrialID from trial table', err);
                            assert.fail(0, 1, 'error running Query.');
                        }

                         trialDBID = trialIDTrialTbl.rows[0].id;
                        console.log('Trial DB Id' + trialDBID);
                    });
                });
            }

            client.query("select * from processing_statuses where name = 'Submission Terminated' OR name = 'Rejected' OR name = 'Submission Reactivated' order by name desc", function (err, processingStatusID) {
                if (err) {
                    console.error('error running the Select query to find the ID of Processing Status', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                var STRDBID = processingStatusID.rows[0].id;
                var SREDBID = processingStatusID.rows[1].id;
                var REJDBID = processingStatusID.rows[2].id;
                client.query("select * from processing_status_wrappers where trial_id = " + trialDBID + " ORDER BY id DESC LIMIT 1", function (err, processingStatusWrapperID) {
                    if (err) {
                        console.error('error running the Select query to find the latest processing status', err);
                        assert.fail(0, 1, 'error running Query.');
                    }
                    var processingStatusDBID = processingStatusWrapperID.rows[0].processing_status_id;
                    client.query("select * from milestones where name = 'Submission Reactivated Date' OR name = 'Submission Terminated Date' " +
                    "OR name = 'Submission Rejection Date' OR name = 'Late Rejection Date' order by name", function (err, milestoneID) {
                        if (err) {
                            console.error('error running the Select query to find the ID of Milestone', err);
                            assert.fail(0, 1, 'error running Query.');
                        }
                        var milestoneLRDDBID = milestoneID.rows[0].id;
                        var milestoneSREDBID = milestoneID.rows[1].id;
                        var milestoneSRJDBID = milestoneID.rows[2].id;
                        var milestoneSTRDBID = milestoneID.rows[3].id;
                        client.query("select * from submissions where trial_id = " + trialDBID + "ORDER BY id DESC LIMIT 1", function (err, submissionID) {
                            if (err) {
                                console.error('error running the Select query to find the ID of Submission', err);
                                assert.fail(0, 1, 'error running Query.');
                            }
                            var submissionDBID = submissionID.rows[0].id;


                            if (processingStatusDBID === STRDBID && wantSTR.toUpperCase() === 'NO') {
                                console.log('Trial Processing Status is Submission Terminated');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSREDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Reactivate a submission Terminated Trial', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + SREDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Reactivate a submission Terminated Trial', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }

                            if (processingStatusDBID !== STRDBID && wantSTR.toUpperCase() === 'YES') {
                                console.log('Trial Processing Status is Not Submission Terminated');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSTRDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Terminated a submission ', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + STRDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Terminated a submission', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }

                            if (processingStatusDBID === REJDBID && wantREJ.toUpperCase() === 'NO') {
                                assert.fail(0, 1, 'Unrejecting a trial not implemented Now');
                                console.log('Trial Processing Status is Rejected');
                            }
                            if (processingStatusDBID !== REJDBID && wantREJ.toUpperCase() === 'YES') {
                                console.log('Trial Processing Status is NOT Rejected');
                                client.query("insert into milestone_wrappers values(DEFAULT , CURRENT_DATE ,  " + milestoneSRJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + ", '', 3, 'Lathiramalaynathan, Frederick' )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Milestone Wrappers to Reject a submission ', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                                client.query("insert into processing_status_wrappers values(DEFAULT , CURRENT_DATE ,  " + REJDBID + ", " + trialDBID + ", current_timestamp, current_timestamp, uuid_generate_v4(), 0, " + submissionDBID + " )", function (err) {
                                    if (err) {
                                        console.error('error running the Insert query to Processing Status Wrappers to Reject a submission', err);
                                        assert.fail(0, 1, 'error running Query.');
                                    }
                                });
                            }
                            else {
                                console.log('Trial Processing Status is neither Rejected nor Submission Terminated.');
                            }
                            client.on('end', function () {
                                console.log("Client was disconnected.")
                            });
                        });
                    });
                });
            });
        });
    }
};
module.exports = dbConnection;