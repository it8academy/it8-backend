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