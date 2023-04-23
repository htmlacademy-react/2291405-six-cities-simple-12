import ReviewForm from '../../components/review-form/review-form';
import {AuthorizationStatus, PlaceTypes} from '../../const';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import CardGallery from '../../components/card-gellery/card-gallery';
import {getValueByKey} from '../../common';
import CardInsideList from '../../components/card-inside-list/card-inside-list';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearOffersAction, fetchOfferByIdAction, fetchReviewsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadSpinner from '../../components/loader-spinner/load-spinner';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getHasError, getNeighbours, getOffer } from '../../store/app-data/selectors';
import { setActiveOfferId } from '../../store/app-data/app-data';

function PropertyPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams() as {id: string};
  const hotelId = Number(id);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const hasError = useAppSelector(getHasError);

  useEffect(() => {
    if (!isNaN(hotelId)) {
      dispatch(fetchOfferByIdAction({ id : hotelId }));
      dispatch(fetchNearOffersAction({ id : hotelId }));
      dispatch(fetchReviewsAction({ id : hotelId }));
      dispatch(setActiveOfferId(null));
    }
  }, [hotelId, dispatch]);

  const currentOffer = useAppSelector(getOffer);
  const neighbours = useAppSelector(getNeighbours);
  const cardType = currentOffer ? getValueByKey<PlaceTypes>(currentOffer.type, PlaceTypes) : '';

  if (!currentOffer && (isNaN(hotelId) || hasError)) {
    return (
      <NotFoundPage>
        <b className="cities__status">404. Page not found</b>
        <Link to="/">Back to the main page</Link>
      </NotFoundPage>
    );
  }

  if (!currentOffer) {
    return (
      <LoadSpinner />
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <CardGallery images={currentOffer.images}/>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {currentOffer.isPremium &&
                  <div className="property__mark">
                    <span>{currentOffer.isPremium && 'Premium'}</span>
                  </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer.title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: `${(currentOffer.rating * 20)}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{ currentOffer.rating }</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {cardType}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {currentOffer.bedrooms} {currentOffer?.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
              </li>
              <li className="property__feature property__feature--adults">
                Max {currentOffer.maxAdults} {currentOffer.maxAdults > 1 ? 'adults' : 'adult'}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{ currentOffer.price }</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <CardInsideList goods={currentOffer.goods}/>

            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  { currentOffer.host.name }
                </span>
                <span className="property__user-status">
                  { currentOffer.host.isPro && 'Pro' }
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {currentOffer.description}
                </p>
              </div>
            </div>

            <section className="property__reviews reviews">
              <ReviewsList />
              { authStatus === AuthorizationStatus.Auth && <ReviewForm />}
            </section>
          </div>
        </div>
        <Map city={currentOffer.city} offers={neighbours} currentOffer={currentOffer} classNameMap='property__map map'/>
      </section>

      <div className="container">
        <CardList
          offers={neighbours}
          sectionClassName = 'near-places'
          listClassName = 'near-places__list'
          onChangeSelectedCard = {(e)=> e}
        >
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
        </CardList>
      </div>
    </main>
  );
}

export default PropertyPage;
