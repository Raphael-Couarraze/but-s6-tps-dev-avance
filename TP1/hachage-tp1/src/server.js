
import {createServer} from "node:http"
import {create, liste} from "./blockchain.js";
import {NotFoundError} from "./errors.js";

createServer(async (req, res) => {
        console.log("### Server start ###")
        res.setHeader('Content-Type', 'application/json')
        const url = new URL(req.url, `http://${req.headers.host}`)
        const endpoint = `${req.method}:${url.pathname}`

        let results
        console.log("- Begin the try")
        try {
            switch (endpoint) {
                case 'GET:/blockchain':
                    results = await liste(req, res, url);
                    console.log("- Ici GET fait");
                    break
                case 'POST:/blockchain':
                    results = await create(req, res);
                    console.log("- Ici POST fait");
                    break
                default :
                    console.log("default here");
                    res.writeHead(404);
            }
            if (results) {
                console.log("- Ici results writing");
                res.write(JSON.stringify(results));
            }
        } catch (erreur) {
            if (erreur instanceof NotFoundError) {
                res.writeHead(404)
            } else {
                throw erreur
            }
        }
        res.end()
    }
).listen(3000)



