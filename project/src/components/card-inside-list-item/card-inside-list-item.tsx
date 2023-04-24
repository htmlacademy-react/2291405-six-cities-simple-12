type CardInsideListItemProps = {
  good: string;
}

function CardInsideListItem({good}: CardInsideListItemProps): JSX.Element {
  return (
    <li className="property__inside-item">
      {good}
    </li>
  );
}

export default CardInsideListItem;
