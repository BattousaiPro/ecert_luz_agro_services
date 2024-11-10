import 'reflect-metadata';
import * as express from "express";

const PORT = process.env.PORT || 3000;

// create express app
const app = express();
// Middlewares
/*app.use(cors());
app.use(helmet());

app.use(express.json());
*/

app.get('/', (req, res) => {
    res.send({ 'status': 'Okey 1' })
});

// start express server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});
console.log('Express server has started on port ' + PORT +
    '. Open http://localhost:' + PORT + '/ to see results');

