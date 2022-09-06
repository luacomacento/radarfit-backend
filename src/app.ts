import express from 'express';
import cors from 'cors';
import Produto from './database/models/Produto';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
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