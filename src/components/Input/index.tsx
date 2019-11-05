/**
 * input
 */
import React from "react";
import Style from "./style";

function Input(props) {
  const { placeholder, onChange, ...rest } = props;

  return (
    <div className={Style.input}>
      <input placeholder={placeholder} {...rest} onChange={onChange} style={{ width: "100%" }} />
    </div>
  );
}

export default Input;
