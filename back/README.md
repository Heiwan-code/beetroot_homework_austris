## Setup

Install dependencies
```bash
npm install
```

Copy and rename the file .env.example to .env and change the configurations

### Migrations

Run the following command to run startup migrations.

```js
node ace migration:run
```

```js
node ace db:seed
```

### Running

Start the app locally

```js
node ace serve --watch
```
