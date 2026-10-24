# Diary Application

A web-based diary application that allows users to register, log in, and manage their personal diary entries. The application uses a Node.js and Express.js backend with a MySQL database to store user information and diary posts.

## Features

- **User Registration:** Create an account using an email address and password.
- **Secure Password Storage:** Hash passwords using bcrypt before storing them in the database.
- **User Login:** Authenticate users using their registered credentials.
- **Create Diary Posts:** Add a title and description to a diary entry.
- **View Diary Posts:** Retrieve and display saved diary entries.
- **Database Integration:** Store and retrieve application data using MySQL.
- **User-Friendly Interface:** Build web pages using HTML, CSS, JavaScript, and Bootstrap.

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Node.js
- Express.js
- MySQL2
- bcrypt

### Database
- MySQL

### Development Tools
- Visual Studio Code
- MySQL Workbench
- Git and GitHub

## Project Structure

```text
## Project Structure

```text
Dairy_project/
│
├── Backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── Frontend/
│   ├── registration.html
│   ├── login.html
│   ├── feedpage.html
│   ├── post.html
│   ├── dedicated.html
│   ├── *.css
│   └── ...
│
├── README.md
└── .gitignore
```

**Folder description:**
- `Backend/` — Contains the Node.js and Express.js server, database connection, and API routes.
- `Frontend/` — Contains the HTML pages, CSS stylesheets, and frontend JavaScript files.
- `README.md` — Provides project information and setup instructions.
- `.gitignore` — Excludes files such as `.env` and `node_modules` from Git tracking.


*Note: Adjust the file names and locations above to match your actual project structure.*

## Prerequisites

Before running the application, install:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/mounika-08-eng/Diary-Application.git
```

### 2. Navigate to the project folder

```bash
cd Diary-Application
```

### 3. Install backend dependencies

```bash
cd Backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `Backend` folder and add your local database credentials:

```env
DB_PASSWORD=your_mysql_password
```

Replace the placeholder with your own MySQL password.

**Security note:** Never commit your `.env` file or publish database credentials on GitHub.

### 5. Configure the MySQL database

- Start your MySQL server.
- Create the database required by the application.
- Create the necessary tables for users and diary posts.
- Ensure that the table and column names match the SQL queries in your backend code.

Use your existing database schema when setting up the application.

### 6. Start the backend server

From the `Backend` folder, run:

```bash
node index.js
```

If you have configured a development script using nodemon, you can also run:

```bash
npm run dev
```

The backend should start on the port configured in your application, such as `3000`.

### 7. Open the frontend

Open the registration page using your local development setup. Ensure the frontend API requests point to your running backend server.

## Application Workflow

1. A new user registers with an email address and password.
2. The backend hashes the password and stores the user information in MySQL.
3. The user logs in using their credentials.
4. The user creates diary entries with a title and description.
5. The application stores and retrieves diary entries through the backend.

## Security Considerations

- Passwords are hashed using bcrypt before storage.
- Database credentials are kept in environment variables.
- Parameterized SQL queries should be used to help prevent SQL injection.
- Authentication and authorization should be enforced on protected backend routes.

## Future Enhancements

- Edit and delete diary entries.
- Improve session management and route protection.
- Add search and filtering for diary entries.
- Deploy the application with a cloud-hosted database.
- Improve the responsive design and user experience.

## Author

**Mounika Chodisetti**

GitHub: [mounika-08-eng](https://github.com/mounika-08-eng)

## Project Repository

[View Diary Application on GitHub](https://github.com/mounika-08-eng/Diary-Application)
