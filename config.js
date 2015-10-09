
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox',
        shardTestFiles: true,
        maxInstances: 3
    },


baseUrl: 'http://ctrp-ci.nci.nih.gov/ctrp/',
  //  baseUrl: 'http://localhost/ctrp/',

    params: {
        login: {
            user_admin: 'ctrpadmin',
            password: 'Welcome01',
            user_po: 'testercurator'
        }
    },
//    restartBrowserBetweenTests: true,
/*    onPrepare: function() {
        var width = 1024;
        var height = 600;
        browser.driver.manage().window().setSize(width, height);
        // implicit and page load timeouts
        browser.manage().timeouts().pageLoadTimeout(40000);
        browser.manage().timeouts().implicitlyWait(25000);

        // for non-angular page
        browser.ignoreSynchronization = true;
    },*/


    allScriptsTimeout: 50000,
    getPageTimeout: 50000,

   framework: 'cucumber',

    specs: [
    //    'features/PO\ F2\ Search\ for\ Organizations.feature'
    //    'features/PO\ F3\ Create\ an\ Organization.feature'
    //    'features/PO\ F4\ Edit\ Organization\ Information.feature'
          'features/PO\ F5\ Delete\ Organization.feature'
    //    'features/PO\ F6\ Curator\ review\ of\ a\ Pending\ Organization.feature'
    //    'features/PO\ F9\ Search\ for\ Persons.feature'
    //    'features/PO\ F10\ Create\ a\ Person\ Record.feature'

    //    'features/*.feature'
    // ¬  'features/test.feature'
    //    'features/PO\ F11\ Edit\ Person\ Information.feature'
    //    'features/PO\ F7\ Create\ Organization\ Family \Name.feature'
    //    'features/PO\ F7\ Edit\ Organization\ Family \Name.feature'
    //  'features/*.feature'
    //   'features/test.feature'
     //   'features/PO\ F4\ Edit\ Organization\ Information.feature'
     //   'features/PO\ F9\ Search\ for\ Persons.feature'
     //    'features/PO\ F10\ Create\ a\ Person\ Record.feature'
     //     'features/PO\ F11\ Edit\ Person\ Information.feature'
     //   'features/PO\ F7\ Create\ Organization\ Family \Name.feature',
     // 'features/PO\ F7\ Edit\ Organization\ Family \Name.feature',
     //  'features/PO\ F7\ Search\ Organization\ Family \Name.feature'
     //  'features/*.feature'
     //   'features/test.feature'

     //     'features/PO\ F11\ Edit\ Person\ Information.feature'
     //    'features/PO\ F7\ Create\ Organization\ Family \Name.feature',
     //   'features/PO\ F7\ Edit\ Organization\ Family \Name.feature',
     //  'features/PO\ F7\ Search\ Organization\ Family \Name.feature'
//  'features/*.feature'
    //    'features/test.feature'

    ],

    jasmineNodeOpts: {
        showColors: true
    },

    cucumberOpts: {

        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json',
        format: 'pretty',
      //  tags: '@runthis'
         format: 'pretty'
      //    tags: '@runthis'
       /*     "@runThat",
              "~@ignoreThis"]*/// or summary
    },

    resultJsonOutputFile: 'test/reports/cuke-report.json'
};