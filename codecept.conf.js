exports.config = {
  tests: './Scenarios/*_test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://10.202.21.25:8000',
            keepCookies: true,
            fullPageScreenshots: true,
            restart: false,
            keepBrowserState: true,
            show: true,
            waitForNavigation: ['networkidle2', 'domcontentloaded'],
            chrome: {
                args: ['--no-sandbox', '--start-maximized'],
                handleSIGTERM: false,
                handleSIGHUP: false,
                defaultViewport: {
                    width: 1920,
                    height: 1080
                },
            },
        }
    },
    include: {
        I: './steps_file.js',
        Template: "./PageObject/Template.js",
        FlowPage: './PageObject/Flow.js'
    },
    plugins: {
        autoDelay: {
            enabled: true
        },
        autoLogin: {
            enabled: true,
            saveToFile: false,
            inject: 'login',
            users: {
                admin: {
                    login: (I) => {
                        I.amOnPage('http://10.202.21.25:8000');
                        I.see('Sign in');
                        I.fillField('Username', 'admin');
                        I.fillField('Password', 'admin');
                        I.click('Login');
                    },
                    check: (I) => {
                        I.amOnPage('http://10.202.21.25:8000/#/');
                        I.see('admin');
                    }
                }
            }
        }
    },
    bootstrap: null,
    mocha: {},
    name: 'dojot-codecept'
};
