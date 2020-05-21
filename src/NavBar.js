import React, { useState } from 'react';
import { Link } from '@reach/router';
import { css } from '@emotion/core';

const NavBar = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      onClick={() => setPadding(padding + 15)}
      css={css`
        background-color: pink;
        padding: ${padding}px;
      `}>
      <Link to="/">Adopt me!</Link>
      <span
        css={css`
          font-size: 60px;
        `}
        role="img"
        aria-label="logo">
        🤣
      </span>
    </header>
  );
};

export default NavBar;
