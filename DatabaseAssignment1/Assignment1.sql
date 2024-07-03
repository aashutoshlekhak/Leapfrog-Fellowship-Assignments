-- set search_path to 'Day1Assignment';
drop table if exists products;
drop table if exists orders;

create table if not exists products(
	product_id int unique primary key, 
	product_name varchar(50),
	category varchar(50),  
	price float
);

create table if not exists orders (

	order_id int, 
	customer_name varchar(60), 
	product_id int, 
	quantity int, 
	order_date date, 
	foreign key (product_id) references products(product_id)
)


-- Insert data into the table 
insert into products(product_id, product_name, category, price) values 
(1, 'Apple', 'Fruits', 100),
(2, 'Ball', 'Toy', 200),
(3, 'Cat', 'Pet', 300),
(4, 'Dog', 'Pet', 400),
(5, 'Elephant', 'Animal', 500),
(6, 'Fish', 'Animal', 700);
insert into orders(order_id, customer_name, product_id, quantity, order_date) values
(1, 'A', 1, 10, '2024-01-01'), 
(2, 'B', 2, 20, '2024-01-02'), 
(3, 'C', 3, 100, '2024-01-03'), 
(4, 'D', 4, 50, '2024-01-01'), 
(5, 'A', 5, 70, '2024-01-04'), 
(6, 'E',6, 90, '2024-01-04'), 
(7, 'F', 6, 80, '2024-01-05'), 
(8, 'A', 5, 1, '2024-01-06'), 
(9, 'A', 4, 2, '2024-01-07'); 


-- Update the price
Update products
	set price=500
	where product_name = 'Apple';


-- Delete from the table 
Delete from orders where customer_name = 'A';
select * from orders


-- calculate the total quantity ordered for each product category in the orders table.
select product_id, sum(quantity) from orders group by product_id;

-- Find Categories Where the Total Number of Products Ordered is Greater Than a Specified Number 
select category, total_quantity
	from (
	select p.category, sum(o.quantity) as total_quantity
	from products p 
	left join orders o on p.product_id=o.product_id
	group by p.category
	) where total_quantity > 50









