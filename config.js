var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');

exports.config = {
    framework: 'cucumber',
    //framework: 'jasmine2',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox',
        shardTestFiles: true
    //    maxInstances: 3
    },

    baseUrl: 'http://ctrp-ci.nci.nih.gov/ctrp/',
    //   baseUrl: 'http://localhost/ctrp/',

    params: {
        login: {
            user_admin: 'ctrpadmin',
            password: 'Welcome01',
            user_po: 'testercurator'
        }
    },

    /*
    onPrepare: function() { 
               jasmine.getEnv().addReporter(new HtmlReporter({
                   baseDirectory: 'screenshots', 
                   takeScreenShotsOnlyForFailedSpecs: true, 
                   pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {            
                   var monthMap = { 
                           "1": "Jan", 
                           "2": "Feb", 
                           "3": "Mar", 
                           "4": "Apr", 
                           "5": "May", 
                           "6": "Jun", 
                           "7": "Jul", 
                           "8": "Aug", 
                           "9": "Sep", 
                           "10": "Oct", 
                           "11": "Nov", 
                           "12": "Dec" 
                       };  
                   var currentDate = new Date(), 
                       currentHoursIn24Hour = currentDate.getHours(), 
                       currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour, 
                       totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900) +  
                           '-'+ currentTimeInHours+'h-' + currentDate.getMinutes()+'m';  
                       return path.join(totalDateString,capabilities.caps_.browserName, descriptions.join('-'));          }       })); 
    }, 
    */

    //  restartBrowserBetweenTests: true,
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

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

    allScriptsTimeout: 50000,
    getPageTimeout: 50000,

    specs: [
       //    'features/PO\ F2\ Search\ for\ Organizations.feature'
    //    'features/PO\ F3\ Create\ an\ Organization.feature'
    //    'features/PO\ F4\ Edit\ Organization\ Information.feature'
          'features/PO\ F5\ Delete\ Organization.feature',
    //    'features/PO\ F6\ Curator\ review\ of\ a\ Pending\ Organization.feature'
    //    'features/PO\ F9\ Search\ for\ Persons.feature'
    //    'features/PO\ F10\ Create\ a\ Person\ Record.feature'
        'features/PO\ F11\ Edit\ Person\ Information.feature',
        'features/PO\ F14\ Change\ a\ Person\'s\ Affiliated\ Organization.feature',
   //     'features/PO\ F7\ Create\ Organization\ Family \Name.feature',
    //    'features/PO\ F7\ Edit\ Organization\ Family \Name.feature',
    //    'features/PO\ F7\ Search\ Organization\ Family \Name.feature'
        'features/PO\ F8\ Associate\ an\ Organization\ with\ a\ Family.feature'
   //     'features/PO\ F15\ Add\ Organization\ Alias.feature'
    //  'features/*.feature'
    //  'features/test.feature'

    ],

    cucumberOpts: {
        require: ['features/step_definitions/*.js', 'features/support/*.js'],
        format: 'json:tests/features/output/cuke-report-test.json',
        format: 'pretty',
        resultJsonOutputFile: 'true'
    //    tags: '@runthis'
        /*     "@runThat",
=======
        resultJsonOutputFile: 'true',
       tags: '@runthis'
       /*     "@runThat",
>>>>>>> 23d5896fe83f3a149446681dee13cfc9925fa8f8
         "~@ignoreThis"]*/// or summary
       // tags: '@runthis'
       //    tags: '@runthis'
       /*     "@runThat",
        "~@ignoreThis"]*/// or summary
    },

    resultJsonOutputFile: 'tests/features/output/cuke-report-test.json'
};