
Feature('Template');

Scenario('Template creation', (I) => {
    I.amOnPage('http://localhost:8000');
    I.see('Sign in');
    I.fillField('Username', 'admin');
    I.fillField('Password', 'admin');
    I.click('Login');
    I.amOnPage('http://localhost:8000/#/template/list');
    I.click('New Template');
});
