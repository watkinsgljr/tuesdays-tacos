
DROP DATABASE IF EXISTS taco_truck_db;

CREATE DATABASE taco_truck_db;

USE taco_truck_db;

CREATE TABLE menu
(
	id int(10) NOT NULL AUTO_INCREMENT,
	item varchar(20) NOT NULL,
    shell enum('hard', 'soft') DEFAULT 'hard',
    shell_type enum('flour', 'corn') DEFAULT 'flour',
    lettuce enum('xtra', 'reg', 'light', 'none') DEFAULT 'reg',
    tomatoes enum('xtra', 'reg', 'light', 'none') DEFAULT 'reg',
    cheese enum('xtra', 'reg', 'light', 'none') DEFAULT 'reg',
    onion enum('xtra', 'reg', 'light', 'none') DEFAULT 'reg',
    sauce enum('none', 'mild', 'hot', 'fire')  DEFAULT 'mild',
    description varchar(255),
    price decimal(15,2) NOT NULL,
    veagan boolean NOT NULL DEFAULT false,
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
    time_ordered datetime NOT NULL default NOW(),
	PRIMARY KEY (id)
);

CREATE TABLE items_ordered
(
	id int(10) NOT NULL AUTO_INCREMENT,
    order_id int(10) NOT NULL,
    item_id int(10),
    quantity int(10) NOT NULL default '1',
    description varchar(255),
	PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES menu(id)
);
