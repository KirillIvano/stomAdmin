import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {offerCreateState} from './localStore';

type CreateOfferModalProps = {
    isOpened: boolean;
    selectedId: string;
    close: () => void;
}

const CreateOfferModal = observer(({
    isOpened,
    selectedId: categoryId,
    close,
}: CreateOfferModalProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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
    } = offerCreateState;

    useEffect(
        () => {
            if (creatingSuccess) {
                offerCreateState.reset();
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

        offerCreateState.createOffer(
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
                    labelText={'имя'}
                    disabled={loading}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                />
                <Input
                    labelText={'цена'}
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
                        Создать
                    </Button>
                </ModalControls>

                {validationError && <ErrorView>{validationError}</ErrorView>}
                {creatingError && <ErrorView>{creatingError}</ErrorView>}
            </form>
        </Modal>
    );
});

export default CreateOfferModal;
