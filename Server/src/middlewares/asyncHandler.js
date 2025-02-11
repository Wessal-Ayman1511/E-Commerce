// const asyncHandler = (fn) => (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//         res.status(500).json({ message: error.message });
//     });
// };
// export default asyncHandler;
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error); // Pass the error to the error-handling middleware
    });
};

export default asyncHandler;
