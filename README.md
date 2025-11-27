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
