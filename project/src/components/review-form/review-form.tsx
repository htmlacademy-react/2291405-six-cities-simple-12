import {ChangeEvent, useState, useEffect, Fragment, FormEvent } from 'react';
import {MIN_CHARACTER_COMMENT, MAX_CHARACTER_COMMENT, RATING_STARS_COUNT} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReviewData } from '../../types/review-data';
import { sendReviewAction } from '../../store/api-actions';
import Offer from '../../types/offer';
import { getOffer } from '../../store/app-data/selectors';
import { getCommmentPendingStatus, getErrorStatus } from '../../store/review-data/selectors';
import {toast} from 'react-toastify';

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const hasError = useAppSelector(getErrorStatus);
  const isCommmentSending = useAppSelector(getCommmentPendingStatus);

  const onSubmit = (reviewData: ReviewData) => {
    dispatch(sendReviewAction(reviewData));
    if (hasError) {
      toast.warn('Send error. Comment not sent!');
    }else{
      clearForm();
    }
  };

  const offer = useAppSelector(getOffer) as Offer;
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      hotelId: offer.id,
      comment: review,
      rating: rating,
    });
  };

  useEffect(() => {
    const isDisable = !!(review.length > MAX_CHARACTER_COMMENT || review.length < MIN_CHARACTER_COMMENT || rating === 0);
    setSubmitDisabled(isDisable);
  }, [rating, review]);

  const onReviewChangeHandle = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(target.value);
  };

  const clearForm = () => {
    if (rating) {
      const ratingElement = document.getElementById(`${rating}-stars`);
      if (ratingElement) {
        (ratingElement as HTMLInputElement).checked = false;
      }
    }

    setRating(0);
    setReview('');
    setSubmitDisabled(false);
  };

  const ratingValues = Array.from({length: RATING_STARS_COUNT}, (_, index) => index + 1);

  return (
    <form className="reviews__form form" action="" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingValues.reverse().map((value: number) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={() => setRating(value)}
              disabled={isCommmentSending}
              alt="rating-star"
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>)
        )}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onReviewChangeHandle}
        value={review}
        disabled={isCommmentSending}
        data-testid="review"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_CHARACTER_COMMENT} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled || isCommmentSending}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
