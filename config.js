var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');

exports.config = {
    framework: 'cucumber',
    //framework: 'jasmine2',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox',
        shardTestFiles: true,
        maxInstances: 6

    },

    baseUrl: 'http://ctrp-ci.nci.nih.gov/ctrp/',
    // baseUrl: 'http://localhost/ctrp/',
    // baseUrl: 'http://ctrp-qa.ncifcrf.gov/ctrp/',

    params: {
        login: {
            user_admin: 'ctrpadmin',
            password: 'Welcome01',
            user_po: 'testercurator'
        }
    },

    //onPrepare: function() {
    //    browser.driver.manage().window().maximize();
    //    browser.driver.manage().window().setSize('1440', '900');
    //},


    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

    allScriptsTimeout: 50000,
    getPageTimeout: 50000,

    specs: [
    //       'features/PO\ F2\ Search\ for\ Organizations.feature'
    //    'features/PO\ F3\ Create\ an\ Organization.feature'
    //    'features/PO\ F4\ Edit\ Organization\ Information.feature' //Done updated
     //     'features/PO\ F5\ Delete\ Organization.feature',
    //    'features/PO\ F6\ Curator\ review\ of\ a\ Pending\ Organization.feature'
    //    'features/PO\ F9\ Search\ for\ Persons.feature'
    //    'features/PO\ F10\ Create\ a\ Person\ Record.feature'
    //    'features/PO\ F11\ Edit\ Person\ Information.feature', //Done updated
    //    'features/PO\ F14\ Change\ a\ Person\'s\ Affiliated\ Organization.feature', //done updated
    //    'features/PO\ F7\ Create\ Organization\ Family \Name.feature' //Done update - has pending scenarios
    //    'features/PO\ F7\ Edit\ Organization\ Family \Name.feature' //Done updated - has pending scenarios
    //    'features/PO\ F7\ Search\ Organization\ Family \Name.feature'
    //    'features/PO\ F8\ Associate\ an\ Organization\ with\ a\ Family.feature'
    //      'features/PO\ F15\ Add\ Organization\ Alias.feature'
      'features/PO*.feature'
     // 'features/test.feature'

    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/cuke-report-test.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
      //  tags: '@runthis'
        /*     "@runThat",
        resultJsonOutputFile: 'true',
        tags: '@runthis'
        /*     "@runThat",lo
         "~@ignoreThis"]*/// or summary
        // tags: '@runthis'
        //    tags: '@runthis'
        /*     "@runThat",
        "~@ignoreThis"]*/// or summary
    }



    // resultJsonOutputFile: 'tests/features/output/cuke-report-test.json'

};

