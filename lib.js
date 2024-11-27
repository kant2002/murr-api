export class MurrApi {
    constructor(url, token) {
        this.token = token;
        this.api = url;
    }
    async promoteProduct(inventoryId, quantity) {
        return await this.doV1Request(`inventory/${inventoryId}/promote`, "POST", {quantity});
    }
    async buyProducts(inventoryId, quantity) {
        return await this.doV1Request(`products/${inventoryId}/buy`, "POST", {quantity});
    }
    async buyBoxes(quantity) {
        return await this.doV1Request(`shop/boxes`, "POST", {quantity});
    }
    async getProductInformation(inventoryId) {
        return await this.doV1Request(`products/${inventoryId}`, "GET");
    }
    async getShopInfo() {
        return await this.doV1Request(`shop`, "GET");
    }
    async getTopSellers(today, limit) {
        return await this.doV1Request(`v1/analytics/top-sellers?today=${today}&limit=${limit}`, "GET");
    }
    async doV1Request(url, method, body) {
        const params = {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "method": method
        };
        if (method === "POST") {
            params.body = body;
        }
        const response = await fetch(`${this.api}${url}`, params);
        return await response.json();
    }
}