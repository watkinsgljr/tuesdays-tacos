
DROP DATABASE IF EXISTS taco_truck_db;

CREATE DATABASE taco_truck_db;

USE taco_truck_db;

CREATE TABLE taco_menu
(
	id int(10) NOT NULL AUTO_INCREMENT,
	item varchar(20) NOT NULL,
    shell enum('hard', 'soft') NOT NULL DEFAULT 'hard',
    shell_type enum('flour', 'corn') NOT NULL DEFAULT 'flour',
    lettuce enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    tomatoes enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    cheese enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    onion enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    sauce enum('none', 'mild', 'hot', 'fire') NOT NULL DEFAULT 'mild',
    description varchar(255) NOT NULL,
    price decimal(15,2) NOT NULL,
    veagan boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE drink_menu
(
	id int(10) NOT NULL AUTO_INCREMENT,
	drink_item enum('water', 'lemonade', 'soda', 'sweet tea', 'unsweetened tea') NOT NULL,
    price decimal(15,2) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE orders
(
	id int(10) NOT NULL AUTO_INCREMENT,
	customer varchar(20) NOT NULL,
    filled boolean NOT NULL default false,
    price decimal(15,2) NOT NULL,
    sales_tax decimal(15,2) NOT NULL,
    total_price decimal(15,2) NOT NULL,
    time_ordered datetime NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE tacos_ordered
(
	id int(10) NOT NULL AUTO_INCREMENT,
    order_id int(10) NOT NULL,
    taco_id int(10),
    quantity int(10) NOT NULL,
    customization varchar(255),
    unit_price decimal(15,2) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (taco_id) REFERENCES taco_menu(id)
);

CREATE TABLE drinks_ordered
(
	id int(10) NOT NULL AUTO_INCREMENT,
    order_id int(10) NOT NULL,
    drink_id int(10),
    quantity int(10) NOT NULL,
    unit_price decimal(15,2) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (drink_id) REFERENCES drink_menu(id)
);