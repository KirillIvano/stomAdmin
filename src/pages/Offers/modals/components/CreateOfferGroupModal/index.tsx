import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {createOfferCategoryState} from './localStore';

type CreateOfferCateogoryModalProps = {
    isOpened: boolean;
    close: () => void;
}

const CreateOfferCateogoryModal = observer(({
    isOpened,
    close,
}: CreateOfferCateogoryModalProps) => {
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
    } = createOfferCategoryState;

    useEffect(
        () => {
            if (creatingSuccess) {
                createOfferCategoryState.reset();
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

        createOfferCategoryState.createOfferCategory(name);
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

export default CreateOfferCateogoryModal;
