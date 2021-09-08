import { fetchWithoutToken, fetchWithToken } from "./fetch";

describe('Tests in the file fetch.js', () => {
  let token;
  test('Test in the function fetchWithoutToken', async () => {
    const user = {
      "email": "deymerh@hotmail.com",
      "password": "123456"
    }
    const response = await fetchWithoutToken('auth', user, 'POST');
    expect(response instanceof Response).toBe(true);
    const succes = await response.json();
    expect(succes.ok).toBe(true);
    token = succes.token
  });

  test('Test in the function fetchWithToken', async () => {
    localStorage.setItem('token', token);
    const response = await fetchWithToken('events/6135196b6e39672c193ab45c', {}, 'DELETE');
    const succes = await response.json();
    const msg = 'No tienes permiso para eliminar este evento';
    expect(succes.msg).toBe(msg);
  });

});
