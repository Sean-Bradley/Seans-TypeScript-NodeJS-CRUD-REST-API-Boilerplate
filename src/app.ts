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

      var options = {
        docExpansion: "none",
        sorter: "alpha",
        jsonEditor: true,
        defaultModelRendering: 'schema',
        showRequestHeaders: true
      };

      this.httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

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
