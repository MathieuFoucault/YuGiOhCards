CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE  
);


CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL  
);


CREATE TABLE IF NOT EXISTS card (
     id INT AUTO_INCREMENT PRIMARY KEY,
    image TEXT,
    french_name VARCHAR(100) NOT NULL,
    english_name VARCHAR(100) NOT NULL,
    rarity VARCHAR(50) NOT NULL,
    level_rank INT NULL,
    card_text TEXT NULL,
    atk INT NULL,
    def INT NULL,
    user_id INT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);