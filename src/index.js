import React from "react";
import ReactDOM from "react-dom";
import SalesForm from "./components/form/form";
import { Container, Col, Row } from "reactstrap";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>AutoSpex Car Sales</h1>
      <Container>
        <div className="row">
          <div className="col-xs-8">
            <SalesForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
