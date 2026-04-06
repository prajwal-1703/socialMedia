const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

export { asyncHandler }; 


// const asyncHandler = () => {}
// const asyncHandler = (fumnc) => () => {}
// const asyncHandler = (func) => async () => {}



    // Try catch block is used to catch any error that may occur in the async function and send a response with the error message and status code.


//     const asynchandler = (func) => async (req, res, next) => {

//     try {
//         await func(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error"
//         });
//     }

// }