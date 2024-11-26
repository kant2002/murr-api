import { MurrApi } from "./lib.js";
import process from "process";

const url = process.argv[2];
const token = process.argv[3];
const api = new MurrApi(url, token);
gameTick();
setInterval(gameTick, 10 * 60 * 1000);

async function gameTick() {
    const shopInfo = await api.getShopInfo();
    console.log(`Date: ${new Date().toUTCString()}`)
    console.log(`Balance: ${shopInfo.balance}`);
    console.log(`Boxes: A: ${shopInfo.boxes.available} U: ${shopInfo.boxes.used}`);
    for (const product of shopInfo.inventory) {
        console.log(`Product: ${product.productID} Qty: ${product.quantity}, ED: ${product.extraDemand}`);
    }

    if (shopInfo.boxes.available > 5) {
        // buy products
        console.log("Buying products");
        for (const product of shopInfo.inventory) {
            if (product.quantity === 0) {
                console.log(`Buying product: ${product.productID} Qty: ${5}`);
                const buyResult = await api.buyProducts(product.productID, 5);
                console.log("Buy product result: ", buyResult)
            }   
            
            if (product.extraDemand === 0) {
                console.log(`Buying extra demand: ${product.productID} Qty: ${1}`);
                const buyResult = await api.promoteProduct(product.productID, 1);
                console.log("Buy extra demand result: ", buyResult)
            }  
        }
    }
    if (shopInfo.balance > shopInfo.boxes.price && shopInfo.boxes.available < 10) {
        // buy boxes
        console.log(`Buying boxes: qty ${1}`);
        const buyResult = await api.buyBoxes(1);
        console.log("Buy boxes result: ", buyResult)
    }
}