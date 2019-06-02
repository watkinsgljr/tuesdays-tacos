CREATE DATABASE taco_truck_db;

USE taco_truck_db;

CREATE TABLE menu_items
(
	id int NOT NULL AUTO_INCREMENT,
	item varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    price decimal(15,2) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE taco_orders
(
	id int NOT NULL AUTO_INCREMENT,
    menu_item int(20) NOT NULL,
	customer varchar(20) NOT NULL,
    order_id int(10) NOT NULL,
	taco varchar(10) NOT NULL,
	customization varchar(255) NOT NULL,
    sauce varchar(10) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id)
);

CREATE TABLE drink_orders
(
	id int NOT NULL AUTO_INCREMENT,
    menu_item int(20) NOT NULL,
    customer varchar(20) NOT NULL,
    order_id int(10) NOT NULL,
	drink varchar(10) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id)
);