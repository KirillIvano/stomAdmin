import {createModalFacadeHOC} from '@/helpers/modals';

import {ModalType} from './types';
import {
    CreatePreviewModal,
    DeletePreviewModal,
} from './components';

export const withModalManager = createModalFacadeHOC<ModalType>({
    'preview_create': CreatePreviewModal,
    'preview_delete': DeletePreviewModal,
});
