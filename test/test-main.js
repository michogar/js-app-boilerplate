import assert from 'assert';

import module from '../src/main';

describe('app', function () {
  it('is 42', function () {
    assert.equal(module, 42);
  });
});
