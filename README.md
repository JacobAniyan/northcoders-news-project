# NC News Seeding

## Setting up Environment files

- Set up .env files: Create .env.test and .env.development files in same directory as .gitignore.
- In each file, set PGDATABASE as respective database names:

```
PGDATABASE = nc_news_test       // in .env.test
```

```
PGDATABASE = nc_news           // in .env.development
```

## Dependencies

run

```
npm install
```

to install packages

## Setting up database and seeding

- running npm run setup-dbs drops all existing databases and creates new development and test databases
- running npm run seed-dev seeds the development database
