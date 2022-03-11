const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/Dy564adsfzTlA..." // provider url
const PRIVATE_KEY = "65462560c27..." // 錢包私鑰
const CONTRACT_ADDRESS = "0x8FFC91DB3C..." // 要 mint 的合約地址


const abi = require('./abi.json');
const ethers = require('ethers');


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