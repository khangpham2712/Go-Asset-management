package DBConnection

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func getDatabaseConnection() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:sugoi@tcp(db:3306)/sw")
	return db, err
}
