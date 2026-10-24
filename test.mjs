import{test}from'node:test';import assert from'node:assert/strict';import{readFile}from'node:fs/promises';
test('teaching fixture contains no private credential or claims of live network state',async()=>{const t=await readFile(new URL('index.mjs',import.meta.url),'utf8');assert.match(t,/Synthetic teaching snapshot/);assert.match(t,/never hold live funds/);assert.doesNotMatch(t,/S[A-Z2-7]{55}/)});
