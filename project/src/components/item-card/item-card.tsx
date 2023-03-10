import Card from '../../types/card';
import {PlaceTypes} from '../../const';
import {Link} from 'react-router-dom';


function getValueByKey(value: string) {
  const indexOfS = Object.keys(PlaceTypes).indexOf(value as unknown as PlaceTypes);
  return Object.values(PlaceTypes)[indexOfS];
}

function ItemCard(props: Card): JSX.Element {
  return (
    <article className="cities__card place-card">
      {props.isPremium &&
        <div className="place-card__mark">
          <span>{props.isPremium && 'Premium'}</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${props.id}`}>
          <img className="place-card__image" src={props.img} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width:  `${(props.raiting * 100 / 5).toString()}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${props.id}`}>{props.title}</Link>
        </h2>
        <p className="place-card__type">{ getValueByKey(props.type) }</p>
      </div>
    </article>
  );
}

export default ItemCard;
