const express = require('express');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./loader.js');
const clientBundlePath = './dist/bundles/';
const serverBundlePath = './services/';
const cssBundlePath = './dist/bundles/';

const app = express();
app.use(morgan('dev'));
app.use(express.static('dist'));

const fetchBundles = () => (
  bundleLoader(clientBundlePath, serverBundlePath, cssBundlePath)
    .then((services) => {
      app.use('/restaurants/:id', (req, res) => {
        services.forEach((service) => {
          const elem = React.createElement(service.Component);
          service.html = ReactDOM.renderToString(elem);
        });
        res.send(template(services));
      });
    })
);

module.exports.fetchBundles = fetchBundles;
module.exports.app = app;
