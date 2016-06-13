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

var configurationFile;
configurationFile = '' + testConfiguration + '/testSettings.json';
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);

var conString = configuration.conString;
var client = new pg.Client(conString);

var dbConnection = function () {

    var projectFunctions = new projectFunctionsPage();


    this.dbConnectionImportTrial = function (trialID, getDBConnection) {
        // client.connect(function(err) {
        if (err) {
            return console.error('could not connect to postgres', err);
        }
        client.query("UPDATE other_ids SET protocol_id = 'NCT85' || " + projectFunctions.getRandomInt(1, 1000000) + " where trial_id = " + trialID + " and protocol_id_origin_id = 1 ", function (err) {
            if (err) {
                console.error('error running the UPDATE query', err);
                assert.fail(0, 1, 'error running Query.');
            }
            client.query("SELECT * FROM other_ids where trial_id = " + trialID + " and protocol_id_origin_id = 1 ", function (err, result) {
                if (err) {
                    console.error('error running the SELECT query', err);
                    assert.fail(0, 1, 'error running Query.');
                }
                console.log('Value of Updated Row: ' + result.rows);
                console.log('***** Updated Protocol ID is ---- ' + result.rows[0].protocol_id + ' ---- For Trial ID :' + trialID + ' ******');
                //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                client.on('end', function () {
                    console.log("Client was disconnected.")
                });
            });
        });
        //  });
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

};
module.exports = dbConnection;