const { $, expect } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    get loginPageTitle () {
        return $('h2');
    }

    get subheader () {
        return $('.subheader');
    }

    get flashError () {
        return $('#flash');
    }

    /**
     * assert errors for user validations
     */
    async assertFlashError (invalidUsername) {
        await expect(await this.flashError).toBeDisplayed();
        if (invalidUsername) {
            await expect(this.flashError).toHaveTextContaining("Your username is invalid!")
        } else {
            await expect(this.flashError).toHaveTextContaining("Your password is invalid!")
        }
    }

    /**
     * use username and password input to populate user credentials
     * @param {*} username 
     * @param {*} password 
     */
    async _populateUser (username, password) {
        await expect(this.inputUsername).toBeDisplayed();
        await expect(this.inputPassword).toBeDisplayed();
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    /**
     * assert submit btn and select
     */
    async _selectSubmitBtn () {
        await expect(this.btnSubmit).toBeDisplayed();
        await expect(this.btnSubmit).toHaveText("Login");
        await this.btnSubmit.click();
    }
    
    /**
     * Assert Login Page title and subheader
     */
    async assertTitleAndSubheader () {
        await expect(this.loginPageTitle).toBeDisplayed();
        await expect(this.subheader).toBeDisplayed();

        await expect(this.loginPageTitle).toHaveText("Login Page");
        await expect(this.subheader).toHaveText("This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.");
    }

    /**
     * use helper populate user fn and select submit button fn to login
     */
    async login (username, password) {
        await this._populateUser(username, password);
        await this._selectSubmitBtn();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
