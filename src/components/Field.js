import React from "react";
import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

import ErrorBoundary from "utils/errorBoundary";

const ErrMsg = styled.p`
  margin-bottom: 0px;
  margin-top: 12px;
  font-size: 12px;
  color: #cc0000;
`;

export default ({
  useComponent = true,
  containerProps,
  error = true,
  placeholder,
  component,
  className,
  children,
  label,
  value,
  name,
  type,
  as,
  ...props
}) => {
  const Render = component && useComponent ? component : Field;

  return (
    <ErrorBoundary>
      <div className="form-group" {...containerProps}>
        {label && <label {...label?.props}>{label?.value}</label>}
        <Render
          className={className || ""}
          placeholder={placeholder}
          component={component}
          title={placeholder}
          value={value}
          name={name}
          {...(children && { children: children })}
          {...(type && { type: type })}
          {...(as && { as: as })}
          {...props}
        />
        {error && (
          <ErrorMessage name={name}>
            {(msg) => <ErrMsg>{msg}</ErrMsg>}
          </ErrorMessage>
        )}
      </div>
    </ErrorBoundary>
  );
};
