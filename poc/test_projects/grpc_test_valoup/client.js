const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const text = process.argv[2];
const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure());

client.createTodo({
    "id": -1,
    "text": text
}, (err, response) => {
    if (!err)
        console.log("Confirmation de création: " + JSON.stringify(response));
    else
        console.log("erreur: " + err.message);
})

/*
client.readTodos({}, (err, response) => {
    console.log("Recu du serveur " + JSON.stringify(response));
    if (response.items) {
        response.items.forEach(i => {
            console.log(i.text);
        });
    }
})
*/

const call = client.readTodosStream();

call.on("data", item => {
    console.log("le serveur envoi en stream: " + JSON.stringify(item))
})

call.on("end", e => console.log("fin du stream !"))
