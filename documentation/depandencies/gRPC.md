# Installation of all dependecies to use gRPC

## Install go

Please go to the [Golang](https://go.dev/dl/) website to install the latest version of golang.

Take care of your $GOPATH and $GOROOT env variables.</br>
You need to set $GOPATH to the location where you install Golang.</br>
Use the command ```go env``` to see the env variables of go.


## Protocol Buffers Compilers

To deal with gRPC, we need to install Protocol [Buffers](https://github.com/protocolbuffers/protobuf#protocol-compiler-installation). Please see the installation guide.

1. Install the protocol compiler plugins for Go using the following commands:

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
```
2. Update your PATH so that the protoc compiler can find the plugins:

```
export PATH="$PATH:$(go env GOPATH)/bin"
export PATH=$PATH:/usr/local/go/bin
```

# gRPC Gateway

gRPC gateway is a plugins that translates RESTFUL API into gRPC.</br>
This is usefull because our client have to perform RESTful API calls.</br>

The offical documentation for gRPC Gateway is available [here](https://grpc-ecosystem.github.io/grpc-gateway/)</br>

Install this package:
```
go install \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway \
    github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2 \
    google.golang.org/protobuf/cmd/protoc-gen-go \
    google.golang.org/grpc/cmd/protoc-gen-go-grpc
```

This will place binaries in $GOBIN.</br>
