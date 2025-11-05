import React from 'react';
import styles from '@/components/icon/storeIcon.module.css';
import PropTypes from 'prop-types';

function StoreIcon({product}) {
    // 안전하게 문자열 정제 (공백, 대소문자 등 처리)
    if (!product) return "Unknown";
    const normalized = (product || "").toLowerCase().trim();

    // 매핑
    let name;
    let storeClass;
    switch (normalized) {
        case "cu":
            name = "CU"
            storeClass = styles._cu;
            break;

        case "gs25":
        case "gs":
            name = "GS25"
            storeClass = styles._gs25;
            break;

        case "7eleven":
        case "seveneleven":
        case "sev":
        case "7":
        case "7-eleven":
            name = "7ELEVEN"
            storeClass = styles._7eleven;
            break;

        default:
            storeClass = styles._default;
            break;
    }

    return (
        <span className={`${styles.category} ${storeClass}`}>
            {name}
        </span>
    );
}

StoreIcon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default StoreIcon;
