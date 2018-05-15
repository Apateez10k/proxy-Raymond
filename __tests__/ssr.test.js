let bundleLoader = require('../loader.js');
const fs = require('fs');
const Promise = require('bluebird');
const exists = Promise.promisify(fs.stat);

describe('loader function should', () => {
  test('load client bundle, server bundle, and stylesheet', () => {
    let clientBundlePath = './__mocks__/clientBundles/';
    let serverBundlePath = './__mocks__/serverBundles/';
    let cssBundlePath = './__mocks__/clientBundles/';
    let bundleArr = [clientBundlePath + 'Gallery.js', serverBundlePath + 'Gallery.js', cssBundlePath + 'Gallery.css'];
    bundleLoader(clientBundlePath, serverBundlePath, cssBundlePath)
      .then(() => {
        Promise.all(bundleArr.map((filename) => {
          return exists(filename);
        }))
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
