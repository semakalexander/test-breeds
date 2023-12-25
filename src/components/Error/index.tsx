import { FunctionalComponent } from "preact";
import "./error.sass";

const Error: FunctionalComponent<{ error: Error }> = ({ error }) => {
  return (
    <div className="error">
      <img src="/sad-dog.png" />

      <p>{error?.message ?? error}</p>
    </div>
  );
};

export default Error;
