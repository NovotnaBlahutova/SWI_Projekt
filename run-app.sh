#!/bin/bash

echo "🚀 Startuji automatickou kontrolu Boujee Eshop..."

# 1. Kontrola Javy
if ! command -v java &> /dev/null; then
    echo "❌ Chyba: Java není nainstalována. Prosím, nainstaluj JDK 17."
    exit 1
fi

# 2. Kontrola Node.js
if ! command -v npm &> /dev/null; then
    echo "❌ Chyba: Node.js není nainstalován. Prosím, nainstaluj Node.js."
    exit 1
fi

# 3. Kontrola MariaDB/MySQL
if ! command -v mysql &> /dev/null; then
    echo "📦 MariaDB nenalezena. Pokouším se o instalaci (vyžaduje sudo)..."
    sudo apt-get update && sudo apt-get install -y mariadb-server
fi

# 4. Spuštění databáze
echo "Checking database..."
sudo service mariadb start || sudo service mysql start

# 5. Vytvoření DB pokud neexistuje
# Vytvoří databázi a rovnou do ní nalije tabulky ze souboru
mysql -e "CREATE DATABASE IF NOT EXISTS fashion_eshop;"
mysql fashion_eshop < sql/schema.sql

# 6. Instalace frontend závislostí, pokud chybí
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instaluji frontend závislosti..."
    cd frontend && npm install && cd ..
fi

# 7. SPUŠTĚNÍ VŠEHO NÁRAZ
echo "✨ Vše připraveno! Startuji Backend i Frontend..."
(cd backend && mvn spring-boot:run) & (cd frontend && npm run dev)
