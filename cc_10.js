// Task 1: Creating a Product Class
class Product {
    constructor(name, id, price, stock) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.stock = stock;
    }

    getDetails() {
        return `Product: ${this.name}, ID: ${this.id}, Price: $${this.price}, Stock: ${this.stock}`;
    }

    updateStock(quantity) {
        if (this.stock >= quantity) {
            this.stock -= quantity;
        } else {
            console.log("Insufficient stock");
        }
    }
}


// Task 2: Creating an Order Class
class Order {
    constructor(orderId, product, quantity) {
        if (product.stock >= quantity) {
            this.orderId = orderId;
            this.product = product;
            this.quantity = quantity;
            this.totalPrice = product.price * quantity;
            product.updateStock(quantity);
        } else {
            throw new Error("Not enough stock to place the order");
        }
    }

    getOrderDetails() {
        return `Order ID: ${this.orderId}, Product: ${this.product.name}, Quantity: ${this.quantity}, Total Price: $${this.totalPrice}`;
    }
}


// Task 3: Creating an Inventory Class
class Inventory {
    constructor() {
        this.products = [];
        this.orders = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    listProducts() {
        this.products.forEach(product => console.log(product.getDetails()));
    }

     // Task 4: Implementing Order Management
     placeOrder(orderId, product, quantity) {
        try {
            const order = new Order(orderId, product, quantity);
            this.orders.push(order);
        } catch (error) {
            console.log(error.message);
        }
    }

    listOrders() {
        this.orders.forEach(order => console.log(order.getOrderDetails()));
    }


    // Task 5: Implementing Product Restocking
    restockProduct(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            product.stock += quantity;
        } else {
            console.log("Product not found");
        }
    }
}

// Test cases
const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails()); // Expected output

prod1.updateStock(3);
console.log(prod1.getDetails()); // Expected stock: 7

const inventory = new Inventory();
inventory.addProduct(prod1);
inventory.listProducts(); // Expected output

inventory.placeOrder(601, prod1, 2);
inventory.listOrders(); // Expected output
console.log(prod1.getDetails()); // Expected stock: 5

inventory.restockProduct(101, 5);
console.log(prod1.getDetails()); // Expected stock: 10
