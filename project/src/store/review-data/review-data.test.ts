import { reviewData } from './review-data';
import { ReviewData } from '../../types/state';
import { makeFakeReviews } from '../../utils/mocks';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

const fakeReviews = makeFakeReviews();
const getModifiedState = (state: ReviewData) => JSON.parse(JSON.stringify(state)) as ReviewData;

describe('Reducer: reviewData', () => {
  let initialState: ReviewData;
  beforeEach(() => {
    initialState = {
      reviews: [],
      commentPendingStatus: false,
      hasError: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(
        initialState
      );
  });

  it('should update reviews by load reviews', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.reviews = fakeReviews;
    expect(reviewData.reducer(initialState, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
      .toEqual(modifiedState);
  });

  it('should update reviews after send review', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.hasError = false;
    modifiedState.commentPendingStatus = true;
    expect(reviewData.reducer(initialState, {type: sendReviewAction.pending.type}))
      .toEqual(modifiedState);

    modifiedState.reviews = fakeReviews;
    modifiedState.hasError = false;
    modifiedState.commentPendingStatus = false;
    expect(reviewData.reducer(initialState, {type: sendReviewAction.fulfilled.type, payload: fakeReviews}))
      .toEqual(modifiedState);

    modifiedState.reviews = [];
    modifiedState.hasError = true;
    modifiedState.commentPendingStatus = false;
    expect(reviewData.reducer(initialState, {type: sendReviewAction.rejected.type}))
      .toEqual(modifiedState);
  });

});
