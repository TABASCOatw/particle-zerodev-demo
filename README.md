<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle ZeroDev Demo
  </h3>
</div>

⚡️ ERC-4337 demo application showcasing utilization of [Particle Auth](https://docs.particle.network/developers/auth-service) (WaaS) as a signer (MPC-TSS social logins) within ZeroDev's SDK, facilitating smart account creation and interaction.

Built using **Particle Auth**, **TypeScript**, **ZeroDev**

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

##

👉 Try the demo: https://web-demo.particle.network

👉 Learn more about Particle Network: https://particle.network

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-zerodev-demo.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_ZERODEV_KEY`, the project ID retrieved from the [ZeroDev dashboard.](https://dashboard.zerodev.app/)

### Start the project
```
npm run dev
```
OR
```
yarn dev
```
