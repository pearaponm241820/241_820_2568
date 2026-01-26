// ทำการ import http module เพื่อสร้าง server
const http = require('http');
const hostname = 'localhost';
const port = 8000;

// กำหนดค่าเริ่มต้นของ server เมื่อเปิดใช้งาน เว็ปผ่านบราวเซอร์ ที่ localhost:8000

const requestListener = function(req, res) {
    res.writeHead(200);
    res.end('My First Server!');
}

//run server
const server = http.createServer(requestListener);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});