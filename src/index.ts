import 'reflect-metadata';
import * as express from "express";
import { AppDataSource } from "./data-source";
import routes from './routes';
import * as cors from 'cors';
import helmet from 'helmet';

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
        app.use('/', routes);

        app.get('/:id', (req, res) => {
            res.send({ 'status': 'Okey ' + req.params.id })
        });

        // start express server
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        });
        console.log('Express server has started on port ' + PORT +
            '. Open http://localhost:' + PORT + '/ to see results');

    })
    .catch(error => console.log(error));