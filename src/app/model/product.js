var db = require('../config/db');

var product = {
    getAllProduct: function(callback) {
        return db.query("select * from products where isDeleted = 0", callback);
    },

    getAllProductDeleted: function(callback) {
        return db.query("select * from products where isDeleted = 1", callback);
    },

    getProductByID: function(id, callback) {
        return db.query("select * from products where id = ?", id, callback);
    },

    getProductByBrand: function(brand, callback) {
        return db.query("select * from products where brand = ?", brand, callback);
    },

    addProduct: function(data, callback) {
        return db.query("insert into products set ?", data, callback);
    },

    updateProduct: function(id, data, callback) {
        return db.query("update products set name=?, img_url=?, brand=?, description=?, price=?, amount=?, status=? where id=? ", [data.name, data.img_url, data.brand, data.description, data.price, data.amount, data.status, id], callback);
    },

    deleteProduct: function(id, callback) {
        return db.query("update products set isDeleted = 1 where id=?", id, callback);
    },

    hardDeleteProduct: function(id, callback) {
        return db.query(`call hardDeleteProduct(${id})`, id, callback);
    },

    countDeleted(callback) {
        return db.query("select count(id) as deleted from products where isDeleted = 1", callback);
    },

    restoreProduct: function(id, callback) {
        return db.query("update products set isDeleted = 0 where id=?", id, callback);
    },

    ratingProduct: function(id, callback) {
        return db.query(`call checkRate(${id})`, id, callback);
    },

    searchProduct: function(key, callback) {
        return db.query('select id, name, img_url from products where name like ? order by price desc limit 6', key+'%', callback);
    },

    statisticBrand: function(callback) {
        return db.query('call statisticBrand()', callback);
    },

    revenue(callback) {
        return db.query('call revenue()', callback);
    }
}

module.exports = product;