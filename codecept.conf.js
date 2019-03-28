exports.config = {
  tests: './Scenarios/*_test.js',
    output: './output',
    helpers: {
        Puppeteer: {
            url: 'http://localhost:8000',
            keepCookies: true,
            fullPageScreenshots: true,
            restart: false,
            keepBrowserState: true,
            show: false,
            waitForNavigation: ['networkidle2', 'domcontentloaded'],
            waitForAction: 500,
            chrome: {
                args: ['--no-sandbox', '--start-maximized'],
                handleSIGTERM: false,
                handleSIGHUP: false,
                defaultViewport: {
                    width: 1700,
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
        autoLogin: {
            enabled: true,
            saveToFile: false,
            inject: 'login',
            users: {
                admin: {
                    login: (I) => {
                        I.amOnPage('http://localhost:8000');
                        I.see('Sign in');
                        I.fillField('Username', 'admin');
                        I.fillField('Password', 'admin');
                        I.click('Login');
                    },
                    check: (I) => {
                        I.amOnPage('http://localhost:8000');
                        I.see('Sign in');
                    }
                }
            }
        }
    },
    bootstrap: null,
    mocha: {},
    name: 'dojot-codecept'
};
