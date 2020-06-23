import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {createOfferState} from './localStore';

type CreateOfferModalProps = {
    isOpened: boolean;
    categoryId: string;
    close: () => void;
}

const CreateOfferModal = observer(({
    isOpened,
    categoryId,
    close,
}: CreateOfferModalProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [validationError, setValidationError] = useState();

    const {
        isOfferCreatingInProgress,
        offerCreatingError,
        offerCreatingSuccess,
    } = createOfferState;

    useEffect(
        () => {
            if (offerCreatingSuccess) {
                createOfferState.resetOfferCreating();
                close();
            }
        }, [offerCreatingSuccess],
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

        }

        createOfferState.createOffer(
            name,
            +price,
            categoryId,
        );
    };

    return (
        <Modal
            handleClose={close}

            closable={true}
            isOpen={isOpened}
        >
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

                <ModalControls>
                    <Button
                        isDisabled={isOfferCreatingInProgress}
                        type="submit"
                    >
                    Отправить
                    </Button>
                </ModalControls>

                {offerCreatingError && <ErrorView>{offerCreatingError}</ErrorView>}
            </form>
        </Modal>
    );
});

export default CreateOfferModal;
