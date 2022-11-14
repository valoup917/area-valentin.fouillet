# syntax=docker/dockerfile:1

FROM golang:1.19-alpine

WORKDIR /weather

COPY . ./

RUN go mod tidy

RUN go mod download

RUN export PATH="$PATH:$(go env GOPATH)/bin"

RUN go build -o weather_service main.go

EXPOSE 8095

CMD [ "./weather_service" ]