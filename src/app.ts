import express from 'express';
import cors from 'cors';
import { productsRouter } from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();

    this.app.use('/produtos', productsRouter);
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