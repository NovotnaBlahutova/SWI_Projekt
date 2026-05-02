# Fashion E-Shop Backend - Spring Boot 3

A high-fashion e-shop backend built with Spring Boot 3, Spring Data JPA, and MariaDB.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/eshop/
│   │   │   ├── entity/              # JPA Entities
│   │   │   │   ├── Supplier.java
│   │   │   │   ├── Category.java
│   │   │   │   ├── ProductAttribute.java
│   │   │   │   └── Product.java
│   │   │   ├── repository/          # Spring Data JPA Repositories
│   │   │   │   ├── SupplierRepository.java
│   │   │   │   ├── CategoryRepository.java
│   │   │   │   ├── ProductAttributeRepository.java
│   │   │   │   └── ProductRepository.java
│   │   │   ├── service/             # Business Logic (TBD)
│   │   │   ├── controller/          # REST Controllers (TBD)
│   │   │   ├── dto/                 # Data Transfer Objects (TBD)
│   │   │   └── FashionEshopApplication.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/                        # Unit Tests (TBD)
└── pom.xml
```

## Architecture

The project follows a strict **3-tier architecture**:

### 1. **Data Access Layer** ✅
- **Entities**: JPA mapped classes representing database tables
- **Repositories**: Spring Data JPA interfaces for database operations

### 2. **Application/Business Layer** (In Progress)
- **Services**: Business logic and domain services
- **DTOs**: Data Transfer Objects for API communication

### 3. **Presentation Layer** (In Progress)
- **Controllers**: REST API endpoints
- **Exception Handling**: Global error handling

## Database Schema

### Entity Relationships

```
Supplier (1) ──→ (Many) Product
Category (1) ──→ (Many) Product
Product (Many) ──→ (Many) ProductAttribute
```

### Entities

#### **Supplier**
- `id` (Long, PK)
- `name` (String)
- `address` (String)
- `ico` (String, unique)
- `email` (String, unique)
- Relations: One-to-Many with Product

#### **Category**
- `id` (Long, PK)
- `name` (String)
- `slug` (String, unique)
- `gender` (String)
- `imageUrl` (String)
- Relations: One-to-Many with Product

#### **ProductAttribute**
- `id` (Long, PK)
- `attributeType` (String) - e.g., "SIZE", "VOLUME"
- `value` (String) - e.g., "42", "100ml"
- Relations: Many-to-Many with Product

#### **Product**
- `id` (Long, PK)
- `name` (String)
- `slug` (String, unique)
- `price` (Double)
- `description` (String)
- `tag` (String)
- `gender` (String)
- `imageUrl` (String)
- `category_id` (Long, FK)
- `supplier_id` (Long, FK)
- Relations: Many-to-One with Category, Many-to-One with Supplier, Many-to-Many with ProductAttribute

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MariaDB 10.5+ running locally

## Setup Instructions

### 1. Database Setup

```sql
CREATE DATABASE fashion_eshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Configure Database Connection

Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mariadb://localhost:3306/fashion_eshop
    username: your_username
    password: your_password
```

### 3. Build and Run

```bash
# Build the project
mvn clean package

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## Dependencies

- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Web**
- **Spring Validation**
- **MariaDB Driver 3.2.0**
- **Lombok** (for reducing boilerplate)
- **JUnit 5** (for testing)

## Next Steps

- [ ] Create Service layer with business logic
- [ ] Create DTO classes for API request/response
- [ ] Create REST Controllers
- [ ] Add global exception handling
- [ ] Add input validation
- [ ] Create unit and integration tests
- [ ] Add API documentation (Springdoc OpenAPI/Swagger)
- [ ] Implement authentication and authorization

## Git Workflow

This branch (`feature/spring-boot-backend`) contains the foundational backend structure. Create feature branches for additional components:

```bash
git checkout -b feature/service-layer
git checkout -b feature/rest-controllers
git checkout -b feature/api-documentation
```

## License

MIT License