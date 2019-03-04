import * as express from 'express'
import Cat from './models/Cat'
import { v4 as uuid } from 'uuid';
import cors from 'cors'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        const cats = new Map<string, Cat>();
        cats[uuid()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() }
        cats[uuid()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() }

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `Nothing to see here, [url]/cats instead.`
            })
        })

        //get all cats
        router.get('/cats', cors(), (req: express.Request, res: express.Response) => {
            res.json({
                cats
            })
        })

        //create new cat
        router.post('/cats', cors(), (req: express.Request, res: express.Response) => {
            try {
                let cat: Cat = {} as Cat;
                Object.assign(cat, req.body)
                const newUUID = uuid();
                cats[newUUID] = cat;
                res.json({
                    uuid: newUUID
                })
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })

        //get cat by id
        router.get('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id]
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        })

        //update cat
        router.put('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                if (!!cats[req.params.id]) {
                    let cat: Cat = {} as Cat;
                    Object.assign(cat, req.body)
                    cats[req.params.id] = cat;
                    res.json({
                        cat: cats[req.params.id]
                    })
                } else {
                    res.status(404).send(JSON.stringify({ "error": "no such cat" }));
                }
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })

        //delete cat
        router.delete('/cats/:id', cors(), (req: express.Request, res: express.Response) => {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id]
                res.json({
                    uuid: req.params.id
                })
            } else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;