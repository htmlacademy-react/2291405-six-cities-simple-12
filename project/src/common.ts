import { SortTypes } from './const';
import Review from './types/review';
import Offer from './types/offer';

function getDisplayFormattedDateComment(date: string): string {
  const reviewDate = new Date(date);
  const monthName = reviewDate.toLocaleString('en-EN', { month: 'long' });
  return `${monthName} ${reviewDate.getFullYear()}`;
}

function setFirstSymbolToUpperCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getValueByKey<T>(offerType: string, enums: object): T{
  return Object.values(enums)[Object.keys(enums).indexOf(setFirstSymbolToUpperCase(offerType))] as T;
}

function sortCommentDateDown(reviews: Review[]) {
  const items = [...reviews];
  items.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  return items;
}

function getSortedOffers(offers: Offer[], sortType: SortTypes) : Offer[] {
  const items = [...offers];
  switch (sortType) {
    case SortTypes.PriceUp:
      items.sort((a, b) => a.price - b.price);
      break;
    case SortTypes.PriceDown:
      items.sort((a, b) => b.price - a.price);
      break;
    case SortTypes.Rating:
      items.sort((a, b) => b.rating - a.rating);
      break;
  }

  return items;
}

export {getValueByKey, sortCommentDateDown, getSortedOffers, getDisplayFormattedDateComment};
