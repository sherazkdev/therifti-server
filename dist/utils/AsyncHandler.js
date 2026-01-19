const AsyncHandler = (fc) => {
    return async (req, res, next) => {
        try {
            return await fc(req, res, next);
        }
        catch (e) {
            next(e);
        }
    };
};
export default AsyncHandler;
//# sourceMappingURL=AsyncHandler.js.map