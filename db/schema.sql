
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
    description varchar(255) NOT NULL,
    price decimal(15,2) NOT NULL,
    veagan boolean NOT NULL DEFAULT false,
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
    sauce enum('none', 'mild', 'hot', 'fire') NOT NULL DEFAULT 'mild',
    time_ordered datetime NOT NULL,
    filled boolean NOT NULL default false,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id)
);

CREATE TABLE drink_orders
(
	id int NOT NULL AUTO_INCREMENT,
    menu_item int(20) NOT NULL,
    customer varchar(20) NOT NULL,
    order_id int(10) NOT NULL,
	drink enum('water', 'coke', 'iced tea', 'lemonade', 'sprite') NOT NULL,
    time_ordered datetime NOT NULL,
    filled boolean NOT NULL default false,
	PRIMARY KEY (id),
    FOREIGN KEY (menu_item) REFERENCES menu_items(id)
);