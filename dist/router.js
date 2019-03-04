"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
class Router {
    constructor(server) {
        const router = express.Router();
        const cats = new Map();
        cats[uuid_1.v4()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() };
        cats[uuid_1.v4()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() };
        router.get('/', (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/cats instead.`
            });
        });
        //get all cats
        router.get('/cats', cors_1.default(), (req, res) => {
            res.json({
                cats
            });
        });
        //create new cat
        router.post('/cats', cors_1.default(), (req, res) => {
            try {
                let cat = {};
                Object.assign(cat, req.body);
                const newUUID = uuid_1.v4();
                cats[newUUID] = cat;
                res.json({
                    uuid: newUUID
                });
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //get cat by id
        router.get('/cats/:id', cors_1.default(), (req, res) => {
            if (!!cats[req.params.id]) {
                res.json({
                    cat: cats[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });
        //update cat
        router.put('/cats/:id', cors_1.default(), (req, res) => {
            try {
                if (!!cats[req.params.id]) {
                    let cat = {};
                    Object.assign(cat, req.body);
                    cats[req.params.id] = cat;
                    res.json({
                        cat: cats[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ "error": "no such cat" }));
                }
            }
            catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        });
        //delete cat
        router.delete('/cats/:id', cors_1.default(), (req, res) => {
            if (!!cats[req.params.id]) {
                delete cats[req.params.id];
                res.json({
                    uuid: req.params.id
                });
            }
            else {
                res.status(404).send(JSON.stringify({ "error": "no such cat" }));
            }
        });
        router.options('*', cors_1.default());
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map