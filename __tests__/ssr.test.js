const bundleLoader = require('../loader.js');
const axios = require('axios');
const fs = require('fs');
const Promise = require('bluebird');

const exists = Promise.promisify(fs.stat);

describe('loader function should', () => {
  test('load client bundle, server bundle, and stylesheet', () => {
    const clientBundlePath = './__mocks__/clientBundles/';
    const serverBundlePath = './__mocks__/serverBundles/';
    const cssBundlePath = './__mocks__/clientBundles/';
    const bundleArr = [`${clientBundlePath}Gallery.js`, `${serverBundlePath}Gallery.js`, `${cssBundlePath}Gallery.css`];
    bundleLoader(clientBundlePath, serverBundlePath, cssBundlePath)
      .then(() => {
        Promise.all(bundleArr.map(filename => exists(filename)))
          .then((result) => {
            expect(result).not.toBe(null);
            expect(result.length).toBe(3);
          })
          .catch((err) => {
            expect(err).not.toBe(err);
          });
      })
      .catch((err) => {
        console.log('bundle not loaded: ', err);
        expect(err).not.toBe(err);
      });
  });
});

describe('fetchBundles should', () => {
  test('fetch bundles', (done) => {
    axios('http://localhost:3000/restaurants/6')
      .then((response) => {
        // console.log('response: ', response);
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('string');
        done();
      })
      .catch((err) => {
        expect(err).not.toBe(err);
        console.log('error: ', err);
        done();
      });
  });
});
