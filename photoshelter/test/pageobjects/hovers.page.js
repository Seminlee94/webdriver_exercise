const { $, expect } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HoversPage extends Page {
    /**
     * define selectors using getter methods
     */
    get hoversPageTitle() {
        return $('h3');
    }

    get allUsers() {
        return $$('.figure');
    }

    /**
     * assert Hover page title
     */
    async assertTitle() {
        await expect(this.hoversPageTitle).toBeDisplayed();
        await expect(this.hoversPageTitle).toHaveText("Hovers");
    }

    /**
     * assert that all users' profile can be viewed
     */
    async assertAllUsers() {
        // assert all users avatar
        for (const user of await this.allUsers) {
            // Hover
            await user.moveTo();

            // Locate profile caption selectors
            const userInfoCap = await user.$('.figcaption');
            const userInfo = await userInfoCap.$('h5');
            const userViewProfile = await userInfoCap.$('a');
            const username = await userInfo.getText();
            const userIndex = username.charAt(username.length-1)
            await expect(await userInfo).toBeDisplayed();

            // Click the user link
            await userViewProfile.click();

            // Wait for the "Not Found" text to appear on the page
            await browser.waitUntil(async () => {
                return await $('h1=Not Found').isDisplayed();
            }, { timeout: 5000, timeoutMsg: 'User profile not found.' });

            await expect(browser).toHaveUrlContaining(`/users/${userIndex}`);
            
            // Navigate back to the previous page
            await browser.back();
            await expect(browser).not.toHaveUrlContaining(`/${userIndex}`);
        }
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('hovers');
    }
}

module.exports = new HoversPage();
