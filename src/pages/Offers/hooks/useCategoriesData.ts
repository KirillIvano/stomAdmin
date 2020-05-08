import {useDataLoad} from '@/hooks/useDataLoad';
import {getCategories} from '@/services/offers';

export const useCategoriesData = () => useDataLoad(getCategories);
