import { useEffect, useState } from "react";
import lottery from "./contracts/lottery.json";
import Web3 from "web3";
import "./App.css";

function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider(
      "https://eth-sepolia.g.alchemy.com/v2/hvf5fpGssnUOvlj_eBUt7Q8hmUI8S4p8"
    );
    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = lottery.networks[networkId];
      // console.log(deployedNetwork.address);
      const contract = new web3.eth.Contract(
        lottery.abi,
        deployedNetwork.address
      );
      // console.log(contract);
      setState({ web3: web3, contract: contract });
    }
    provider && template();
  }, []);

  // console.log(state);
  async function getAccount() {
    const { web3 } = state;
    const accAddress = await web3.eth.getAccounts();
    console.log(accAddress);
  }
  async function getDetails() {
    const { contract } = state;
    const val = await contract.methods.random().call();
    console.log(val);
  }
  return (
    <div className="App">
      <button onClick={getAccount}>Get Address</button>
      <button onClick={getDetails}>Get value</button>
    </div>
  );
}

export default App;
