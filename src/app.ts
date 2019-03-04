import express from 'express'
import Router from './router'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import * as bodyParser from 'body-parser'

class App {
  private httpServer: any

  constructor() {
    this.httpServer = express()

    this.httpServer.use(bodyParser.urlencoded({ extended: true }));
    this.httpServer.use(bodyParser.json());
    
    new Router(this.httpServer);

    this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));     
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
