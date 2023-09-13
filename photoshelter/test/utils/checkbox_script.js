const { remote } = require('webdriverio');
const { baseUrl } = require("./config")

async function clickCheckboxesRandomly() {
  // Set up WebdriverIO options
  const options = {
    capabilities: {
      browserName: 'chrome',
    },
  };

  // Initialize the WebDriver session
  const browser = await remote(options);

  try {
    await browser.url(`${baseUrl}checkboxes`);

    // Locate the checkboxes using CSS selectors
    const checkboxes = await browser.$$('[type="checkbox"]');

    // Function to generate a random number between 1 and 10
    function getRandomClicks() {
      return Math.floor(Math.random() * 10) + 1;
    }

    // Click each checkbox a random number of times
    for (const checkbox of checkboxes) {
      const randomClicks = getRandomClicks();
      for (let i = 0; i < randomClicks; i++) {
        await checkbox.click();
      }
    }
  } finally {
    await browser.deleteSession();
  }
}

// Call the function
clickCheckboxesRandomly();
