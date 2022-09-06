import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { productsRouter } from './routers';
import { errorMiddleware } from './middlewares';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    this.app.use('/produtos', productsRouter);
    this.app.use(errorMiddleware);
  }

  private config():void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Running on port ${PORT}...`)
    })
  }
}

export default App;