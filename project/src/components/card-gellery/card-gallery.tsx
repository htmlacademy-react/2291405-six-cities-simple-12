import { MAX_PHOTOGALLERY_COUNT } from '../../const';
import CardGalleryItem from '../card-gallery-item/card-gallery-item';

type CardGalleryProps = {
  images: string[];
  offerType: string;
}

function CardGallery({images, offerType}: CardGalleryProps): JSX.Element {

  const cardGalleryItems = images.slice(0, MAX_PHOTOGALLERY_COUNT).map((img) => (
    <CardGalleryItem key={img} imageUrl={img} offerType={offerType}/>
  ));

  return (
    <div className="property__gallery">
      { cardGalleryItems }
    </div>
  );
}

export default CardGallery;
