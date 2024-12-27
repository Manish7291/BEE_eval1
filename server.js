const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === "GET") {
        if (url === "/") {
            fs.readFile("User.json", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(data);
                }
            });
        } else if (url === "/allstudent") {
            fs.readFile("allstudent.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else if (url === "/register") {
            fs.readFile("register.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        }else if (url === "/home") {
            fs.readFile("home4.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        }
         else {
            res.writeHead(404);
            res.end("Not Found");
        }
    } else if (method === "POST" && url === "/register") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const userData = qs.parse(body);

            // Read existing data
            let fileData = fs.readFileSync("User.json", "utf-8");
            let users = fileData ? JSON.parse(fileData) : [];

            // Add new user
            users.push({
                name: userData.name,
                email: userData.email,
                address: userData.address,
                password: userData.password,
            });

            // Save updated data
            fs.writeFile("User.json", JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end("Failed to save user data");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end("Registration successful!");
                }
            });
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
