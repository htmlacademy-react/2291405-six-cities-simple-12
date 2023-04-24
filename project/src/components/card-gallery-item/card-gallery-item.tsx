type CardGalleryItemProps = {
  offerType: string;
  imageUrl: string;
}

function CardGalleryItem({imageUrl, offerType}: CardGalleryItemProps): JSX.Element {
  return (
    <div className="property__image-wrapper" role="listitem">
      <img className="property__image" src={imageUrl} alt={offerType}/>
    </div>
  );
}

export default CardGalleryItem;
