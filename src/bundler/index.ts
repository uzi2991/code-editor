import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let init = false;

export const initBundler = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.47/esbuild.wasm'
  });
};

export const esbuildBundle = async (rawCode: string) => {
  if (!init) {
    await initBundler();
    init = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        // 'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });

    return {
      code: result.outputFiles[0].text,
      err: ''
    };
  } catch (err: any) {
    return {
      code: '',
      err: err.message as string
    };
  }
};
