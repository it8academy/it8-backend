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
        reset_password_expires TIMESTAMP,
        email VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );