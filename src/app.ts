import express from 'express'
import Router from './router'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

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
          this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }
}

export default App;
