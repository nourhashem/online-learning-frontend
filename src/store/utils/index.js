const KEY = 'redux';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(KEY, serializedState);
  } catch (e) {
    console.error(e);
  }
};
export { loadState, saveState };
