const asyncHandler = (requesthandler) => {
    (req, res, next) => {
        Promise.resolve(requesthandler(req, res, next)).catch((error) => next(error))
    }
}


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