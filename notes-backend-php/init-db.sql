START TRANSACTION;
-- DROP TABLE IF EXISTS user;
-- DROP TABLE IF EXISTS note;
-- DROP TABLE IF EXISTS revoked_token;
CREATE OR REPLACE TABLE user (
    id	INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    username	TEXT NOT NULL UNIQUE,
    password	TEXT NOT NULL
);
CREATE OR REPLACE TABLE note (
    title	TEXT NOT NULL,
    body	TEXT,
    id	INTEGER NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    author_id	INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE OR REPLACE TABLE revoked_token (
    id	INTEGER NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    token	TEXT NOT NULL UNIQUE
);
INSERT INTO user (id,username,password) VALUES
    (1,'kellie','pants'),
    (3,'notkellie','notpants'),
    (6,'anotheruser','password');
INSERT INTO note (title,body,id,author_id) VALUES
    ('This is a note','bodytext',1,1),
    ('Another note','more bodytext',2,1),
    ('Yet a third','can you believe it, more bodytext',3,1),
    ('Not a note','not bodytext',4,3),
    ('Still not a note','whatever it is, it is not bodytext',5,3);
COMMIT;