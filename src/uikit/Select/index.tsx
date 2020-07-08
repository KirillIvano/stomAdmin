import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type OptionProps<TId = string> = {
    name: string;
    id: string;

    handleSelect: (id: string, name: string) => void;
}

const Option = React.memo(({
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
Option.displayName = 'Option';


interface SelectProps<TId = string> extends React.SelectHTMLAttributes<HTMLDivElement> {
    items: {name: string; id: string}[];

    handleSelect: (id: TId) => void;
}

type SelectPosition = 'top' | 'bottom';
type SelectState = {
    isOpen: boolean;
    position: SelectPosition;
    selectedName: string;
}

class Select extends React.Component<SelectProps, SelectState> {
    state: SelectState = {
        isOpen: false,
        position: 'bottom',
        selectedName: 'Выберите что-нибудь',
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

    render() {
        const {
            isOpen,
            selectedName,
            position,
            ...props
        } = this.state;
        const {items} = this.props;

        return (
            <div
                {...props}
                ref={this.selectRef}
                className={styles.select}
            >
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
                                    <Option
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

export default Select;
