import { ObjectKeysPipe } from './object-iterators.pipe';

describe('ObjectIteratorsPipe', () => {
  it('create an instance', () => {
    const pipe = new ObjectKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
