import { InjectedConnector } from '@web3-react/injected-connector'
import React, { useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import greeting from './abi/greeting.json'
import { AbiItem } from 'web3-utils';
import { useWeb3React } from '@web3-react/core'


declare let window: any;

function App() {
  const web3 = new Web3(Web3.givenProvider || 'https://rinkeby.infura.io/v3/26df008675844a13a371c616a1a7328d');
  const greeting_contract = new web3.eth.Contract((greeting as unknown) as AbiItem, '0x943D3F370354046DB255e94333B9b8f3bc794deD');
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log('error on connecting', ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log('disconnect error: ', ex)
    }
  }

  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const changeGreeting = async () => {
    try {
      return await greeting_contract.methods.changeGreeting('Hello_Sohail')
    } catch (error) {
      console.error(error);
    }
    console.log('called');
  };

  useEffect(() => {
    console.log('web3', greeting_contract.methods);
    web3.eth.getAccounts().then(console.log);
    (async () => {
      const myre = await greeting_contract.methods.greet().call();
      console.log('myre: ', myre);
    })()

    if (window.ethereum.isMetaMask) {
      console.log('metas');
    }
    else {
      console.log('metamask not installed');

    }
  }, [active, account])

  function BlanacedBracket(str: string) {
    const openers = ['(', '{', '['];
    const closers = [')', '}', ']'];
    var stack: any = [];
    var dict: any = {
      '{': '}',
      '(': ')',
      '[': ']'
    }

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      if (openers.includes(char)) {
        stack.push(char)
      }
      else if (closers.includes(char)) {
        if (!stack.length) {
          return false;
        }

        else if (dict[stack.pop()] !== char) {
            return false;
        }
      }
    }
    console.log('stack: ',stack);
    
    return stack.length === 0
  }

  console.log(BlanacedBracket('sohai)l('));
  


  return (
    <div className="App">
      {/* <div className="flex flex-col items-center justify-center">
        <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
        {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
        <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
      </div>
      <button onClick={() => changeGreeting()}>change greeting</button> */}
    </div>
  );
}

export default App;
