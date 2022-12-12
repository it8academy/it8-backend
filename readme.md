### Login to mysql
❯ mysql -u root -p

#### Drop database
❯ drop database database_name;

#### use database
❯ use database_name;
> use it8academy;

#### Create database
❯ create database it8academy;

#### Create table
```sql
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
        reset_password_token VARCHAR(100),
        reset_password_expires TIMESTAMP,
        email VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
```

```sql
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
```