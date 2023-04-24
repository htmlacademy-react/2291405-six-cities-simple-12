import { useCallback, useEffect, useState } from 'react';
import Map from '../../components/map/map';
import CardList from '../card-list/card-list';
import { getCurrentCity, getOffers } from '../../store/app-data/selectors';
import Offer from '../../types/offer';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSortedOffers } from '../../common';
import { SortTypes } from '../../const';
import CardSortingMenu from '../card-sorting-menu/card-sorting-menu';
import { setActiveOfferId } from '../../store/app-data/app-data';


const getOffersByCity = (city: string, offers: Offer[]) => offers.filter((offer) => offer.city.name === city);

function OffersContainer(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getCurrentCity);

  const [currentOffers, setCurrentOffers] = useState<Offer[]>([]);
  const [currentSortType, setCurrentSortType] = useState<SortTypes>(SortTypes.Default);

  const handleChangeSelectedCard = useCallback((cardId: null | number) => {
    dispatch(setActiveOfferId(cardId));
  }, [dispatch]);

  useEffect(() => {
    let cityOffers = getOffersByCity(activeCity, offers);
    cityOffers = getSortedOffers(cityOffers, currentSortType);
    setCurrentOffers(cityOffers);
  }, [dispatch, activeCity, offers, currentSortType]);

  return (
    (currentOffers.length) ?
      <div className="cities">
        <div className="cities__places-container container">
          <CardList
            offers={currentOffers}
            sectionClassName='cities__places'
            listClassName='cities__places-list'
            onChangeSelectedCard={handleChangeSelectedCard}
          >
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {activeCity}</b>
            <CardSortingMenu onChangeSortType={(sortType) => setCurrentSortType(sortType) }/>
          </CardList>
          <div className="cities__right-section">
            <Map city={currentOffers[0].city} offers={currentOffers} classNameMap={'cities__map map'}/>
          </div>
        </div>
      </div>
      :
      <NotFoundPage>
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
      </NotFoundPage>
  );
}

export default OffersContainer;
