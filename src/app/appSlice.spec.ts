import { appActions, appReducer } from "./appSlice";


describe('appReducer', () => {
  const initialState = {
    error: null,
    isLoading: false,
  };

  it('should handle setError', () => {
    const action = appActions.setError({ error: 'Test error'});
    const newState = appReducer(initialState, action);
    expect(newState.error).toEqual('Test error');
  });

  it('should handle setIsLoading', () => {
    const action = appActions.setIsLoading({ isLoading: true });
    const newState = appReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('should handle pending action', () => {
    const action = { type: 'app/someAction/pending' };
    const newState = appReducer(initialState, action);
    expect(newState.isLoading).toEqual(true);
  });

  it('should handle fulfilled action', () => {
    const action = { type: 'app/someAction/fulfilled' };
    const newState = appReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
  });


  it('should not show global error if showGlobalError is false', () => {
    const action = {
      type: 'app/someAction/rejected',
      payload: { errorMessage: 'Test error', showGlobalError: false },
    };
    const newState = appReducer(initialState, action);
    expect(newState.isLoading).toEqual(false);
    expect(newState.error).toBeNull();
  });
});
