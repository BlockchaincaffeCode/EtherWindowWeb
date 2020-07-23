import React, { Component } from "react";
import {
  gasPrice,
  getBalance,
  sendTransaction,
  getNonce,
} from "../funkcije.js";
import QrReader from "react-qr-scanner";
import Button from "react-bootstrap/Button";
import Web3 from "web3";
import ethereum from "../Ether Window.png";
import android from "../Ether Window Playstore.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import QRCode from "qrcode.react";
import "./myStyles.css";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baza: [],
      //className="App-logo"
      cameraTr: <img src={ethereum} style={this.slika} />,
      android: <img id="android" src={android} style={this.slikaA} />,
      cameraAdr: "",
      delay: 200,
      result: "No result",
      treci: "",
      previewStyle: {
        border: "5px solid #1671c1",
        height: 225,
        width: 300,
      },
    };
  }
  componentDidMount() {
    let lol = document.getElementById("paste");
    lol.addEventListener("keyup", (ff) => {
      if (lol.value.length == 42) {
        this.handleScan(lol.value);
      }
    });

    let andro = document.getElementById("android");
    andro.addEventListener("click", (ff) => {
      window.open(
        "https://play.google.com/store/apps/details?id=org.blockchaincaffe.eowallet",
        "_blank"
      );
    });
  }

  slika = {
    height: "250px",
    width: "369px",
    marginLeft: "-30px",
  };
  slikaA = {
    height: "100px",
    width: "258px",
  };
  slikaqr = {
    height: "250px",
    width: "250px",
    //marginLeft: "-30px",
  };

  glavni = {
    width: "100%",
    height: "100%",
    position: "absolute",
    textAlign: "center",
    verticalAlign: "middle",
    horizontalAlign: "middle",
  };

  camera = {
    width: "300px",
    height: "225px",
    left: "50%",
    marginLeft: "-150px",
    marginTop: "40px",
    position: "absolute",
  };

  buttonScan = {
    width: "400px",
    height: "40px",
    left: "50%",
    marginLeft: "-200px",
    marginTop: "290px",
    position: "absolute",
  };

  buttonScanProba = {
    marginTop: "290px",
  };

  buttonScanColor = {
    color: "#fff",
  };

  result = {
    textAlign: "center",
    verticalAlign: "middle",
    horizontalAlign: "middle",
    marginTop: "430px",
    width: "1000px",
    left: "50%",
    marginLeft: "-500px",
    position: "absolute",
  };
  resultProba = {
    marginTop: "30px",
  };

  receiver = {
    width: "620px",
    left: "50%",
    marginLeft: "-310px",
    position: "absolute",
  };

  makeQr = (ev) => {
    ev.preventDefault();
    let nonce = document.getElementById("nonce").value;
    let gasprice = document.getElementById("gasprice").value;
    let gaslimit = document.getElementById("gaslimit").value;
    let receiver = document.getElementById("receiver").value;
    let amount = document.getElementById("amount").value;

    if (Web3.utils.isAddress(receiver)) {
      let qr =
        nonce + "/" + receiver + "/" + amount + "/" + gasprice + "/" + gaslimit;

      this.setState({
        cameraTr: (
          <QRCode
            value={qr}
            size="300"
            bgColor="#FFFFFF"
            fgColor="#1b63b5"
            style={this.slikaqr}
          />
        ),
      });
    }
  };

  handleScan = (data) => {
    this.setState({
      treci: "",
    });
    try {
      if (data == null) {
      } else {
        if (Web3.utils.isAddress(data)) {
          getBalance(data).then((balance) => {
            getNonce(data).then((nonce) => {
              gasPrice().then((gas) => {
                this.setState({
                  treci: (
                    <div>
                      <div
                        class="text-center"
                        style={{
                          // "background-color": "#1b63b5",
                          color: "#1b63b5",
                        }}
                      >
                        <h6>Your Ethereum address: {data}</h6>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 col-lg-offset-8">
                          <h3
                            style={{
                              //"background-color": "#1b63b5",
                              color: "#1b63b5",
                            }}
                          >
                            Balance: {balance} ETH
                          </h3>
                        </div>
                      </div>

                      <div class="d-inline-flex p-2">
                        <Form onSubmit={this.makeQr}>
                          <InputGroup>
                            <InputGroup.Prepend className="ml-2 mb-2">
                              <InputGroup.Text
                                style={{
                                  "font-size": "12px",
                                }}
                              >
                                Nonce
                              </InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                              id="nonce"
                              type="number"
                              defaultValue={nonce}
                              min={nonce}
                              max={nonce}
                            />

                            <InputGroup.Prepend className="ml-2 mb-2">
                              <InputGroup.Text>GasPrice</InputGroup.Text>
                            </InputGroup.Prepend>

                            <FormControl
                              id="gasprice"
                              defaultValue={gas}
                              type="number"
                              min="2"
                            />
                            <InputGroup.Append className="mb-2">
                              <InputGroup.Text
                                style={{
                                  "font-size": "12px",
                                }}
                              >
                                Gwei
                              </InputGroup.Text>
                            </InputGroup.Append>

                            <InputGroup.Prepend
                              style={{
                                "font-size": "12px",
                              }}
                              className="ml-2 mb-2"
                            >
                              <InputGroup.Text
                                style={{
                                  "font-size": "12px",
                                }}
                              >
                                Gas Limit
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              id="gaslimit"
                              defaultValue={21000}
                              type="number"
                              min="21000"
                            />
                          </InputGroup>

                          <Container>
                            <Row>
                              <Col sm={6}>
                                <Form.Control
                                  className="mb-2 mt-2"
                                  required
                                  type="text"
                                  id="receiver"
                                  placeholder="Send to address..."
                                />
                              </Col>
                              <Col sm={2}>
                                <Form.Control
                                  className="mb-2 mt-2"
                                  required
                                  type="number"
                                  min="0.00000001"
                                  step="0.00000001"
                                  id="amount"
                                  placeholder="Amount"
                                />
                              </Col>
                              <Col sm={4}>
                                <Button
                                  className=" btn btn-primary centerButton"
                                  className="mb-2 mt-2"
                                  style={{
                                    "background-color": "#1b63b5",
                                    "border-color": "#2E4C80",
                                    //width: "100px",
                                    "border-radius": "10px",
                                  }}
                                  type="submit"
                                >
                                  Prepare the transaction
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Form>
                      </div>
                    </div>
                  ),
                });
              });
            });
          });
          document.getElementById("paste").value = "";
          this.setState({
            cameraTr: <img src={ethereum} style={this.slika} />,
          });
        } else if (Web3.utils.isHex(data)) {
          sendTransaction(data).then((result) => {
            if (result == "error") {
              this.setState({
                treci: (
                  <h4
                    style={{
                      //"background-color": "#1b63b5",
                      color: "#1b63b5",
                    }}
                  >
                    Error, transaction not accepted!
                  </h4>
                ),
              });
            } else {
              this.setState({
                treci: (
                  <h4
                    style={{
                      //"background-color": "#1b63b5",
                      color: "#1b63b5",
                    }}
                  >
                    Transaction included in block {result}
                  </h4>
                ),
              });
            }
          });
          this.setState({
            treci: (
              <h4
                style={{
                  //"background-color": "#1b63b5",
                  color: "#1b63b5",
                }}
              >
                Transaction send. Waiting for confirmation...
              </h4>
            ),
          });
          this.setState({
            cameraTr: <img src={ethereum} style={this.slika} />,
          });
        } else {
          alert("Wrong QR");
        }
      }
    } catch {
      alert("Error scan");
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  showCameraWindow = () => {
    this.setState({
      cameraTr: (
        <div>
          <QrReader
            delay={this.state.delay}
            style={this.state.previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
          />
        </div>
      ),
    });
  };

  render() {
    const previewStyle = {
      height: 375,
      width: 500,
    };
    return (
      <div style={this.glavni}>
        <div style={this.camera}>{this.state.cameraTr}</div>
        <div style={this.buttonScanProba}>
          <div>
            <Button
              className="m-3"
              onClick={() => this.showCameraWindow()}
              style={{
                "background-color": "#1b63b5",
                "border-color": "#2E4C80",
                width: "200px",
                "border-radius": "10px",
              }}
            >
              Scan QR
            </Button>
          </div>
          <div class="d-inline-flex p-2">
            <Form.Control
              style={{
                width: "350px",
              }}
              id="paste"
              type="text"
              placeholder="...or paste your Ethereum address"
            />
          </div>
        </div>
        <div style={this.resultProba}>{this.state.treci}</div>
        <div style={{ marginTop: "150px" }}>{this.state.android}</div>
      </div>
    );
  }
}

export default Wallet;
