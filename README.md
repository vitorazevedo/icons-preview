# Icons Preview

### View All Icons in Your SVG Sprites

SVG sprites are incredibly useful, but finding the right icon can be tricky without a preview. This often leads to repeated icons in projects.

### Usage Instructions:

1. Open the `icons-preview.js` file and list all your sprite names in the `sprites` array.
2. If you have NodeJS installed, run the following command: `npx live-server --entry-file=icons-preview.html`

### How It Works:

JavaScript sends requests to each SVG sprite, incorporates the code into the DOM, and loops through all symbol tags. It then gathers their IDs and constructs the UI using HTML templates.
