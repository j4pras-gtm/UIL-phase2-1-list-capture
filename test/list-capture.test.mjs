import test from 'node:test';
import assert from 'node:assert/strict';
import { captureList } from '../src/ListCaptureModule.mjs';

test('implementation entry point exists and must be replaced by the implementing session', () => {
  assert.throws(() => captureList({ source: 'linkedin-list', cards: [], limit: 10 }), /Not implemented/);
});
