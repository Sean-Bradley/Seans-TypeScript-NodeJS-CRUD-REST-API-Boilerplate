import * as express from 'express'
import Router from './router'

class App {
  private httpServer: any

  constructor() {
    this.httpServer = express()
    new Router(this.httpServer);
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }
}

export default App;
