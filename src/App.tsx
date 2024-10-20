import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
function App() {
  const [displayNumber, setDisplayNumber] = useState("0");
  const [output, setOutput] = useState("");
  const operatorRegex = /[\/\*\+\-]$/;

  const pressNumber = (number: string) => {
    if (displayNumber === "0") {
      setDisplayNumber(number);
    } else {
      setDisplayNumber((displayNumber) => displayNumber + number);
    }
  };
  const pressDecimal = () => {
    if (!displayNumber.includes(".") && displayNumber !== "0") {
      setDisplayNumber((displayNumber) => displayNumber + ".");
    }
  };

  const pressSymbol = (symbol: string) => {
    switch (symbol) {
      case "+":
        if (displayNumber !== "0" && displayNumber !== "-") {
          setOutput(output + displayNumber + symbol);
          setDisplayNumber("0");
        } else if (displayNumber === "0" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
        } else if (displayNumber === "-" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
          setDisplayNumber("0");
        } else {
          return null;
        }
        break;
      case "-":
        if (displayNumber !== "0" && displayNumber !== "-") {
          setOutput(output + displayNumber + symbol);
          setDisplayNumber("0");
        } else if (displayNumber === "-" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
          setDisplayNumber("0");
        } else if (isLastCharacterSymbol(output) || output === "") {
          setDisplayNumber("-");
        } else {
          return null;
        }
        break;
      case "/":
        if (displayNumber !== "0" && displayNumber !== "-") {
          setOutput(output + displayNumber + symbol);
          setDisplayNumber("0");
        } else if (displayNumber === "0" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
        } else if (displayNumber === "-" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
          setDisplayNumber("0");
        } else {
          return null;
        }
        break;
      case "*":
        if (displayNumber !== "0" && displayNumber !== "-") {
          setOutput(output + displayNumber + symbol);
          setDisplayNumber("0");
        } else if (displayNumber === "0" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
        } else if (displayNumber === "-" && isLastCharacterSymbol(output)) {
          setOutput(output.slice(0, -1) + symbol);
          setDisplayNumber("0");
        } else {
          return null;
        }
        break;
      default:
        break;
    }
  };
  const isLastCharacterSymbol = (str: string) => {
    const symbols = ["+", "-", "/", "*"];
    const lastChar = str.charAt(str.length - 1);

    return symbols.includes(lastChar);
  };

  const pressClear = () => {
    setDisplayNumber("0");
    setOutput("");
  };
  const pressEquals = () => {
    let newOutput = output;

    if (displayNumber !== "0") {
      newOutput += displayNumber;
    }

    if (operatorRegex.test(newOutput)) {
      newOutput = newOutput.slice(0, -1);
    }

    newOutput = newOutput.replace(/\b0+(?=\d)/g, "");

    try {
      const answer = Function(
        `"use strict"; return (${newOutput})`
      )().toString();

      setDisplayNumber(() => answer);
      console.log("Answer:" + answer);
      setOutput(() => "");
    } catch (error) {
      console.error("Invalid expression", error);
    }
    console.log("newOutput:" + newOutput);
  };
  return (
    <>
      <div className="calcuContainer">
        <div className="calcu p-2 rounded border border-primary border-3">
          <Container>
            <Row>
              {output}
              <Col
                xs={12}
                className="mb-2 text-end p-3 rounded"
                style={{ fontSize: "36px", overflow: "auto" }}
                id="display">
                {displayNumber}
              </Col>

              <Col xs={6} className="p-1">
                <Button
                  variant="danger"
                  className="p-3 text-center fs-5"
                  style={{ width: "100%" }}
                  id="clear"
                  onClick={() => pressClear()}>
                  AC
                </Button>
              </Col>
              <Col xs={6} className="p-1">
                <Button
                  variant="success"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="equals"
                  onClick={() => pressEquals()}>
                  =
                </Button>
              </Col>

              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="seven"
                  onClick={() => pressNumber("7")}>
                  7
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="eight"
                  onClick={() => pressNumber("8")}>
                  8
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="nine"
                  onClick={() => pressNumber("9")}>
                  9
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="success"
                  className="p-3 text-center fs-5"
                  style={{ width: "100%" }}
                  id="divide"
                  onClick={() => pressSymbol("/")}>
                  /
                </Button>
              </Col>

              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="four"
                  onClick={() => pressNumber("4")}>
                  4
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="five"
                  onClick={() => pressNumber("5")}>
                  5
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="six"
                  onClick={() => pressNumber("6")}>
                  6
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="success"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="multiply"
                  onClick={() => pressSymbol("*")}>
                  x
                </Button>
              </Col>

              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="one"
                  onClick={() => pressNumber("1")}>
                  1
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="two"
                  onClick={() => pressNumber("2")}>
                  2
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="three"
                  onClick={() => pressNumber("3")}>
                  3
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="success"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="subtract"
                  onClick={() => pressSymbol("-")}>
                  -
                </Button>
              </Col>

              <Col xs={6} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="zero"
                  onClick={() => pressNumber("0")}>
                  0
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="secondary"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="decimal"
                  onClick={() => pressDecimal()}>
                  .
                </Button>
              </Col>
              <Col xs={3} className="p-1">
                <Button
                  variant="success"
                  className="p-3 text-center fs-5 text-white"
                  style={{ width: "100%" }}
                  id="add"
                  onClick={() => pressSymbol("+")}>
                  +
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
