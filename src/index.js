import "./styles.css";
import Plant from "@plant/plant";

import router from "./routes";
import { sendRequest } from "./request";
import { renderResponse } from "./response";

async function errorHandler({ res }, next) {
  try {
    await next();
    if (!res.hasBody) {
      res.setStatus(404);
      res.html("<html><body>Nothing found</body></html>");
    }
  } catch (err) {
    res.setStatus(500);
    res.text("Server error:\n\n" + err.stack.toString());
  }
}

// Instantiate the server
const plant = new Plant();

plant.use(errorHandler);

plant.use(async ({ res }, next) => {
  await next();

  if (res.hasBody && !res.headers.has("content-security-policy")) {
    res.headers.set("content-security-policy", "default-src 'self'");
  }
});

plant.use("/style.css", ({ res }) => {
  res.headers.set("content-type", "text/css");
  res.body = `
    body {
      background: blue;
    }
    html {
      font-family: sans-serif;
    }
  `;
});
plant.use("/", async ({ res }) => {
  res.html(`
    <html>
      <head>
        <title>Plant</title>
        <link rel="stylesheet" type="text/css" href="/style.css"/>
      </head>
      <body>
        <h1>Plant</h1>
        <p>This is a built-in web server response!</p>
        <p>Test route:</p>
        <ul>
          <li>
            <a href="/greet" target="_parent">Greet</a>
          </li>
          <li>
            <a href="/404" target="_parent">Not found page</a>
          </li>
          <li>
            <a href="/500" target="_parent">Error page</a>
          </li>
        </ul>
      </body>
    </html>
  `);
});
plant.use(router);

setTimeout(() => {
  sendRequest(plant.getHandler(), new URL(window.location))
    .then(({ res }) => {
      const el = document.getElementById("app");
      renderResponse(el, res);
    })
    .catch(console.error);
}, 100);
