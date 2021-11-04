const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const authConfig = require("./src/auth_config.json")
const jwtAuthz = require("express-jwt-authz")
const app = express()

const port = process.env.API_PORT || 3001
const appPort = process.env.SERVER_PORT || 3000
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`

const checkScopes = jwtAuthz(["read:messages", "read:users", "write:users"])

app.use(morgan("dev"))
app.use(helmet())
app.use(cors({ origin: appOrigin }))

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://dev-9z9cjf70.auth0.com/.well-known/jwks.json",
    }),

    audience: "https://example-api",
    issuer: "https://dev-9z9cjf70.auth0.com/",
    algorithms: ["RS256"],
})

app.use(checkJwt)

app.get("/api/external", checkScopes, (req, res) => {
    // console.log("req.headers.authorization", req.headers.authorization)

    // console.log("res.json()", res.json())
    // console.log("res.body()", req.body)
    // console.log("res.headers", req.headers)

    res.send({
        msg: `Your Pizza Ordered was successfully placed! ${JSON.stringify(req.user, null, 2)}`,
    })
})

app.listen(port, () => console.log(`API Server listening on port ${port}`))
