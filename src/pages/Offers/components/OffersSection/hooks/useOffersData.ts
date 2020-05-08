import {useDataLoad} from '@/hooks/useDataLoad';
import {getOffers} from '@/services/offers';

export const useOffersData = (categoryId: number) =>
    useDataLoad(() => getOffers(categoryId));
