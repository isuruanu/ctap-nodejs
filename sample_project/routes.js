module.exports = {
  ussd: function (req, res) {
     res.send(req.body);
  },
  hello: function (req, res) {
    res.send('Hello world \n')
  }
};

var zemba = function () {
}