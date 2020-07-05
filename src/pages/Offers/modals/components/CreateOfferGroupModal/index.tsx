import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {offerCategoryCreateState} from './localStore';

type CreateOfferCategoryModalProps = {
    isOpened: boolean;
    close: () => void;
}

const CreateOfferCategoryModal = observer(({
    isOpened,
    close,
}: CreateOfferCategoryModalProps) => {
    const [name, setName] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const resetForm = () => {
        setName('');
        setValidationError(null);
    };

    const {
        loading,
        error: creatingError,
        success: creatingSuccess,
    } = offerCategoryCreateState;

    useEffect(
        () => {
            if (creatingSuccess) {
                offerCategoryCreateState.reset();
                resetForm();
                close();
            }
        }, [creatingSuccess],
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            setValidationError('Название обязательно');
            return;
        }

        offerCategoryCreateState.createOfferCategory(name);
    };

    return (
        <Modal
            handleClose={close}

            closable={loading}
            isOpen={isOpened}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    labelText={'Название категории'}
                    disabled={loading}
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
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

export default CreateOfferCategoryModal;
