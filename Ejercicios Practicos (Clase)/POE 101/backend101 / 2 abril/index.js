const http = require('http');   
const server = http.createServer( (request, response) => {    
     console.log(request.url);
     response.setHeader('Content-Type', 'text/html');

     if(request.url == "/"){
        response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>HTML</title>
            </head>
            <body>
               <h1>hola mundo desde node</h1>
            </body>
    
            <script>
                console.log("Hola aquí estoy");
                for(let i = 0; i < 1000; i++){
                    console.log(i);
                }
            </script>
            </html>
        `);
     }else if(request.url == "/unicorn"){
        response.write("Soy un unicornio");
     }else{
        response.write("Es un error");
     }
     
     response.end();
});
server.listen(3000);