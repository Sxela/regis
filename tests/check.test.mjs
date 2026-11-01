import test from 'node:test';
import assert from 'node:assert/strict';
import {hasSourceProjectDependency} from '../scripts/check.mjs';

test('portable documentation permits HTTPS tool links while rejecting drive paths', () => {
  assert.equal(hasSourceProjectDependency('[tool](https://example.org/skill.md)'), false);
  assert.equal(hasSourceProjectDependency('[tool](http://example.org)'), false);
  for (const value of ['C:/private/assets', 'path: d:/private', 'c:\\private\\assets', '(E:/models)']) {
    assert.equal(hasSourceProjectDependency(value), true, value);
  }
});
