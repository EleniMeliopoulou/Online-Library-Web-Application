# Online Library Web Application

This is a full-stack web application developed to simulate an online library system. Users can browse a collection of books, search for specific titles, borrow books, and manage their borrowed items, along with user authentication and profile management.

Note on Data Initialization: A CSV file is used for book data. It is a requirement to first run the endpoint /import-books for the books to be visible in the system.

Future Enhancements: Currently, security for authentication has not been implemented. This is a planned enhancement for the future, acknowledging its critical importance.

---

## Features

* **User Authentication:** User registration, login, and logout functionalities.
* **User Profile Management:** Users can update their personal information (e.g., username).
* **Book Catalog:** Display a comprehensive list of books with details like Title, Author, Category, Publication Year, Ratings, and Description.
* **Categorized Browse:** Books are displayed in organized categories for easy navigation.
* **Search Functionality:** Efficient search to find books by keywords.
* **Borrowing System:**
    * Users can borrow books with a click of a button.
    * A maximum limit of 5 borrowed books per user is enforced.
    * Books cannot be borrowed if already borrowed by another user.
* **"My Borrowed Books" Section:** A dedicated area for users to view and manage their currently borrowed books.
* **Return Functionality:** Users can return books, making them available again for others.

---

## Technologies Used

* **Back-End:**
    * Java
    * Spring Boot (Framework)
    * RESTful API design
* **Front-End:**
    * React (with Vite for fast development)
    * CSS (for styling)
* **Database:**
  * MySQL 

---

## Getting Started

### Prerequisites

* Java Development Kit (JDK) 17 or higher
* Node.js and npm (or Yarn)
* MySQL

Follow the steps below to set up and run the application locally.

1️⃣ Clone the Repository

```bash
git clone https://github.com/EleniMeliopoulou/Online-Library-Web-Application.git
cd Online-Library-Web-Application
```

### Back-End Setup (Spring Boot)

2️⃣ Database Configuration

Create a new MySQL database, for example:
```
CREATE DATABASE online_library;
```

Update your application.properties file with your MySQL credentials:
```properties
- spring.datasource.url=jdbc:mysql://localhost:3306/online_library
- spring.datasource.username=your_username
- spring.datasource.password=your_password
```

3️⃣ Start the Back-End

From the backend directory:
```bash
mvn spring-boot:run
```

4️⃣ Import Book Data

Before any books appear in the system, you must call the following endpoint:

GET http://localhost:8080/import-books

This loads the book data from the CSV file into the database.

### Front-End Setup (React + Vite)

5️⃣ Install Dependencies

From the frontend directory:
```bash
npm install
```

6️⃣ Start the Front-End
```bash
npm run dev
```
The application will be available at:

http://localhost:5173

### Connecting Front-End & Back-End

Ensure the backend is running on http://localhost:8080 and that the frontend is configured to send API requests to this URL (via .env or directly in your service files).

---

## Contribution

This project was developed independently as a personal academic project.
