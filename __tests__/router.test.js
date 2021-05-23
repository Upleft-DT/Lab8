/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';

describe('test pushToHistory', () => {

    test('settings', () => {
        expect(pushToHistory('settings', 0).state).toEqual(window.history.state);
        expect(pushToHistory('settings', 0).length != 0).toEqual(true);
      });

    test('settings', () => {
        expect(pushToHistory('entry', 0).state).toEqual(window.history.state);
        expect(pushToHistory('entry', 0).length != 0).toEqual(true);
    });

    test('default', () => {
        expect(pushToHistory('home', 0).state).toEqual(window.history.state);
        expect(pushToHistory('home', 0).length != 0).toEqual(true);
    });

});
