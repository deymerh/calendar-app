import { uiCloseModal, uiOpenModal } from '../actions/ui';
import { uiReducer } from './uiReducer';

describe('Test in the file [authReducer]', () => {

  const initialState = {
    modalOpen: false
  };

  test('should return the default state', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should to open the modal', () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    expect(state.modalOpen).toBe(true);
  });

  test('should to close the modal', () => {
    const modalClose = uiCloseModal();
    const state = uiReducer(initialState, modalClose);
    expect(state.modalOpen).toBe(false);
  });

});