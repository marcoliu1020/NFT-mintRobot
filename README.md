# NFT mint robot

這是一個簡單的 mint 機器人，如果需要其他功能，比如增加 gas fee 等等，需要自行研究。


## 步驟

## 找到對方的合約
![](https://i.imgur.com/jiLdcbZ.jpg)

## 複製 ABI
![](https://i.imgur.com/88ODIQb.jpg)

## 新增 abi.json 檔案，把 abi 貼上去，儲存檔案

## 申請 Provider API key
三選一
1. [Infura](https://infura.io/)
2. [Alchemy](https://www.alchemy.com/)
3. [Moralis](https://moralis.io/)


## 安裝 ethers.js
```shell=
npm install --save-dev ethers.js
```

## 新增 mintRobot.js 檔案
更改 3 個變數，API_URL、PRIVATE_KEY、CONTRACT_ADDRESS
```javascript=
const ethers = require('ethers');
// 節點商的 API
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/Dy564adsfzTlA..." 
// 錢包私鑰
const PRIVATE_KEY = "65462560c27..." 
// 要 mint 的合約地址
const CONTRACT_ADDRESS = "0x8FFC91DB3C..." 
// abi 檔案
const abi = require('./abi.json');


// provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);
// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
// contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

async function main() {
    // read data
    const price = await contract.apePrice()
    console.log('the price is: ' + price); // the price is: 100000000000000
    
    // 換算成 ether
    const options = {value: ethers.utils.parseEther("0.0001")} // set NFT price

    // updating
    console.log('Updating the message...');
    
    // mint ape
    const tx = await contract.mintApe(1, options); // buy a NFT
    await tx.wait();
    console.log(tx);

    // mint 多個 NFT，但節點商有限制，一小時內不能超過 XX 數量的請求
    // for (i=1; i<=200; i++) {
    //     tx = await interactContract.mintApe(1, options);
    // }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
```

## 發射命令，任務完成
```shell=
node mintRobot.js
```
