const generalResponse = (res, statusCode = 200, body = {}) => {
  res.status(statusCode);
  return res.json(body);
};

const created = res => generalResponse(res, 201);

exports.created = created;
