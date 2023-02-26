const crypto = require('crypto');
const http = require('http');
// var key = 'wrdvpnisthebest!';
// var iv = 'wrdvpnisthebest!';
var key = 'jluvpnisthegood!';
var iv = 'jluvpnisthegood!';

function main_page() {
    return `
    <html>
    <head>
    <meta charset="utf-8">
    <title>JLU VPN 任意门</title>
    </head>
    <body>
    <h1>JLU VPN 任意门</h1>
    <p>JLU VPN 任意门是一个可以使用JLU Web VPN带你跳转到任意目标页面的工具。</p>
    <input type="text" id="url" placeholder="URL" >
    <button onclick="jump()">Jump</button>
    <p>常用站点:
    <ul>
    <li><a href="https://vpn.jlu.edu.cn/https/6a6c7576706e6973746865676f6f642146ab1ccaa88ac2a733d52e8cff/">百度</a></li>
    <li><a href="https://vpn.jlu.edu.cn/https/6a6c7576706e6973746865676f6f642152b24586a385cced259420/">必应</a></li>
    </ul>
    </p>
    </body>
    <script>
    function jump() {
        var url = document.getElementById("url").value;
        window.location.href = window.location.href + url;
    }
    </script>
    </html>
    `;
}


function encrypt_url(base_url) {
    const fullurl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const partialurl = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    console.log(base_url);
    if (base_url.match(fullurl)) {
        base_url = new URL(base_url);
    } else if (base_url.match(partialurl)) {
        base_url = new URL('http://' + base_url);
    } else {
        return "about:blank";
    }
    var cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
    var protocol = base_url.protocol.split(':')[0];
    var host = base_url.host;
    var path = base_url.pathname + base_url.search;
    var encrypted_host = cipher.update(host, 'utf8', 'hex');
    var url = "https://vpn.jlu.edu.cn/" + protocol + "/6a6c7576706e6973746865676f6f6421" + encrypted_host + path;
    console.log(url);
    return url;
}

var handler = function(request, response) {
    var url = request.url.substr(1);
    if (url == "") {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(main_page());
        return;
    }
    var encrypted_url = encrypt_url(url);
    response.writeHead(302, {
        'Location': encrypted_url
    });
    response.end();
}
var server = http.createServer(handler);

server.listen(process.env.PORT || 8080);
console.log("Server started at http://localhost:8080/");