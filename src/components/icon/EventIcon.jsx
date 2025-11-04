import React from 'react';
import PropTypes from "prop-types";
import styles from '../../assets/css/eventIcon.module.css';



function EventIcon({name,bgColor="one",cssPosition,top,left}) {
    const cssVar = `var(--${bgColor})`;

    return (
        <span className={styles.event} 
            style={{
                backgroundColor: cssVar, 
                position: cssPosition,
                top: top,
                left: left,
            }}
        >
            {name}
        </span>
    );
    
}

EventIcon.propTypes={
    bgColor: PropTypes.oneOf(["one", "two"]).isRequired,
    cssPosition: PropTypes.oneOf(["absolute", "relative", "fixed", "static"]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default EventIcon;