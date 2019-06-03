
DROP DATABASE IF EXISTS taco_truck_db;

CREATE DATABASE taco_truck_db;

USE taco_truck_db;

CREATE TABLE menu_items
(
	id int NOT NULL AUTO_INCREMENT,
	item varchar(20) NOT NULL,
    shell enum('hard', 'soft') NOT NULL DEFAULT 'hard',
    shell_type enum('flour', 'corn') NOT NULL DEFAULT 'flour',
    lettuce enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    tomatoes enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    cheese enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    onion enum('xtra', 'reg', 'light', 'none') NOT NULL DEFAULT 'reg',
    sauce enum('none', 'mild', 'hot', 'fire') NOT NULL DEFAULT 'mild',
    drink enum('water', 'coke', 'iced tea', 'lemonade', 'sprite') NOT NULL,
    description varchar(255) NOT NULL,
    price decimal(15,2) NOT NULL,
    veagan boolean NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);

CREATE TABLE placed_orders
(
	id int NOT NULL AUTO_INCREMENT,
    menu_item int(20) NOT NULL,
	customer varchar(20) NOT NULL,
    filled boolean NOT NULL default false,
    price decimal(15,2) NOT NULL,
    sales_tax decimal(15,2) NOT NULL,
    total_price decimal(15,2) NOT NULL,
    time_ordered datetime NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id)
);

CREATE TABLE in_order
(
	id int NOT NULL AUTO_INCREMENT,
    menu_item int(20) NOT NULL,
    order_id int(10) NOT NULL,
    quantity int(10) NOT NULL,
    customization varchar(255),
    price decimal(15,2) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id),
    FOREIGN KEY (order_id) REFERENCES placed_orders(id)
);