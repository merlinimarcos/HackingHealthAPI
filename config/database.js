module.exports = {
    "development": {
      "username": "postgres",
      "password": "root",
      "database": "hackinghealth_development",
      "host": "172.21.0.2",
      "dialect": "postgres"
    },
    "test": {
      "username": "postgres",
      "password": "root",
      "database": "hackinghealth_test",
      "host": "172.17.0.2",
      "dialect": "postgres"
    },
    "production": {
      "username": "postgres",
      "password": "root",
      "database": "hackinghealth_production",
      "host": "172.17.0.2",
      "dialect": "postgres"
    }
}
