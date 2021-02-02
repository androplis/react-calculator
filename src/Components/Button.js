import React from 'react';

const Button = ({id, symbol, updateDisplay}) => {
    return (
        React.createElement("button", {
          id: id,
          onClick: () => {updateDisplay(symbol, id);} },
          symbol)
    );
}

export default Button;