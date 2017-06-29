const http = require('http');
const util = require('util');
const fs = require('fs');
const port = 3003;
const hostname = '0.0.0.0';

const configpath = process.env['CONFIGPATH'];
console.log(configpath);

// File loading and re-loading on change
var fileContents = null;
console.log(`configpath to read: ${configpath}`);
if (configpath) {
  const reload = function() {
    // Read initial file
    fs.readFile(configpath, 'utf8', (err, data) => {
      if (err) return console.log(err);
      console.log(`read file: ${data}`);
      fileContents = data;
    });
  }
  reload();
  // Watch it for changes and reload
  fs.watchFile(configpath, (curr, prev) => {
    console.log(`${configpath} reloaded`);
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
    reload();
  });
}



// server
http.createServer((req, res) => {


  console.log(`start request ${req.method}`);
  console.log(`request body: ${req.rawBody}`);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">');
  res.write('<body>');
  res.write("<div class='container'>")
  res.write("<h1>node-cd</h1>");
  res.write("<div>&nbsp</div>");

  if (fileContents) {
    res.write("<h3>file contents</h3>");
    res.write(fileContents);
    res.write("<br>");
  }

  res.write("<h3>headers</h3>");
  res.write("<table class='table'>")
  for (k in req.headers) {
    res.write("<tr>");
    res.write(`<th>${k}</th>`);
    res.write(`<td>${req.headers[k]}</td>`);
    res.write("</tr>");
    console.log(`${k}: ${req.headers[k]}`);
  };
  res.write("</table>")

  res.write("<h3>env vars</h3>");
  res.write("<table class='table'>")
  // const keys = ['ENV', 'ZONE', 'CLUSTER', 'CONSUL_IP', 'CONSUL_PORT', 'LABELS]
  // keys.forEach((k) => {
  for (k in process.env) {
    res.write("<tr>");
    res.write(`<th>${k}</th>`);
    res.write(`<td>${process.env[k]}</td>`);
    res.write("</tr>");
  };
  res.write("</table>")


  res.write("</div>")
  res.write('</body>');
  res.end();
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

