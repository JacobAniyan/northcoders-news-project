function handleInvalidRoute(req, res) {
  res.status(404).send({ msg: "Path Not Found" });
}

function handleBadRequest(err, req, res, next) {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
}

function handleCustomError(err, req, res, next) {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
}

function handleServerError(err, req, res, next) {
  res.status(500).send({ msg: "Internal Server Error" });
}

module.exports = {
  handleInvalidRoute,
  handleBadRequest,
  handleCustomError,
  handleServerError,
};
