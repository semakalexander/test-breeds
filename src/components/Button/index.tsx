import classNames from "classnames";
import type { FunctionalComponent, JSX } from "preact";
import "./button.sass";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
}

const Button: FunctionalComponent<ButtonProps> = ({ ...props }) => {
  const { className = "", active = false, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      className={classNames("custom-button", {
        [className]: !!className,
        active,
      })}
    />
  );
};

export default Button;
