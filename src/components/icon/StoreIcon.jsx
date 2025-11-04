import React from 'react';
import styles from '../../assets/css/storeIcon.module.css';
import PropTypes from 'prop-types';

function StoreIcon({name,storeColor}) {
    const toCssClass = (storeColor) => `_${storeColor?.toLowerCase()}`;
    return (
        <span className={`${styles.category} ${styles[toCssClass(storeColor)]}`}>
            {name}
        </span>
    );
}
StoreIcon.propTypes={
    storeColor: PropTypes.oneOf(["cu", "7eleven", "gs25"]).isRequired,
}

export default StoreIcon;