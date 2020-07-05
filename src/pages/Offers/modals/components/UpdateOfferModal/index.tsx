import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';
import {offerStore} from '@/entities/offer/store';
import {SmartModalProps} from '@/helpers/modals';

import {offerUpdateState} from './localStore';


const UpdateOfferModal = observer(({
    isOpened,
    selectedId: offerId,
    close,
}: SmartModalProps) => {
    const {name: initialName, price: initialPrice} = offerStore.offers.get(offerId);

    const [name, setName] = useState(initialName);
    const [price, setPrice] = useState<string>(`${initialPrice}`);
    const [validationError, setValidationError] = useState<string | null>(null);

    const resetForm = () => {
        setName('');
        setPrice('');
        setValidationError(null);
    };

    const {
        loading,
        error: creatingError,
        success: creatingSuccess,
    } = offerUpdateState;

    useEffect(
        () => {
            if (creatingSuccess) {
                offerUpdateState.reset();
                resetForm();
                close();
            }
        }, [creatingSuccess],
    );

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;

        if (value !== '' && isNaN(+value)) {
            return;
        }

        setPrice(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !price) {
            setValidationError('Имя и цена обязательны');
            return;
        }

        offerUpdateState.updateOffer(
            offerId,
            name,
            +price,
        );
    };

    return (
        <Modal
            handleClose={close}

            closable={!loading}
            isOpen={isOpened}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    labelText={'Название услуги'}
                    disabled={loading}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                />
                <Input
                    labelText={'Цена услуги'}
                    disabled={loading}
                    type={'number'}
                    value={price}
                    onChange={handlePriceChange}
                />

                <ModalControls>
                    <Button
                        isDisabled={loading}
                        type="submit"
                    >
                        Изменить
                    </Button>
                </ModalControls>

                {validationError && <ErrorView>{validationError}</ErrorView>}
                {creatingError && <ErrorView>{creatingError}</ErrorView>}
            </form>
        </Modal>
    );
});

export default UpdateOfferModal;
