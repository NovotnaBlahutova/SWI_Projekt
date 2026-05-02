-- ===== 1. KATEGORIE =====

CREATE TABLE kategorie (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazev VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    parent_id INT NULL,

    FOREIGN KEY (parent_id) REFERENCES kategorie(id) ON DELETE SET NULL
);

CREATE INDEX idx_kategorie_slug ON kategorie(slug);


-- ===== 2. PRODUKTY =====

CREATE TABLE produkty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazev VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    popis TEXT,
    cena DECIMAL(10,2) NOT NULL,
    sklad INT NOT NULL,
    obrazek VARCHAR(255) DEFAULT '/images/default.jpg',
    aktivni BOOLEAN DEFAULT TRUE,
    kategorie_id INT,
    vytvoreno DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (kategorie_id) REFERENCES kategorie(id) ON DELETE SET NULL
);

CREATE INDEX idx_produkty_slug ON produkty(slug);


-- ===== 3. ZÁKAZNÍCI =====

CREATE TABLE zakaznici (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jmeno VARCHAR(50) NOT NULL,
    prijmeni VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefon VARCHAR(20),
    vytvoreno DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- ===== 4. ADRESY =====

CREATE TABLE adresy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zakaznik_id INT,

    ulice VARCHAR(100),
    mesto VARCHAR(50),
    psc VARCHAR(20),
    stat VARCHAR(50),

    FOREIGN KEY (zakaznik_id) REFERENCES zakaznici(id) ON DELETE CASCADE
);


-- ===== 5. OBJEDNÁVKY =====

CREATE TABLE objednavky (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zakaznik_id INT,
    stav ENUM('Nova', 'Zaplacena', 'Odeslana', 'Dokoncena') DEFAULT 'Nova',
    vytvoreno DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (zakaznik_id) REFERENCES zakaznici(id) ON DELETE SET NULL
);


-- ===== 6. POLOŽKY OBJEDNÁVKY =====

CREATE TABLE polozky_objednavek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    objednavka_id INT,
    produkt_id INT,

    mnozstvi INT NOT NULL,
    cena DECIMAL(10,2) NOT NULL,

    nazev_produktu VARCHAR(100) NOT NULL,

    FOREIGN KEY (objednavka_id) REFERENCES objednavky(id) ON DELETE CASCADE,
    FOREIGN KEY (produkt_id) REFERENCES produkty(id) ON DELETE SET NULL
);


-- ===== 7. PLATBY =====

CREATE TABLE platby (
    id INT AUTO_INCREMENT PRIMARY KEY,
    objednavka_id INT,
    castka DECIMAL(10,2) NOT NULL,
    metoda VARCHAR(50) NOT NULL,
    stav ENUM('Ceka', 'Zaplaceno', 'Neuspesne') DEFAULT 'Ceka',
    datum DATETIME,

    FOREIGN KEY (objednavka_id) REFERENCES objednavky(id) ON DELETE CASCADE
);


-- ===== 8. DOPRAVA =====

CREATE TABLE doprava (
    id INT AUTO_INCREMENT PRIMARY KEY,
    objednavka_id INT,
    dopravce VARCHAR(50) NOT NULL,
    tracking VARCHAR(100),
    stav ENUM('Pripravuje se', 'Odeslano', 'Doruceno') DEFAULT 'Pripravuje se',
    datum DATETIME,

    FOREIGN KEY (objednavka_id) REFERENCES objednavky(id) ON DELETE CASCADE
);

-- ===== TESTOVACÍ DATA =====
INSERT INTO kategorie (nazev, slug) VALUES ('Oblečení', 'obleceni'), ('Doplňky', 'doplnky');

INSERT INTO produkty (nazev, slug, popis, cena, sklad, kategorie_id) 
VALUES ('Boujee Tričko', 'boujee-tricko', 'Luxusní bavlněné tričko', 999.00, 50, 1);
