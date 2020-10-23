CREATE DATABASE activities

\c activities

CREATE TABLE offers (id SERIAL, firstname VARCHAR(50), lastname VARCHAR(50), age INT, city VARCHAR(50), sport VARCHAR(50), activity TEXT);

INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Mani', 'M', 37, 'Los Angeles', 'Muay Thai', 'pad work' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Steve', 'C', 27, 'Los Angeles', 'Muay Thai', 'clinch' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Julian', 'J', 22, 'New York', 'Muay Thai', 'sparring' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Monte', 'M', 20, 'Austin', 'BJJ', 'grappling spar' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Jose', 'D', 28, 'Boston', 'BJJ', 'conditioning' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Natalie', 'P', 32, 'Los Angeles', 'Muay Thai', 'conditioning' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Mark', 'M', 60, 'Boston', 'escrima', 'knife basics' );
INSERT INTO offers (firstname, lastname, age, city, sport, activity) VALUES ( 'Yoshi', 'M', 30, 'Los Angeles', 'Muay Thai', 'clinch' );

SELECT * FROM offers;


CREATE TABLE searches (id SERIAL, firstname VARCHAR(50), lastname VARCHAR(50), age INT, city VARCHAR(50), sport VARCHAR(50), activity TEXT);

INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Autumn', 'P', 29, 'Los Angeles', 'Muay Thai', 'pad work' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Anna', 'P', 35, 'Los Angeles', 'Muay Thai', 'pad work' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Alexa', 'D', 22, 'New York', 'Muay Thai', 'sparring' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Melissa', 'M', 25, 'New York', 'BJJ', 'grappling spar' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Edvin', 'C', 15, 'Los Angeles', 'Muay Thai', 'clinch' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Mike', 'M', 35, 'Boston', 'Muay Thai', 'sparring' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Shannon', 'L', 30, 'Boston', 'escrima', 'knife basics' );
INSERT INTO searches (firstname, lastname, age, city, sport, activity) VALUES ( 'Ion', 'C', 25, 'Austin', 'escrima', 'knife basics' );

SELECT * FROM searches;


-- REWORKING SEARCHES TABLE FOR EASIER INDEX ROUTING
CREATE TABLE searches (search_id SERIAL, fname VARCHAR(50), lname VARCHAR(50), age INT, city VARCHAR(50), sport VARCHAR(50), activity TEXT);

INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Autumn', 'P', 29, 'Los Angeles', 'Muay Thai', 'pad work' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Anna', 'P', 35, 'Los Angeles', 'Muay Thai', 'pad work' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Alexa', 'D', 22, 'New York', 'Muay Thai', 'sparring' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Melissa', 'M', 25, 'New York', 'BJJ', 'grappling spar' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Edvin', 'C', 15, 'Los Angeles', 'Muay Thai', 'clinch' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Mike', 'M', 35, 'Boston', 'Muay Thai', 'sparring' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Shannon', 'L', 30, 'Boston', 'escrima', 'knife basics' );
INSERT INTO searches (fname, lname, age, city, sport, activity) VALUES ( 'Ion', 'C', 25, 'Austin', 'escrima', 'knife basics' );

SELECT * FROM searches;


-- JOINING
CREATE TABLE matches AS
SELECT offers.firstname, offers.lastname, searches.fname, searches.lname, searches.city, searches.sport, searches.activity FROM offers INNER JOIN searches ON offers.city = searches.city AND offers.sport = searches.sport AND offers.activity = searches.activity

SELECT *
FROM offers, searches
WHERE offers.city = searches.city
AND offers.sport = searches.sport
AND offers.activity = searches.activity
