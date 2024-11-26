export class MurrApi {
    constructor(url, token) {
        this.token = token;
        this.api = url;
    }
    async promoteProduct(inventoryId, quantity) {
        const response = await fetch(`${this.api}v1/inventory/${inventoryId}/promote`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "body": JSON.stringify({quantity}),
            "method": "POST"
        });
        return await response.json();
    }
    buyProducts(inventoryId, quantity) {
        return fetch(`${this.api}v1/products/${inventoryId}/buy`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "body": JSON.stringify({quantity}),
            "method": "POST"
        });
    }
    buyBoxes(quantity) {
        return fetch(`${this.api}v1/shop/boxes`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "body": JSON.stringify({quantity}),
            "method": "POST"
        });
    }
    getProductInformation(inventoryId) {
        return fetch(`${this.api}v1/products/${inventoryId}`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "method": "GET"
        });
    }
    async getShopInfo() {
        const response = await fetch(`${this.api}v1/shop`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "method": "GET"
        });
        return await response.json();
    }
    getTopSellers(today, limit) {
        return fetch(`${this.api}v1/analytics/top-sellers?today=${today}&limit=${limit}`, {
            "headers": {
                "authorization": `Bearer ${this.token}`,
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
            },
            "method": "GET"
        });
    }
}