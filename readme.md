# Basic Learning Material for Express, SQLite, and Fetch API

## Description

This project is a very basic learning material that covers key aspects of building a web application using Express, SQLite, and TypeScript. It demonstrates the use of the Fetch API, basic CORS setup in an Express server, SQLite for database management, error handling, and service layer implementation with a functional approach.

**Note:** This project is intended for educational purposes and is not suitable for production environments.

## Prerequisites

- Node.js (version 18 or later recommended)
- npm (comes with Node.js)

## Installation

Run the following command in the project's root directory to install dependencies:
`npm i`

## Usage

### Development Mode

To start the server in development mode, run:
`npm run dev`

### Production Mode

For production mode, run:
`npm start`

## Building the Project

### Compile TypeScript

To compile TypeScript to JavaScript, run:
`npm run build`

### Testing

To execute tests, run:
`npm test`

## Database Setup

To create the required tables in the SQLite database, uncomment the `createSchema()` function call in `server.ts`. This function initializes the database schema. Run the server once to execute this setup.

## Troubleshooting

If you encounter the SQLite error "Unable to Open Database File", change `sqlite3.OPEN_READWRITE` to `sqlite3.OPEN` in `server.ts`. This modification allows SQLite to create the database file if it doesn't exist. After the file is created, revert to the original setting.

## Next steps
- Basic Auth
- Improve the folder structure
- Implement an ORM (hopefully Prisma)
- Docker file to easy deployment
- Github actions to run testing, pull-request validation and deployment
- Logging with Datadog or any other provider

## Contributing

Contributions to this project are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
