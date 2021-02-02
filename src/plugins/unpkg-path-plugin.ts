import * as esbuild from 'esbuild-wasm';
import axios from "axios";
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

// TEST
// (async () => {
//   await fileCache.setItem('color', 'red');
//
//   const color = await fileCache.getItem('color');
//
//   console.log(color)
// })();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    // override esbuild's natural behavior
    setup(build: esbuild.PluginBuild) {
      build.onResolve({filter: /.*/}, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js') {
          return {path: args.path, namespace: 'a'};
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, `https://unpkg.com/${args.resolveDir}/`).href
          }
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });

      build.onLoad({filter: /.*/}, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import lodash from 'lodash';
              import {useState} from 'react';
              const react = require('react');
              const reactDOM = require('react-dom');
              console.log(react, reactDOM, lodash);
            `,
          };
        }

        // Check to see if we have already fetched this
        // and if it is in the cache
        // getItem is a generic function, describe the type that getItem would return
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult
        }

        const {data, request} = await axios.get(args.path);
        console.log(request, 'request');

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };

        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};