import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReviewForm from './review-form';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { makeFakeOffer, makeFakeReviews } from '../../utils/mocks';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockAPI = new MockAdapter(api);
const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      DATA: {
        offer: fakeOffer,
      },
      REVIEW: {
        reviews: [],
        hasError: false,
        commentPendingStatus: false,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });

  it('comment can be sent to server', () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/1`)
      .reply(200, []);

    const store = mockStore({
      DATA: {
        offer: fakeOffer,
      },
      REVIEW: {
        reviews: fakeReviews,
        commentPendingStatus: false,
        hasError: false,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm />
        </HistoryRouter>
      </Provider>
    );

    const star = screen.getAllByAltText('rating-star')[0];
    const textarea = screen.getByTestId('review');
    const sumbit = screen.getByRole('button');
    expect(sumbit).toBeDisabled();

    fireEvent.click(star);
    fireEvent.change(textarea, {target: { value: fakeReviews[0].comment }});
    expect(textarea).toBeEnabled();

  });
});
