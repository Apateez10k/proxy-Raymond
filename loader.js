const util = require('util');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const services = require('./services.json');

const writeFile = util.promisify(fs.writeFile);

const bundleLoader = (clientPath, serverPath, cssPath) => {
  const bundleFetches = services.map((service) => {
    const clientFile = path.join(__dirname, `${clientPath}${service.name}.js`);
    const serverFile = path.join(__dirname, `${serverPath}${service.name}.js`);
    const cssFile = path.join(__dirname, `${cssPath}${service.name}.css`);

    return fetch(service.clientUrl)
      .then(res => res.text())
      .then(text => writeFile(clientFile, text))

      .then(() => fetch(service.cssUrl))
      .then(res => res.text())
      .then(text => writeFile(cssFile, text))

      .then(() => fetch(service.serverUrl))
      .then(res => res.text())
      .then(text => writeFile(serverFile, text))
      .then(() => {
        console.log('server file path: ', serverFile);
        service.Component = require(serverFile).default;
        return service;
      });
  });
  return Promise.all(bundleFetches);
};

module.exports = bundleLoader;
