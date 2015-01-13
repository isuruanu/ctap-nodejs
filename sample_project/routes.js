var hello = function (req, res) {
    res.send('Hello world !!! \n')
}

var ussd = function (req, res) {
    res.send(req.body);
}

module.exports = {
  ussd: ussd,
  hello: hello
};

var zemba = function () {
}