import Review from '../../types/review';

function ReviewsItem(review: Review): JSX.Element {
  const reviewDate = new Date(review.date);

  const monthName = reviewDate.toLocaleString('en-EN', { month: 'long' });
  const reviewValueDate = review.date.substring(0, 10);
  const reviewViewDate = `${monthName} ${reviewDate.getFullYear()}`;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating * 20)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={reviewValueDate}>{reviewViewDate}</time>
      </div>
    </li>
  );
}

export default ReviewsItem;
