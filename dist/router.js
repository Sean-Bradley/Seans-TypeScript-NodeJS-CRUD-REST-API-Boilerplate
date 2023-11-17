"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
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
        cats[(0, uuid_1.v4)()] = { genus: "feline", name: "Cosmo", isHungry: true, lastFedDate: new Date() };
        cats[(0, uuid_1.v4)()] = { genus: "feline", name: "Emmy", isHungry: true, lastFedDate: new Date() };
        router.get('/', (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/cats instead.`
            });
        });
        //get all cats
        router.get('/cats', (0, cors_1.default)(), (req, res) => {
            res.json({
                cats
            });
        });
        //create new cat
        router.post('/cats', (0, cors_1.default)(), (req, res) => {
            try {
                let cat = {};
                Object.assign(cat, req.body);
                const newUUID = (0, uuid_1.v4)();
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
        router.get('/cats/:id', (0, cors_1.default)(), (req, res) => {
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
        router.put('/cats/:id', (0, cors_1.default)(), (req, res) => {
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
        router.delete('/cats/:id', (0, cors_1.default)(), (req, res) => {
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
        router.options('*', (0, cors_1.default)());
        server.use('/', router);
    }
}
exports.default = Router;
