FROM golang:1.21
WORKDIR /app
COPY go.mod .
#COPY go.sum .
RUN go mod download
RUN go mod tidy
# COPY *.go .
COPY . .
EXPOSE 8080
ENTRYPOINT [ "go", "run", "cmd/main.go" ]