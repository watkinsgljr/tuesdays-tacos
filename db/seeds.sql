INSERT INTO menu (item, description, price) VALUES ('beef taco', 'Taco with farm raised beef that will leave your mouth watering.', '2.50');
INSERT INTO menu (item, description, price) VALUES ('chicken taco', 'Taco with farm raised chicken grilled to perfection.', '2.00');
INSERT INTO menu (item, description, price) VALUES ('veggie taco', 'Taco made completely with fresh and organic veggies.', '1.50');
INSERT INTO menu (item, description, price) VALUES ('veagan taco', 'Our animal free taco with the great taste you will not believe.', '2.00');

INSERT INTO menu (item, shell, shell_type, lettuce, tomatoes, cheese, onion, sauce, price) 
VALUES ('drink', null, null, null, null, null, null, null, '1.00');

INSERT INTO orders (customer, price, sales_tax, total_price) VALUES ('Greg', '5.00', '2.00', '7.00');
INSERT INTO orders (customer, price, sales_tax, total_price) VALUES ('Tina', '3.00', '1.00', '4.00');
INSERT INTO orders (customer, price, sales_tax, total_price) VALUES ('Paul', '1.50', '.75', '2.25');

INSERT INTO items_ordered (order_id, item_id, description) VALUES ('1', '1', 'test order');
INSERT INTO items_ordered (order_id, item_id, description) VALUES ('1', '2', 'test order');
INSERT INTO items_ordered (order_id, item_id, description) VALUES ('2', '3', 'test order');
INSERT INTO items_ordered (order_id, item_id, description) VALUES ('3', '4', 'test order');

INSERT INTO items_ordered (order_id, item_id, quantity) VALUES ('1', '5', '3');
INSERT INTO items_ordered (order_id, item_id) VALUES ('2', '5');





