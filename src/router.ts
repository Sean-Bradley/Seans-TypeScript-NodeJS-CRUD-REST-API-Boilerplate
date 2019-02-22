import * as express from 'express'
import Cat from './models/Cat'
import { v4 as uuid } from 'uuid';
import * as bodyParser from 'body-parser'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        const cats = new Map<string, Cat>();
        cats[uuid()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() }
        cats[uuid()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() }

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: 'Nothing to see here, goto \'/cats\' instead'
            })
        })

        //get all cats
        router.get('/cats', (req: express.Request, res: express.Response) => {
            res.json({
                cats
            })
        })

        //create new cat
        router.post('/cats', (req: express.Request, res: express.Response) => {
            try {
                let cat: Cat = {} as Cat;
                Object.assign(cat, req.body)
                const newUUID = uuid();
                cats[newUUID] = cat;
                res.json({
                    uuid: newUUID
                })
            } catch (e) {
                res.json({
                    error: "problem with post"
                })
            }
        })

        //get cat by id
        router.get('/cats/:id', (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id]
                })
            } else {
                res.json({
                    error: "no such cat"
                })
            }
        })

        //update cat
        router.put('/cats/:id', (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                let cat: Cat = {} as Cat;
                Object.assign(cat, req.body)
                cats[req.params.id] = cat;
                res.json({
                    cat: cats[req.params.id]
                })
            } else {
                res.json({
                    error: "no such cat"
                })
            }
        })

        //delete cat
        router.delete('/cats/:id', (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id]
                res.json({
                    uuid: req.params.id
                })
            } else {
                res.json({
                    error: "no such cat"
                })
            }
        });

        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());
        server.use('/', router)
    }
}

export default Router;