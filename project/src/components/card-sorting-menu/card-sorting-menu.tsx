import {useEffect, useRef, useState} from 'react';
import {SortTypes} from '../../const';

type CardSortingMenuProps = {
  onChangeSortType?: (sortType: SortTypes) => void;
}

function CardSortingMenu({onChangeSortType}: CardSortingMenuProps): JSX.Element {
  const menuArrowRef = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SortTypes.Default);

  useEffect(() => {
    if (onChangeSortType) {
      onChangeSortType(selectedOption);
    }
  }, [onChangeSortType, selectedOption]);

  const handleOptionClick = (value: SortTypes) => {
    setSelectedOption(value);
  };

  const placesOptions = Object.values(SortTypes).map((value, index) => (
    <li
      key={`places__option_${index.toString()}`}
      className={`places__option ${value === selectedOption ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => handleOptionClick(value)}
    >{value}
    </li>
  ));

  useEffect(() => {
    if (!menuArrowRef) {
      return;
    }

    const handleMouseClick = (e: MouseEvent) => {
      if (e.target !== menuArrowRef.current) {
        setOpened(false);
      }
    };

    document.body.addEventListener('click', handleMouseClick);

    return () => document.body.removeEventListener('click', handleMouseClick);
  }, [isOpened]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpened(!isOpened)} ref={menuArrowRef} data-testid="sort-button">
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
        &nbsp;{selectedOption}
      </span>
      <ul className={`places__options places__options--custom places__options${isOpened ? '--opened' : ''}`} data-testid="list-options">
        {placesOptions}
      </ul>
    </form>
  );
}

export default CardSortingMenu;
