enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer',
}

enum PlaceTypes {
  Apartment = 'Apartment',
  Room = 'Private Room',
  House = 'House',
  Hotel = 'Hotel',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum SortTypes {
  Default = 'Popular',
  PriceUp = 'Price: low to high',
  PriceDown = 'Price: high to low',
  Rating = 'Top rated first'
}

enum CommentСharacteristics {
  MinCharCount = 50,
  MaxCharCount = 300,
}

const RATING_STARS_COUNT = 5;

const MAX_COUNT_COMMENTS = 10;
const MAX_PHOTOGALLERY_COUNT = 6;

enum MarkerUrls {
  Default = '../img/pin.svg',
  Current = '../img/pin-active.svg',
}

const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
const REQUEST_TIME = 5000;
const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

enum NameSpace {
  Data = 'DATA',
  Review = 'REVIEW',
  User = 'USER',
}

export {
  AppRoute,
  APIRoute,
  PlaceTypes,
  AuthorizationStatus,
  SortTypes,
  NameSpace,
  CommentСharacteristics,
  MarkerUrls,
  BACKEND_URL,
  REQUEST_TIME,
  AUTH_TOKEN_KEY_NAME,
  CITIES,
  RATING_STARS_COUNT,
  MAX_COUNT_COMMENTS,
  MAX_PHOTOGALLERY_COUNT,
};
