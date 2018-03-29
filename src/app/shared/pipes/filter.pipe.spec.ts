import { FitlerCommandsPipe, FilterModelsPipe } from './filter.pipe';

describe('FilterCommandsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCommandsPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('FilterModelsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterModelsPipe();
    expect(pipe).toBeTruthy();
  });
});
