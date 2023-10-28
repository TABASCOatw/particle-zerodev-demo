import React, { useState, useEffect } from 'react';

import { ParticleNetwork } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';

import { ECDSAProvider, getRPCProviderOwner } from '@zerodev/sdk';

import { ethers } from 'ethers';
import { notification } from 'antd';

import './App.css';

const particle = new ParticleNetwork({
  projectId: process.env.REACT_APP_PROJECT_ID,
  clientKey: process.env.REACT_APP_CLIENT_KEY,
  appId: process.env.REACT_APP_APP_ID,
  chainName: 'ethereum',
  chainId: 5,
});

let ecdsaProvider;

const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [smartAccount, setSmartAccount] = useState(null);

  useEffect(() => {
    const initAndFetch = async () => {
      if (userInfo) {
        ecdsaProvider = await ECDSAProvider.init({
          projectId: process.env.REACT_APP_ZERODEV_KEY,
          owner: getRPCProviderOwner(new ParticleProvider(particle.auth)),
        });
        await fetchAccountInfo();
      }
    };
    initAndFetch();
  }, [userInfo]);

  const fetchAccountInfo = async () => {
    const address = await ecdsaProvider.getAddress();
    setSmartAccount(address);

    const balance = ethers.utils.formatEther(await ecdsaProvider.request({ method: "eth_getBalance", params: [address, 'latest'] }));

    setEthBalance(balance);
  };

  const handleLogin = async (preferredAuthType) => {
    const user = await particle.auth.login({ preferredAuthType });
    setUserInfo(user);
  };

  const executeUserOp = async () => {
    const { hash } = await ecdsaProvider.sendUserOperation({
      target: "0x000000000000000000000000000000000000dEaD",
      data: "0x",
      value: ethers.utils.parseUnits('0.001', 'ether'),
    });

    notification.success({
      message: "User operation successful",
      description: `Hash: ${hash}`
    });
  };

  const executeBatchUserOps = async () => {
    const { hash } = await ecdsaProvider.sendUserOperation([
      {
        target: "0x000000000000000000000000000000000000dEaD",
        data: "0x",
        value: ethers.utils.parseUnits('0.001', 'ether'),
      },
      {
        target: "0x000000000000000000000000000000000000dEaD",
        data: "0x",
        value: ethers.utils.parseUnits('0.001', 'ether'),
      },
    ]);

    notification.success({
      message: "Batch user operation successful",
      description: `Hash: ${hash}`
    });
  };

  const changeOwner = async () => {
    const newOwnerAddress = window.prompt("Enter the new owner's address:");
    if (newOwnerAddress) {
      const { hash } = ecdsaProvider.changeOwner(newOwnerAddress);
      notification.success({
        message: "Ownership transferred",
        description: `Hash ${hash}`
      });
    } else {
      notification.error({
        message: "Ownership not transferred",
        description: "Invalid or no address entered"
      });
    }
  };

  return (
    <div className="App">
      <div className="logo-section">
        <img src="https://i.imgur.com/EerK7MS.png" alt="Logo 1" className="logo logo-big" />
        <img src="https://i.imgur.com/EDxhVig.png" alt="Logo 2" className="logo" />
      </div>
      {!userInfo ? (
        <div className="login-section">
          <button className="sign-button" onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button className="sign-button" onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
        </div>
      ) : (
        <div className="profile-card">
          <h2>{userInfo.name}</h2>
          <div className="balance-section">
            <small>{smartAccount}</small>
            <small>{ethBalance} ETH</small>
            <button className="sign-message-button" onClick={executeUserOp}>Execute Single User Operation</button>
            <button className="batch-op-button" onClick={executeBatchUserOps}>Execute Batch User Operations</button>
            <button className="change-owner-button" onClick={changeOwner} style={{ backgroundColor: 'red' }}>Transfer Ownership</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;