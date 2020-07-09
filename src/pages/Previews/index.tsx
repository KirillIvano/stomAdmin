import React, {useEffect, useContext, useCallback} from 'react';
import {observer} from 'mobx-react';

import {
    Preloader,
    ErrorView,
    LayoutContainer,
    Button,
} from '@/uikit';
import {EntityCard, PageHeadline} from '@/components';
import {categoriesPreviewsStore} from '@/entities/categoryPreview/store';
import {ModalFacadeContext, ModalOpener} from '@/helpers/modals';

import {previewsGetStore} from './localStore';
import {withModalManager} from './modals';
import {ModalType} from './modals/types';

const PreviewsPage = observer(() => {
    useEffect(
        () => {
            previewsGetStore.getPreviews();
        }, [],
    );

    const {openModal} = useContext(ModalFacadeContext) as ModalOpener<ModalType>;
    const openCreateModal = useCallback(() => openModal('preview_create'), []);
    const openDeleteModal = useCallback((id: string) => openModal('preview_delete', id), []);

    const {loading, error} = previewsGetStore;

    if (loading) return <Preloader />;
    if (error) return <ErrorView>{error}</ErrorView>;

    return (
        <LayoutContainer>
            <PageHeadline>Превью категорий</PageHeadline>
            <Button onClick={openCreateModal}>Добавить превью</Button>

            {categoriesPreviewsStore
                .previewsArray
                .map(
                    ({id, name}) => (
                        <EntityCard
                            key={id}
                            name={name}
                            id={id}

                            handleDeleteClick={openDeleteModal}
                        />
                    ),
                )
            }
        </LayoutContainer>
    );
});

export default withModalManager(PreviewsPage);
