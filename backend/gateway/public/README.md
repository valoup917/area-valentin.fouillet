# Example protos

## Contents

- [microservice_api.proto]
  - The simple example used in the overview.
- [route_guide.proto]
  - An example service described in detail in the tutorial.

## Command:
    python3 -m grpc_tools.protoc -I./ --python_out=. --grpc_python_out=. microservice_api.proto
    python3 microservice_server.py
    python3 microservice_client.py
