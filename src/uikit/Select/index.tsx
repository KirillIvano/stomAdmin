import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type OptionProps = {
    name: string;
    id: string;

    handleSelect: (id: string, name: string) => void;
}

const CustomOption = React.memo(({
    name,
    id,
    handleSelect,
}: OptionProps) => (
    <li
        onClick={() => handleSelect(id, name)}
        className={styles.option}
    >
        {name}
    </li>
));
CustomOption.displayName = 'CustomOption';


interface SelectProps<TId = string> extends React.SelectHTMLAttributes<HTMLDivElement> {
    items: {name: string; id: string}[];
    label?: string;

    handleSelect: (id: TId) => void;
}

type SelectPosition = 'top' | 'bottom';
type SelectState = {
    isOpen: boolean;
    position: SelectPosition;
    selectedName: string;
}

class CustomSelect extends React.Component<SelectProps, SelectState> {
    state: SelectState = {
        isOpen: false,
        position: 'bottom',
        selectedName: 'Нажмите...',
    };

    private selectRef = React.createRef<HTMLDivElement>();

    selectItem = (id: string) => {
        const {items, handleSelect} = this.props;

        const {name} = items.find(item => item.id === id);
        this.setState({selectedName: name});

        handleSelect(id);
    }

    changePosition = () => {
        const {top} = this.selectRef.current.getBoundingClientRect();
        const position = innerHeight - top > 300 ? 'bottom' : 'top' ;

        this.setState({position});
    }

    toggleVisibility = () => {
        const {isOpen} = this.state;

        !isOpen && this.changePosition();

        this.setState({isOpen: !isOpen});
    }

    handleOutClick = () => {
        const {isOpen} = this.state;

        if (isOpen) {
            this.setState({isOpen: false});
        }
    }

    handleWrapperClick = (e: MouseEvent) => {
        e.stopPropagation();
    }

    componentDidMount() {
        window.addEventListener('click', this.handleOutClick);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutClick);
    }

    render() {
        const {
            isOpen,
            selectedName,
            position,
        } = this.state;
        const {items, label} = this.props;

        return (
            <div
                ref={this.selectRef}
                className={styles.select}

                onClick={e => {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }}
            >
                {label && <p className={styles.label}>{label}</p>}

                <div
                    className={styles.selectButton}
                    onClick={this.toggleVisibility}
                >
                    {selectedName}
                </div>

                {isOpen && (
                    <ul
                        className={classnames(
                            styles.options,
                            {[styles[position]]: true},
                        )}
                    >
                        {
                            items.map(
                                ({name, id}) => (
                                    <CustomOption
                                        key={id}
                                        name={name}
                                        id={id}
                                        handleSelect={this.selectItem}
                                    />
                                ),
                            )
                        }
                    </ul>
                )}
            </div>
        );
    }
}

export default CustomSelect;
