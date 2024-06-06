import * as express from "express"
//import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import * as cors from 'cors';
import * as helmet from 'helmet';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());

    app.use(express.json());
    //app.use('/', routes);

    // setapp.use(bodyParser.json())

    // register express routes from defined application routes
    // Se elimina por no  uso.

    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(PORT, () => console.log('Server running on port: ' + PORT))

    // insert new users for test
    /*
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Timber",
            lastName: "Saw",
            age: 27
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            age: 24
        })
    )
*/

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error))
