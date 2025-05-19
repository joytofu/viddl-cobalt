import * as _env from "$env/static/public";

const getEnv = (_key: string) => {
    const env = _env as Record<string, string | undefined>;
    const key = `WEB_${_key}`;

    if (key in env) {
        return env[key];
    }
}

const variables = {
    HOST: getEnv('HOST'),
    PLAUSIBLE_HOST: getEnv('PLAUSIBLE_HOST'),
    PLAUSIBLE_ENABLED: getEnv('HOST') && getEnv('PLAUSIBLE_HOST'),
    DEFAULT_API: getEnv('DEFAULT_API'),
}

const contacts = {
    discord: "https://discord.gg/pQPt8HBUPu",
    twitter: "https://x.com/justusecobalt",
    github: "https://github.com/imputnet/cobalt",
    bluesky: "https://bsky.app/profile/cobalt.tools",
    telegram_ru: "https://t.me/justusecobalt_ru",
}

const partners = {
    royalehosting: "https://royalehosting.net/?partner=cobalt",
}

const donate = {
    stripe: "https://donate.stripe.com/8wM2b1b1feIE7ZKeUU",
    liberapay: "https://liberapay.com/BrainTitan/donate",
    crypto: {
        Ethereum: "0x7eab4ea12d3a57ae2811be24c94c024c7f0e6846",
        Monero: "86jQ38U4oyvhaAx2jvE77rN7TDjH2SRJJgcwgTGxYfBAJrJ77BR2QZt8L3AtGMjDBE2ktLguBrNZB1z5ev5ykT589EYoQJb",
        Solana: "7pCsFX37sYKZihuH4NqXH5smiG6JqAG5z3YFuxkHRC4A",
        Litecoin: "LaupaJ7DjXuTXwV1nzeu9jJ9yHk7tEZZtp",
        Bitcoin: "34AnHVvUPibT8mVHaFx48wd3XLg5zwwEN3",
        Toncoin: "UQAqpRHMygiiB4M2wC_3V_bjT5Mv2tbTJrJHFOzpGn_Vnh0M",
        Dogecoin: "DR4BXkNX4vQLt47kad4KjBYKhrbyhujFHR",
        TRON: "TWNcJRxoEqBDdzn1UFDCdB2rgWuDwHdgjH",
        Uniswap: "0x7eab4ea12d3a57ae2811be24c94c024c7f0e6846",
    },
    other: {
        
    }
};

const siriShortcuts = {
    photos: "https://www.icloud.com/shortcuts/14e9aebf04b24156acc34ceccf7e6fcd",
    files: "https://www.icloud.com/shortcuts/2134cd9d4d6b41448b2201f933542b2e",
};

const docs = {
    instanceHosting: "https://github.com/imputnet/cobalt/blob/main/docs/run-an-instance.md",
    webLicense: "https://github.com/imputnet/cobalt/blob/main/web/LICENSE",
    apiLicense: "https://github.com/imputnet/cobalt/blob/main/api/LICENSE",
};

const defaultApiURL = "https://api.vetra.top";

export { donate, defaultApiURL, contacts, partners, siriShortcuts, docs };
export default variables;
