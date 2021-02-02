import React from 'react';

const Display = ({display}) => {
    return (
        React.createElement("div", { className: "display" }, display)

    );
}

export default Display;