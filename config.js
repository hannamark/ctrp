
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName' : 'firefox'
    },


baseURL: 'http://localhost/ctrp/',

    jasmineNodeOpts: {
        onComplete: null,
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    },

   framework: 'cucumber',

    specs: [
        'features/PO\ F2\ Search\ for\ Organizations.feature'
       // 'features/*.feature'
    ],

    jasmineNodeOpts: {
        showColors: true
    },

    cucumberOpts: {
        //require: 'features/step_definitions.js',
        format: 'pretty'
     //  tags: '@Globalxx'
       /*     "@runThat",
            "~@ignoreThis"]*/// or summary
    },

    resultJsonOutputFile: 'test/reports/cuke-report.json'
};