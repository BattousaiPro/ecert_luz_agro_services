
import * as express from "express";
import { AppDataSource } from "./data-source";
import { routes } from "./routes";
import * as cors from 'cors';
import * as helmet from 'helmet';
import { Request, Response } from "express";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        // create express app
        const app = express();
        // Middlewares
        app.use(cors());
        app.use(helmet());

        app.use(express.json());
        // Routes
        //app.use('/', routes);

        // register express routes from defined application routes
        // Se elimina por no  uso.
        routes.forEach(route => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next)
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                } else if (result !== null && result !== undefined) {
                    res.json(result)
                }
            })
        });

        // start express server
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
        console.log('Express server has started on port ' + PORT + '. Open http://localhost:' + PORT + '/ to see results');
    })
    .catch(error => console.log(error));
