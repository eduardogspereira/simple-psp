const generalResponse = (res, statusCode = 200, body = {}) => {
  res.status(statusCode);
  return res.json(body);
};

const created = res => generalResponse(res, 201);
const success = (res, body) => generalResponse(res, 200, body);

exports.created = created;
exports.success = success;
