import React, {useState, useCallback, useContext} from 'react';

// большинство модалок - умные компоненты, им нужно знать только
// selectedId - id текущего изменяемого элемента
// isOpened - открыта ли модалка
// close - закрыть модалку
// создание фасада, который отвечает за модалки позволяет сократить количество boilerplate кода
// те модалки, которые более глупы, могут создаваться напрямую, без фасада

type SmartModalProps = {
    selectedId: string;
    isOpened: boolean;
    close: () => void;
};
type ModalComponentType = React.ComponentType<SmartModalProps>

type ModalMapping<TNames extends string> = Record<
    TNames,
    ModalComponentType
>

export const ModalFacadeContext =
    React.createContext<{openModal: (modalName: string, id?: string) => void}>(null);

export const createModalFacadeHOC =
    <TNames extends string,>(modals: ModalMapping<TNames>) => {
        return <TProps,>(Comp: React.ComponentType<TProps>) =>
            (props: TProps) =>  {
                const [openedModal, selectModal] = useState<null | TNames>();
                const [selectedId, selectId] = useState<string | undefined>();

                const close = useCallback(() => selectModal(null), []);
                const open = useCallback(
                    (
                        modalName: string,
                        selectedId?: string,
                    ) => {
                        selectModal(modalName as TNames);
                        selectedId && selectId(selectedId);
                    },
                    [],
                );

                return (
                    <ModalFacadeContext.Provider value={{openModal: open}}>
                        <Comp {...props} />

                        {Object.keys(modals)
                            .map(
                                modalName => {
                                    const Modal = modals[modalName] as React.ComponentType<SmartModalProps>;

                                    if (modalName !== openedModal) return null;

                                    return (<Modal
                                        key={modalName}
                                        close={close}
                                        selectedId={selectedId}
                                        isOpened={true}
                                    />);
                                },
                            )
                        }
                    </ModalFacadeContext.Provider>
                );
            };
    };

