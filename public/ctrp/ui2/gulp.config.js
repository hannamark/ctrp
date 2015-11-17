// path: src/ is equivalent to src/client; and src/app is equivalent to src/client/app

module.exports = function() {
    var client = './src/';
    var clientApp = client + 'app/';
    var report = './report/';
    var root = './';
    var server = './src/mock_api/';
    var specRunnerFile = 'specs.html'; //under ./src/app/
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        /**
         * Files paths
         */
        alljs: [
            clientApp + '**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        css: temp + 'styles.css',
        fonts: './src/bower_components/font-awesome/fonts/**/*.*',
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',  //name modules,
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js' //exclude unit test files
        ],
        less: client + 'styles/styles.less',
        report: report,
        root: root,
        server: server, //not used
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * angular template cache in $templateCache object
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'ctrp.app.main', //core module name!!
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * locations for Bower and NPM settings
         */

        bower: {
            json: require('./bower.json'),
            directory: './src/bower_components/',
            ignorePath: '../..'
        },

        packages: [
            './package.json',
            './bower.json'
        ],

        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],

        specs: [clientApp + '**/*.spec.js'],

        /**
         * Karma and testing settings
         */
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],

        /**
         * mock Express API settings
         */
        defaultPort: 7203,
        nodeServer: './src/mock_api/mock_server.js' //mock server
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();
    return config;

    /*********** karma related settings ***************/
    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                client + '**/*.main.js', // main CTRP app
                client + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),

            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[clientApp + '**/!(*.spec)+(.js)'] = ['coverage'];

        return options;
    }
};
