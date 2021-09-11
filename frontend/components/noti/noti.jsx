import React, { useMemo } from "react";

const Noti = ({ mode, onClose, message }) => {
  // classes only rerender when mode changes
  const classes = useMemo(
    () => ["noti__item", `noti__item--${mode}`].join(" "),
    [mode]
  );

  return (
    <div className={classes} onClick={onClose}>
      <div className='noti__message'>{message}</div>
    </div>
  );
};

export default Noti;
