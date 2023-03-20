import {useEffect, useRef, useState} from 'react';
import {SortTypes} from '../../const';

function CardSortingMenu(): JSX.Element {
  const menuArrowRef = useRef(null);
  const [isOpened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SortTypes.DEFAULT);

  const handleOptionClick = (value: SortTypes) => {
    setSelectedOption(value);
  };

  const palcesOptions = Object.values(SortTypes).map((value, index) => (
    <li
      key={`places__option_${index.toString()}`}
      className="places__option"
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
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpened(!isOpened)} ref={menuArrowRef}>
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
        &nbsp;{selectedOption}
      </span>
      <ul className={`places__options places__options--custom places__options${isOpened ? '--opened' : ''}`}>
        {palcesOptions}
      </ul>
    </form>
  );
}

export default CardSortingMenu;