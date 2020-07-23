import Web3 from "web3";

export async function gasPrice() {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/21c9096010344014a66cd0c40bf09cbc"
  );
  var gasPrice = 0;
  try {
    gasPrice = await web3.eth.getGasPrice();
    gasPrice = web3.utils.fromWei(gasPrice, "gwei");
    gasPrice = parseInt(gasPrice * 1.1);
  } catch {}
  return gasPrice;
}

export async function getBalance(adr) {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/21c9096010344014a66cd0c40bf09cbc"
  );
  var balance = "Address error";
  try {
    balance = await web3.eth.getBalance(adr);
    balance = web3.utils.fromWei(balance, "ether");
  } catch {}

  return balance;
}

export async function getNonce(adr) {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/21c9096010344014a66cd0c40bf09cbc"
  );
  var nonce = "Nonce error";
  try {
    nonce = await web3.eth.getTransactionCount(adr);
  } catch {}

  return nonce;
}

export async function sendTransaction(tr) {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/21c9096010344014a66cd0c40bf09cbc"
  );
  let result = "error";
  try {
    await web3.eth.sendSignedTransaction(tr).on("receipt", (receipt) => {
      result = receipt.blockNumber;
    });
  } catch {}

  return result;
}
