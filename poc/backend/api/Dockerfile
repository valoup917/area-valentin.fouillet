# syntax=docker/dockerfile:1

FROM golang:1.19-alpine

WORKDIR /api

COPY . ./

RUN go get -u \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
    github.com/grpc-ecosystem/grpc-gateway/v2/runtime \
    github.com/grpc-ecosystem/grpc-gateway/v2/utilities \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
    google.golang.org/protobuf/cmd/protoc-gen-go \
    google.golang.org/grpc/cmd/protoc-gen-go-grpc

RUN go install \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
    google.golang.org/protobuf/cmd/protoc-gen-go \
    google.golang.org/grpc/cmd/protoc-gen-go-grpc \
    google.golang.org/grpc

RUN apk add protoc make curl

RUN go mod download

RUN export PATH="$PATH:$(go env GOPATH)/bin"

RUN  make

RUN export PATH="$PATH:$(go env GOPATH)/bin"

RUN go build -o api_gateway server/server.go

EXPOSE 8080

CMD ["./api_gateway"]