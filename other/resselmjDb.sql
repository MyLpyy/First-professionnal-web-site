CREATE TABLE customers (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    first_name TEXT,
    phone_number INTEGER,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    token VARCHAR(250)
);

CREATE TABLE product (
    id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(255) DEFAULT 'No description',
    img_path VARCHAR(255) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    genre VARCHAR(255) DEFAULT 'Any genre'
);

CREATE TABLE user_as_products (
    customers_id INTEGER UNSIGNED NOT NULL,
    product_id INTEGER UNSIGNED NOT NULL,
    order_id INTEGER UNSIGNED,
    status VARCHAR(255) DEFAULT 'PENDING', /*(PENDING, ORDERED, PAYED)*/
    FOREIGN KEY (customers_id) REFERENCES customers(customers_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE TABLE orders (
    orders_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    customers_id INTEGER UNSIGNED NOT NULL,
    status VARCHAR(255) DEFAULT 'PROCESSING', /*(PROCESSING, PENDING, COMPLETE, ERROR)*/
    ordered_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (customers_id) REFERENCES customers(customers_id)
);

CREATE TABLE orders_adresses (
    orders_id INTEGER UNSIGNED UNIQUE,
    customers_id INTEGER UNSIGNED NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    postal_code INTEGER NOT NULL,
    city VARCHAR(255) NOT NULL,
    FOREIGN KEY (customers_id) REFERENCES customers(customers_id),
    FOREIGN KEY (orders_id) REFERENCES orders(orders_id)
);

INSERT INTO product (img_path, price, name, size)
VALUES ('/img/img1.png', 235.99, 'airforce', '42');

DELETE FROM product WHERE product_id = 1;

/*"/img/product1.png", 320.90, "sneackers1", "SMALL", "sneackers"*/

INSERT INTO product (description, img_path, price, name, size, type, genre) 
    VALUES (NULL, "test/", 190.90, "MAX1", "MEDIUM", "sneackers", NULL);

    SELECT * FROM product WHERE product.type = "sneackers";


/*______________________________________________________________________*/
/*________________________Manipulation TEST_____________________________*/
/*______________________________________________________________________*/


INSERT INTO customers (name, first_name, email, password)
VALUES ('tibo', 'rbn', 'tibrbn@gmail.com', '126');
INSERT INTO customers (name, first_name, email, password)
VALUES ('tibo2', 'rbn2', 'tibrbn@gmail.com2', '1262');
INSERT INTO customers (name, first_name, email, password)
VALUES ('tibo3', 'rbn3', 'tibrbn@gmail.com3', '1263');

/*______________________________________________________________________*/

INSERT INTO product (img_path, price, name, size)
VALUES ('/img/img1.png', 235.99, 'airforce', '42');
INSERT INTO product (img_path, price, name, size)
VALUES ('/img/img2.png', 435, 'airforce2', '45'),
('/img/img3.png', 135.50, 'airforce3', '42'),
('/img/img4.png', 35.50, 'airforce4', '32');

/*___________________________Ajout au panier____________________________*/

INSERT INTO user_as_product (customers_id, product_id)
VALUES (1, 2),(1, 3),(1,1),(3, 4),(3, 2);
INSERT INTO user_as_product (customers_id, product_id)
VALUES (1, 2);

/*_____________________________command past_____________________________*/

INSERT INTO orders (customers_id)
VALUES (1),(2);
/*Recuperation de l'id customers dans orders pour l'ajouter a orders_adresses*/
SELECT * FROM orders
WHERE orders.customers_id = 1;
INSERT INTO orders_adresses (orders_id, customers_id, adresse, postal_code, city)
VALUES (9, 1, '4 rue albert callens', 60800, 'Rouville');


/*________________________affichage info command________________________*/

SELECT * FROM orders 
INNER JOIN user_as_product ON orders.customers_id = user_as_product.customers_id
INNER JOIN orders_adresses ON orders.orders_id = orders_adresses.orders_id;

UPDATE product SET name = "max1" WHERE id = 1;