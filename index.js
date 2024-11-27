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
            const productResult = await api.getProductInformation(product.productID);
            if (product.quantity < productResult.product.baseDemand) {
                let qty = Math.min(5, Math.floor(shopInfo.balance / productResult.product.buyPrice));
                qty = 5;
                console.log(`Buying product: ${product.productID} Qty: ${qty}`);
                const buyResult = await api.buyProducts(product.productID, qty);
                console.log("Buy product result: ", buyResult)
            }
            
            if (product.extraDemand < productResult.product.baseDemand) {
                const qty = productResult.product.baseDemand - product.extraDemand;
                console.log(`Buying extra demand: ${product.productID} Qty: ${qty}`);
                const buyResult = await api.promoteProduct(product.productID, qty);
                console.log("Buy extra demand result: ", buyResult)
            }
        }
    }
    if (shopInfo.balance > shopInfo.boxes.price + 200 && shopInfo.boxes.available < 10) {
        // buy boxes
        console.log(`Buying boxes: qty ${1}`);
        const buyResult = await api.buyBoxes(1);
        console.log("Buy boxes result: ", buyResult)
    }
}