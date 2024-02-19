import React from "react";
/*
function convertToArray<T>( value:T ): T[] {
return [value];
}
convertToArray(5);
convertToArray("Hello");
*/
const buttonTextOptions = [
  "Click me!",
  "Click me again!",
  "Click me one more time!"
] as const;

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: "primary" | "secondary",
  children: React.ReactNode,
  style?: React.CSSProperties
}

export default function ThisButton({children, type, autoFocus, variant, style, ...rest }: ButtonProps) {
const buttonStyle: React.CSSProperties = {
    display: 'flex',
    color:'red',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 17px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '5rem',  // Establece un ancho mínimo para el botón
    ...style
  };

  return (
    <button type={type} autoFocus={autoFocus} style={buttonStyle} {...rest}>
      {children}
    </button>
  );
}
