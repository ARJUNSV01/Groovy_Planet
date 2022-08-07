 export default {
    asyncHandler(fn) {
      return async (req, res, next) => {
        try {
          await fn(req, res, next);
        } catch (error) {
          next(error); // Passing to the next middleware
        }
      };
    },
  };