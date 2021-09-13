import React from "react";
import { useRef, useState } from "react";
import { useHandleClickOutside } from "../../../hooks/useHandleClickOutside";
import RequireLoginDD from "../../require_login_dropdown/require_login_dropdown";

export default function RyanNaing() {

  const handleClick = () => {
    
  }

  return (
    <div className='main__ryan'>
      <h1 onClick={handleClick}>RYAN NAING</h1>
      <RequireLoginDD mode='like' blockPos='0' leftPos='0' />
    </div>
  );
}
