const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send user</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/user-list") {
    res.write(`<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>My first page</h1>
      <ol>
        <li>users</li>
        <li>users</li>
        <li>users</li>
        <li>users</li>
      </ol>
    </body>
  </html>
  `);
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      fs.writeFile("users.txt", user, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/user-list");
        return res.end();
      });
    });
  }

}

// module.exports = requestHandler;
module.exports.handler = requestHandler;
