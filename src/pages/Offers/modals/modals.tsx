import React, {useState, useEffect} from 'react';
import classnames from 'classnames';

import {ConfirmationModal} from '@/components';
import {useInputState} from '@/hooks/useInputState';
import {
    Modal,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {
    useOffersModalsState,
    useOffersModalsDispatch,
    useOfferDelete,
    useOfferCreate,
} from './hooks';
import {closePresentOfferModal} from './actions';

export const ModalManager = () => {
    const {openedModal, selectedItemId} = useOffersModalsState();
    const modalDispatch = useOffersModalsDispatch();

    const close = () => modalDispatch(closePresentOfferModal());

    return (<>
        <OfferDeleteModal
            isOpen={openedModal === 'offer_delete'}
            close={close}
            entityId={selectedItemId}
        />

        <OfferCreateModal
            isOpen={openedModal === 'offer_create'}
            close={close}
            entityId={selectedItemId}
        />
    </>);
};

type CommonModalProps = {
    children?: React.ReactNode;
    entityId: number;
    isOpen: boolean;
    close: () => void;
}

type OfferCreateContentProps = {
    close: () => void;
    categoryId: number;
}

export const OfferCreateModalContent = ({close, categoryId}: OfferCreateContentProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const [createOffer, {loaded, error, loading}] = useOfferCreate();

    useEffect(() => {loaded && close();}, [loaded]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        if (value !== '' && isNaN(+value)) {
            setPriceError('Цена должна быть числом');
            return;
        }

        setPrice(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createOffer({
            name,
            price: +price,
            categoryId: categoryId,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                placeholder={'имя'}
                value={name}
                onChange={e => setName(e.currentTarget.value)}
            />
            <Input
                placeholder={'цена'}
                type={'number'}
                value={price}
                onChange={handlePriceChange}
            />

            <Button
                isDisabled={loading}
                type="submit"
            >
                Отправить
            </Button>

            {error && <ErrorView>{error}</ErrorView>}
        </form>
    );
};

export const OfferCreateModal = ({isOpen, close, entityId}) => (
    <Modal
        isOpen={isOpen}
        handleClose={close}
        closable={true}
    >
        <OfferCreateModalContent close={close} categoryId={entityId} />
    </Modal>
);

export const OfferDeleteModal = ({isOpen, close, entityId}: CommonModalProps) => {
    const [deleteOffer, {error, loaded}] = useOfferDelete();

    useEffect(
        () => {loaded && close();},
        [loaded],
    );

    return (<ConfirmationModal
        handleClose={close}
        handleConfirm={() => deleteOffer({id: entityId})}
        isOpen={isOpen}
        headline={'Заголовок'}
        content={error || 'asf sagdgas dga sgsad gas gsad'}
    />);
};

export const OfferEditModal = () => {

};
