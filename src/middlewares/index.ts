import errorMiddleware from "./error";
import Validation from "./validations";
const validationMiddlewares = new Validation();

export { errorMiddleware, validationMiddlewares };