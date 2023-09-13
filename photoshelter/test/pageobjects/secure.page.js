const { $ } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert () {
        return $('#flash');
    }

    get securePageTitle () {
        return $('h2');
    }

    get subheader () {
        return $('.subheader');
    }

    get btnLogout () {
        return $('.icon-2x.icon-signout');
    }

    /**
     * assert error toast message when invalid credential is used
     */
    async assertFlashAlert () {
        await expect(this.flashAlert).toBeDisplayed();
        await expect(this.flashAlert).toHaveTextContaining('You logged into a secure area!');
    }

    /**
     * assert logout btn and select
     */
    async selectLogoutBtn () {
        await expect(this.btnLogout).toBeDisplayed();
        await expect(this.btnLogout).toHaveText("Logout");
        await this.btnLogout.click();
    }
        
    /**
     * Assert Login Page title and subheader
     */
    async assertTitleAndSubheader () {
        await expect(this.securePageTitle).toBeDisplayed();
        await expect(this.subheader).toBeDisplayed();

        await expect(this.securePageTitle).toHaveText("Secure Area");
        await expect(this.subheader).toHaveText("Welcome to the Secure Area. When you are done click logout below.");
    }
}

module.exports = new SecurePage();
