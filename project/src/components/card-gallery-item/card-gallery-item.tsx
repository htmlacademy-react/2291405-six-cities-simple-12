type CardGalleryItemProps = {
  img: string;
}

function CardGalleryItem({img}: CardGalleryItemProps): JSX.Element {
  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={img} alt="Photo studio"/>
    </div>
  );
}

export default CardGalleryItem;