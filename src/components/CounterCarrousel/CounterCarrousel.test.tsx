import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { PlayerColors } from '../../models/internal/types/PlayerColorEnum.model';
import { act } from 'react-dom/test-utils';
import * as useCounterHooks from './../../hooks/counter/counterHook'
import CounterCarrousel from './CounterCarrousel';
import { FirebasePlayerDto } from '../../models/dtos/firebaseStore/firebaseGameSettings.model';
import { useCounterMock } from '../../hooks/counter/counterHook.mock';
import { getDefaultPlayers } from '../../utils/playerFactory/playerFactory';

describe('CounterCarrousel', () => {
  let counterCarrouselStore: any;
  let history: any;

  let inputPlayer: FirebasePlayerDto;


  beforeEach(() => {
    counterCarrouselStore = createTestStore();
    history = createMemoryHistory();

    inputPlayer = getDefaultPlayers(40, 1)[0];
    jest.spyOn(useCounterHooks, 'useCounter')
    .mockImplementation(useCounterMock);
  });

  it('should create', () => {
    const { container } = render(
      <Provider store={counterCarrouselStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false}/>
        </Router>
      </Provider>,
    );

    expect(container).toBeDefined();
  });

  it('button removeCounters onClick should request useCounter removeCounters function', async () => {
    const inputColor = PlayerColors.blue;

    render(
      <Provider store={counterCarrouselStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false}/>
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'removeCounters' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(useCounterMock().removeCounters).toHaveBeenCalled()
  });

  it('button addCounters onClick should request useCounter addCounters function', async () => {
    const inputColor = PlayerColors.blue;

    render(
      <Provider store={counterCarrouselStore}>
        <Router location={history.location} navigator={history}>
          <CounterCarrousel player={inputPlayer} isRotated={false}/>
        </Router>
      </Provider>,
    );

    const button = screen.getByRole('button', { name: 'addCounters' });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(useCounterMock().addCounters).toHaveBeenCalled()
  });

});
