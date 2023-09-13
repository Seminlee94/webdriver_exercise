const { $ } = require('@wdio/globals')
const Page = require('./page');
const expect = require('chai').expect
import fs from "fs"

const userDataRaw = fs.readFileSync("test/utils/userData.json");
const userData = JSON.parse(userDataRaw);

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DataTablePage extends Page {
    /**
     * define selectors using getter methods
     */
    get dataTablesTitle() {
        return $('h3');
    }

    get firstTable() {
        return $('#table1');
    }

    /**
     * use email to look for the row of target user and select
     * edit or delete button
     * and assert the url
     * @param {string} userEmail 
     * @param {string} btn 
     */
    async selectActionBtn(userEmail, btn) {
        const userByEmail = userData[userEmail];
        const rows = await (await this.firstTable).$$('tbody tr');
        if (userByEmail) {
            for (const row of rows) {
                const emailCell = await row.$$('td')[2];
                const email = await emailCell.getText();

                if (email === userEmail) {
                    const actionCell = await row.$$('td')[5];
                    const actionBtn = await actionCell.$(`a[href="#${btn}"]`);
                    expect(await actionBtn.getText()).to.equal(btn);
                    await actionBtn.click();
                }
            }
        } else {
            expect(userByEmail).to.be.an('undefined');
        }
    }

    /**
     * assert the column headers
     */
    async assertColumnTitle() {
        const columns = await (await this.firstTable).$$('thead th');
        expect(await (columns[0].getText())).to.equal("Last Name");
        expect(await (columns[1].getText())).to.equal("First Name");
        expect(await (columns[2].getText())).to.equal("Email");
        expect(await (columns[3].getText())).to.equal("Due");
        expect(await (columns[4].getText())).to.equal("Web Site");
        expect(await (columns[5].getText())).to.equal("Action");
    }

    /**
     * take in user's email, look for the user in the table 
     * and assert the table data
     * @param {string} userEmail 
     */
    async assertRowsByEmail(userEmail) {
        // Locate all rows within the table's body
        const rows = await (await this.firstTable).$$('tbody tr');

        // Fetch user's data by email
        const userByEmail = userData[userEmail];
        // Iterate through each row in the table if email exists
        // if not, expect that user does not exist
        if (userByEmail) {
            for (const row of rows) {
                const emailCell = await row.$$('td')[2];
                const email = await emailCell.getText();

                if (email === userEmail) {
                    const lastNameCell = await row.$$('td')[0];
                    const lastName = await lastNameCell.getText();
                    const firstNameCell = await row.$$('td')[1];
                    const firstName = await firstNameCell.getText();
                    const dueCell = await row.$$('td')[3];
                    const due = await dueCell.getText();
                    const webSiteCell = await row.$$('td')[4];
                    const webSite = await webSiteCell.getText();

                    expect(lastName).to.equal(userByEmail["Last Name"]);
                    expect(firstName).to.equal(userByEmail["First Name"]);
                    expect(email).to.equal(userByEmail["Email"]);
                    expect(due).to.equal(userByEmail["Due"]);
                    expect(webSite).to.equal(userByEmail["Web Site"]);
                }
            }
        } else {
            expect(userByEmail).to.be.an('undefined');
        }

    }
    
    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('tables');
    }
}

module.exports = new DataTablePage();
