const crypto = require('crypto');
const http = require('http');
var key = 'wrdvpnisthebest!';
var iv = 'wrdvpnisthebest!';

function encrypt_url(base_url) {
    console.log(base_url);
    var cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
    const fullurl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    const partialurl = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if (base_url.match(fullurl)) { // if url contains protocol
        var protocol = base_url.split('://')[0];
        var host = base_url.split('://')[1].split('/')[0];
        var path = base_url.split('://')[1].split('/')[1];
    } else if (base_url.match(partialurl)) {
        var protocol = "http" // default protocol
        var host = base_url.split('://')[1].split('/')[0];
        var path = base_url.split('://')[1].split('/')[1];
    } else {
        return "about:blank";
    }
    var enctypted_host = cipher.update(host, 'utf8', 'hex');
    var url = "https://webvpn.jlu.edu.cn/" + protocol + "/77726476706e69737468656265737421" + enctypted_host + "/" + path;
    console.log(url);
    return url;
}

var app = function(request, response) {
    var url = request.url.substr(1);
    var encrypted_url = encrypt_url(url);
    response.writeHead(302, {
        'Location': encrypted_url
    });
    response.end();
}

var server = http.createServer(app);

server.listen(80);