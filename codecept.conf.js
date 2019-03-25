exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8000',
      keepBrowserState: true,
      keepCookies: true,
      fullPageScreenshots: true,
      restart: true,
      keepBrowserState: true,
      show: true,
      waitForNavigation: ['networkidle2', 'domcontentloaded'],
      waitForAction: 500,
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
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'dojot-codecept'
}