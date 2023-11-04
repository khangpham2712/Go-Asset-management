package Account

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

func create() CreateAccountResponse {
	
}
