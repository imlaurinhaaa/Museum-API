CREATE DATABASE museum;

\c museum;

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    age INTEGER,
    style VARCHAR(255),
    death BOOLEAN
);

CREATE TABLE galleries (
    id SERIAL PRIMARY KEY,
    artist_id INTEGER NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    name VARCHAR(255),
    photo TEXT,
    localization VARCHAR(255)
);

INSERT INTO artists (name, age, style, death) VALUES
('Pablo Picasso', 91, 'Cubism', TRUE),
('Vincent van Gogh', 37, 'Post-Impressionism', TRUE),
('Leonardo da Vinci', 67, 'Renaissance', TRUE);

