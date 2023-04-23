import {NameSpace} from '../../const';
import Review from '../../types/review';
import {State} from '../../types/state';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].reviews;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Review].hasError;
export const getCommmentPendingStatus = (state: State): boolean => state[NameSpace.Review].commentPendingStatus;
