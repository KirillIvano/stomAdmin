import React, { useEffect } from 'react';
import {observer} from 'mobx-react';

import {offerCategoriesStore} from '@/entities/offerCategory/store';
import {CustomSelect, Preloader, ErrorView} from '@/uikit';

import {categorySelectStore} from './localStore';


type CategorySelectProps = {
    handleSelect: (categoryId: string) => void;
}

const CategorySelect = observer(({handleSelect}: CategorySelectProps) => {
    const {loadCategories, loading, error} = categorySelectStore;

    useEffect(() => {
        loadCategories();
    }, []);

    if (loading) return <Preloader />;
    if (error) return <ErrorView>{error}</ErrorView>;

    return (
        <CustomSelect
            label={'Выберите категорию'}
            items={offerCategoriesStore.categoriesArray}

            handleSelect={handleSelect}
        />
    );
});

export default CategorySelect;
