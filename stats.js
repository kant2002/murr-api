import { MurrApi } from "./lib.js";
import process from "process";

const url = process.argv[2];
const token = process.argv[3];
const name = process.argv[4];
const api = new MurrApi(url, token);
const shopInfo = await api.getShopInfo();
console.log(`Shopping availability: ${shopInfo.shopping.uiMessage}`)
const todayStats = await api.getTopSellers(true, 50);
for (let i = 0; i < todayStats.top.length; i++) {
    const shop = todayStats.top[i];
    if (shop.name == name) {
        console.log(`Shop ${name} today at place ${i + 1} with total revenue ${shop.totalRevenue} and loyalty ${shop.loyalty}`)
    }
}
const allTimeStats = await api.getTopSellers(false, 50);
for (let i = 0; i < allTimeStats.top.length; i++) {
    const shop = allTimeStats.top[i];
    if (shop.name == name) {
        console.log(`Shop ${name} alltime at place ${i + 1} with total revenue ${shop.totalRevenue} and loyalty ${shop.loyalty}`)
    }
}