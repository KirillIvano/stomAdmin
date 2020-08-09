import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';
import {SmartModalProps} from '@/helpers/modals';

import {offerCreateState} from './localStore';


const CreateOfferModal = observer(({
    isOpened,
    selectedId: categoryId,
    close,
}: SmartModalProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [validationError, setValidationError] = useState<string | null>(null);

    const resetForm = () => {
        setName('');
        setPrice('');
        setDescription('');
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
            description,
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
                <Input
                    labelText={'Дополнительное описание'}
                    disabled={loading}
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
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
