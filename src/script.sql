CREATE DATABASE IF NOT EXISTS it8academy;

USE it8academy;

CREATE TABLE
    IF NOT EXISTS users(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        mode_of_learning VARCHAR(50) NOT NULL,
        course VARCHAR(50) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        course_amount VARCHAR(50) NOT NULL,
        payment_status VARCHAR(50),
        password VARCHAR(100) NOT NULL,
        reset_password_token VARCHAR(300),
        reset_password_expires TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        email VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

--  Add more tables to an existing table users

ALTER TABLE users
ADD UNIQUE(email),
ADD COLUMN age VARCHAR(50),
ADD COLUMN gender VARCHAR(50),
ADD
    COLUMN address VARCHAR(50),
ADD COLUMN city VARCHAR(50),
ADD
    COLUMN country VARCHAR(50),
ADD
    COLUMN zip_code VARCHAR(50),
ADD
    COLUMN occupation VARCHAR(50);

CREATE TABLE
    IF NOT EXISTS transactions(
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11) UNSIGNED NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        type ENUM('deposit', 'withdrawal') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );