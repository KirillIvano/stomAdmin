import React, {useState, useEffect} from 'react';
import {observer} from 'mobx-react';

import {
    Modal,
    ModalControls,
    Button,
    FileInput,
    Input,
    ImagePreview,
    ErrorView,
} from '@/uikit';
import {useImagePreview} from '@/hooks/useImagePreview';
import {CategorySelect} from '@/components';

import styles from './styles.less';
import {previewCreateStore} from './localStore';

type CreatePreviewModalProps = {
    isOpened: boolean;
    close: () => void;
}

const CreatePreviewModal = observer(({
    isOpened,
    close,
}: CreatePreviewModalProps) => {
    const [name, setName] = useState('');
    const [categoryId, setCategory] = useState('');
    const [image, setImage] = useState<File>(null);

    const reset = () => {
        setName('');
        setCategory('');
        setImage(null);
    };

    const imagePreview = useImagePreview(image);

    const [validationError, setValidationError] = useState('');

    const {error, loading, success} = previewCreateStore;

    useEffect(() => {
        if (success) {
            previewCreateStore.reset();
            reset();
            close();
        }
    }, [success]);

    const handleSubmit = () => {
        if (!name ||
            !categoryId ||
            !image
        ) {
            setValidationError('Все поля обязательны');
            return;
        }

        previewCreateStore.createPreview(
            name,
            categoryId,
            image,
        );
    };

    return (
        <Modal
            handleClose={close}
            isOpen={isOpened}
            closable={!loading}
        >
            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Input
                    labelText={'Название превью'}
                    onChange={e => setName(e.currentTarget.value)}
                />
                <CategorySelect handleSelect={setCategory} />

                <FileInput
                    wrapperClassName={styles.imageInput}
                    labelText={'Выбрать картинку'}
                    onChange={e => setImage(e.currentTarget.files[0])}
                />
                <ImagePreview imageUrl={imagePreview} />

                <ModalControls>
                    <Button disabled={loading} styling={'warning'}>Отмена</Button>
                    <Button disabled={loading} type="submit">Подтвердить</Button>
                </ModalControls>
            </form>

            {validationError && <ErrorView>{validationError}</ErrorView>}
            {error && <ErrorView>{error}</ErrorView>}
        </Modal>
    );
});

export default CreatePreviewModal;
