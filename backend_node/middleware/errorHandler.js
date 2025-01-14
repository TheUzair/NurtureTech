export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};
