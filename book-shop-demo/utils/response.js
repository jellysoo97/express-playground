const { camelcase } = require("camelcase-input");

const responseConverter = (req, res, next) => {
  const send = res.send;

  res.send = function (body) {
    if (body !== null) {
      // handle if body is not JSON
      // parse body as JSON
      body = camelcase(JSON.parse(body), { deep: true });
      // stringify body
      body = JSON.stringify(body);
    }

    send.call(this, Buffer.from(body));
    return res;
  };

  next();
};

module.exports = { responseConverter };
