var http = require("http");
var qs = require("querystring");
var applicationResouces = require("./applicationResouces");
//var settings = require("./settings");



function getHome(req, resp) {
   
        resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ name: "", firstNo: "", secondNo: "" }));
    

    resp.end();
}

function get404(req, resp) {
    resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
    resp.write("<html><html><head><title>404</title></head><body>404: Resource not found. Go to <a href='/'>Home</a></body></html>");
    resp.end();
}

function get405(req, resp) {
    resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
    resp.write("<html><html><head><title>405</title></head><body>405: Method not supported</body></html>");
    resp.end();
}

function get413(req, resp) {
    resp.writeHead(405, "Data exceed the limit", { "Content-Type": "text/html" });
    resp.write("<html><head><title>413</title></head><body>413: Data exceed the limit</body></html>");
    resp.end();
}

function getData(req, resp,data1) {

    if (!data1) throw new Error("Input not valid");
    var data = JSON.parse(data1);
    var total = '';
    console.log('data-------' + data);
    if (data) {

         total = parseInt(data.firstNo) + parseInt(data.secondNo);
    }

    resp.writeHead(200, "operation  successfull", { "Content-Type": "application/json" });
    resp.write(JSON.stringify([{ name: data.name, firstNo: data.firstNo, secondNo: data.secondNo, sum: total }]));
    resp.end();
}


http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            getHome(req,resp);
            break;
        case "POST":
		var body="";
		       req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
        });
             resp.writeHead(200, "operation  successfull", { "Content-Type": "application/json" });
             resp.write(JSON.stringify({ "fulfillmentText" : "hello world"}));
			 console.log('data-------' + body);
             resp.end();
           
            break;
        default:
            get405(req, resp);
            break;
    }
}).listen( applicationResouces.port);