import Offer from './offer';
import AuthData from '../types/auth-data';

type AppSettings = {
  offers: Offer[];
  authProps: AuthData;
};

export default AppSettings;
