import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import { ReviewData } from '../../types/state';
import { fetchReviewsAction, sendReviewAction } from '../api-actions';

const initialState: ReviewData = {
  reviews: [],
  commentPendingStatus: false,
  hasError: false
};

export const reviewData = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.hasError = false;
        state.commentPendingStatus = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.commentPendingStatus = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.hasError = true;
        state.commentPendingStatus = false;
      });
  }
});
