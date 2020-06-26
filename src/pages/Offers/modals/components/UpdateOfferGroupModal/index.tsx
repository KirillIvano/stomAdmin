import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Input,
    Button,
    ErrorView,
} from '@/uikit';

import {offerCategoryUpdateState} from './localStore';
import {offerCategoriesStore} from '@/entities/offerCategory/store';

type UpdateOfferCategoryModalProps = {
    isOpened: boolean;
    selectedId: string;
    close: () => void;
}

const UpdateOfferCategoryModal = observer(({
    isOpened,
    selectedId,
    close,
}: UpdateOfferCategoryModalProps) => {
    const {name: initialName} = offerCategoriesStore.offerCategories.get(selectedId);

    const [name, setName] = useState(initialName);
    const [validationError, setValidationError] = useState<string | null>(null);

    const resetForm = () => {
        setName('');
        setValidationError(null);
    };

    const {
        loading,
        error: creatingError,
        success: creatingSuccess,
    } = offerCategoryUpdateState;

    useEffect(
        () => {
            if (creatingSuccess) {
                offerCategoryUpdateState.reset();
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

        offerCategoryUpdateState.updateOfferCategory(selectedId, name);
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

export default UpdateOfferCategoryModal;
