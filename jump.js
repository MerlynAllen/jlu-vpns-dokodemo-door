const crypto = require('crypto');
const http = require('http');
// var key = 'wrdvpnisthebest!';
// var iv = 'wrdvpnisthebest!';
var key = 'jluvpnisthegood!';
var iv = 'jluvpnisthegood!';


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
    var enctypted_host = cipher.update(host, 'utf8', 'hex');
    var url = "https://vpn.jlu.edu.cn/" + protocol + "/6a6c7576706e6973746865676f6f6421" + enctypted_host + path;
    console.log(url);
    return url;
}

var handler = function(request, response) {
    var url = request.url.substr(1);
    var encrypted_url = encrypt_url(url);
    response.writeHead(302, {
        'Location': encrypted_url
    });
    response.end();
}
var server = http.createServer(handler);

server.listen(process.env.PORT || 8080);