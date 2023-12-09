package Account

import (
	db "backend/DBConnection"
)

type User struct {
	ID       int
	Name     string
	Password string
	Role     string
}

type CreateAccountRequest struct {
	Name     string
	Password string
	Role     string
}

type CreateAccountResponse struct {
	Code    int
	Message string
}

func Create() CreateAccountResponse {
	db, err := db.GetDatabaseConnection()
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	return CreateAccountResponse{}
}
