import { CustomSerializer, RouterQuery } from './router.reducer';
import { AppState } from './app.reducer';

const testParams = { one: '1', two: '2' };

describe('CustomSerializer', () => {
  it('should serialize router snapshot', () => {
    const serializer = new CustomSerializer();
    const testSnapshot = {
      url: '/test-url',
      root: {
        queryParams: testParams,
        firstChild: {
          firstChild: {
            firstChild: { params: testParams },
          },
        },
      },
    };
    const expected = {
      url: '/test-url',
      params: testParams,
      queryParams: testParams,
    };

    const serialized = serializer.serialize(<any>testSnapshot);

    expect(serialized).toEqual(expected);
  });
});

describe('Router Queries', () => {
  const testState: AppState = {
    router: {
      state: { url: '/login', params: testParams, queryParams: testParams },
      navigationId: 1,
    },
  };

  describe('getState', () => {
    it('should select router state from slice', () => {
      const expected = testState.router.state;

      const actual = RouterQuery.getState(testState);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUrl', () => {
    it('should select route url', () => {
      const expected = testState.router.state.url;

      const actual = RouterQuery.getUrl(testState);

      expect(actual).toEqual(expected);
    });
  });

  describe('getParams', () => {
    it('should select route params', () => {
      const expected = testState.router.state.params;

      const actual = RouterQuery.getParams(testState);

      expect(actual).toEqual(expected);
    });
  });

  describe('getQueryParams', () => {
    it('should select route queryParams', () => {
      const expected = testState.router.state.queryParams;

      const actual = RouterQuery.getQueryParams(testState);

      expect(actual).toEqual(expected);
    });
  });
});
