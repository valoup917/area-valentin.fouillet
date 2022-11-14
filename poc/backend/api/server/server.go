package main

import (
	pb "api/gen/proto"
	"context"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	//"google.golang.org/grpc/credentials/insecure"
	"net/http"
	"google.golang.org/grpc"
	"log"
	"net"
)

type helloServer struct {
	pb.UnimplementedHelloServer
}

func (c *helloServer) Echo(ctx context.Context, req *pb.RequestEcho) (*pb.ResponseRequest, error) {
	return &pb.ResponseRequest{Msg: "caca"}, nil
}

func main() {

	go func() {
		mux := runtime.NewServeMux()
		pb.RegisterHelloHandlerServer(context.Background(), mux, &helloServer{})
		log.Fatalln(http.ListenAndServe("localhost:8081", mux))
	}()
	listen, err := net.Listen("tcp", "localhost:8080")
	if err != nil {
		log.Fatalln(err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterHelloServer(grpcServer, &helloServer{})
	err = grpcServer.Serve(listen)
	if err != nil {
		log.Println(err)
	}
}
