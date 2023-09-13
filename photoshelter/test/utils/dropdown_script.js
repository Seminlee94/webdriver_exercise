const { remote } = require('webdriverio');
const { baseUrl } = require("./config")

async function selectRandomOptionFromDropdown() {
  // Set up WebdriverIO options
  const options = {
    capabilities: {
      browserName: 'chrome',
    },
  };

  // Initialize the WebDriver session
  const browser = await remote(options);

  try {
    await browser.url(`${baseUrl}dropdown`);

    // Locate the elements
    const dropdown = await browser.$('#dropdown');
    const options = await dropdown.$$('option');

    // Select a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    await options[randomIndex].click();
  } finally {
    await browser.deleteSession();
  }
}

// Call the function when the script is executed
selectRandomOptionFromDropdown();
