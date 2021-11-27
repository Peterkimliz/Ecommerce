const http=require("http");
const app=require("./app");
const port=process.env.PORT||9000;

const server=http.createServer(app);

server.listen(port,()=>{
     console.log(`server runing on port:http://127.0.0.1:${port}`);
});