import { render } from "preact";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Page from "./components/Page";
import Sidebar from "./components/Sidebar";
import fetchBreeds from "./hooks/fetchBreeds";
import "./index.sass";

export function App() {
  const { isLoading, error } = fetchBreeds();

  return (
    <div className="main-container">
      {isLoading && <Loader />}
      <Header />

      <div className="content-container">
        {!!error && <Error error={error} />}

        {!error && (
          <>
            <Sidebar />
            <Page />
          </>
        )}
      </div>
    </div>
  );
}

render(<App />, document.getElementById("app"));
