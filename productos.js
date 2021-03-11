class Productos {
    constructor(prod = []){
        this.productos = Array.isArray(prod) ? prod : [];
    }
    getList() {
        return this.productos;
    }
    getProduct(id) {
        return this.productos.filter((el) => el.id === Number(id));
    }
    addProduct(item) {
        const itemWithId = {
            ...item,
            price: Number(item.price),
            id: this.productos.length + 1
        }
        this.productos.push(itemWithId);
        return itemWithId;
    }
}

module.exports = Productos;