// import configJson from "./auth_config.json";

export function getConfig() {
    // Configure the audience here. By default, it will take whatever is in the config
    // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
    // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
    // don't have an API).
    // If this resolves to `null`, the API page changes to show some helpful info about what to do
    // with the audience."dev-9z9cjf70.auth0.com"
    const audience = null
    // configJson.audience && configJson.audience !== "YOUR_API_IDENTIFIER"
    //   ? configJson.audience
    //   : null;

    return {
        domain: "dev-9z9cjf70.auth0.com",
        clientId: "qhnh4DwRFSBkGT3ng4heCstEFRIP2vXh",
        ...(audience ? { audience } : null),
    }
}
