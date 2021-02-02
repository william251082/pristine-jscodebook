import * as esbuild from 'esbuild-wasm';
import axios from "axios";

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
              import ladash from 'lodash';
              import {useState} from 'react';
              const react = require('react');
              const reactDOM = require('react-dom');
              console.log(react, reactDOM, lodash);
            `,
          };
        }

        const {data, request} = await axios.get(args.path);
        console.log(request, 'request');
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
      });
    },
  };
};