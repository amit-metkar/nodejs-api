const { getElapsedTimeInMs } = require(".");

module.exports = (req, res, next) => {
  const startHrTime = process.hrtime();
  req.startHrTime = startHrTime;

  res.on("finish", () => {
    const elapsedTimeInMs = getElapsedTimeInMs(startHrTime);
    console.log(
      `${req.method} ${req.originalUrl} [FINISH] ${elapsedTimeInMs}ms`
    );
  });

  res.on("close", () => {
    const elapsedTimeInMs = getElapsedTimeInMs(startHrTime);
    console.log(
      `${req.method} ${req.originalUrl} [CLOSE] ${elapsedTimeInMs}ms`
    );
  });

  next();
};
