'use strict';
import fs from 'fs';
import Wasi from 'wasi';
const { WASI } = Wasi;
const wasi = new WASI({
  args: process.argv,
  env: process.env,
  preopens: {
    '/sandbox': '/some/real/path/that/wasm/can/access'
  }
});
const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

(async () => {
  const wasm = await WebAssembly.compile(fs.readFileSync('./binary.wasm'));
  const instance = await WebAssembly.instantiate(wasm, importObject);

  wasi.start(instance);
})();
