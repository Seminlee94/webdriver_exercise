# PhotoShelter SDET test

## Set up & run
- To run the test, install the dev dependencies by running
`npm install` 
- After dependencies have been installed, run the test by running `npm run wdio`

## Improvements
There are couple of places where I would make some improvements.

- Usage of testdata-id locators when defining selectors
- Since asserting title is prevalent throughout pages, move `assertTitle()` to `page.js`, so that it can be used child of `Page` class. I haven't done this because title of some pages (`login` and `secure`) use h2 for title while others use h3. If testdata-id is used, we can unify those, so this can be achieved. 
- In `data-table.page.js`, `assertRowsByEmail(email)` function takes in only one email at a time. Instead, it would be better to take in array of emails and assert their rows. 
