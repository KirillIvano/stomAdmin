import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';
import placeholder from './images/placeholder.jpg';

interface ImagePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;

    className?: string;
}

const ImagePreview = ({
    imageUrl,
    className,

    ...props
}: ImagePreviewProps) => {
    const imageClass = classnames(className, styles.imageContainer);

    return (<div
        {...props}

        style={{backgroundImage: `url("${imageUrl ? imageUrl : placeholder}")`}}
        className={imageClass}
    />);
};

export default ImagePreview;
