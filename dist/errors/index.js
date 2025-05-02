export class ApplicationError extends Error {
    constructor(message) {
        super(message);
        this.baseName = "ApplicationError";
        this.code = 500;
        this.getResponseMessage = () => {
            return {
                message: this.message,
            };
        };
        this.name = "ApplicationError";
    }
}
ApplicationError.isApplicationError = (error) => {
    return (error instanceof ApplicationError || error.baseName === "ApplicationError");
};
