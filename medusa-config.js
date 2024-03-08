const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Google Auth
const GoogleClientId = process.env.GOOGLE_CLIENT_ID || "";
const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";

const DATABASE_URL = process.env.DATABASE_URL;

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  // Fullfillment
  `medusa-fulfillment-manual`,
  // Payment
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  // Admin Dashboard & Functionality
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
  // Storing products images in supabase storage
  {
    resolve: `medusa-storage-supabase`,
    options: {
      referenceID: process.env.STORAGE_BUCKET_REF,
      serviceKey: process.env.STORAGE_SERVICE_KEY,
      bucketName: process.env.BUCKET_NAME,
    },
  },
  // Handle product variant images
  {
    resolve: "medusa-plugin-variant-images",
    options: {
      enableUI: true,
    },
  },
  // Auth Plugin (Social Account)
  {
    resolve: "medusa-plugin-auth",
    /** @type {import('medusa-plugin-auth').AuthOptions} */
    options: [
      {
        type: "google",
        // strict: "all", // or "none" or "store" or "admin"
        strict: "none",
        identifier: "google",
        clientID: GoogleClientId,
        clientSecret: GoogleClientSecret,
        store: {
          // callbackUrl: `${BACKEND_URL}/store/auth/google/cb`,
          callbackUrl: `$http://localhost:9000/store/auth/google/cb`,
          // failureRedirect: `${STORE_CORS}/login`,
          failureRedirect: `http://localhost:8000/account/login`,
          // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
          // This query param will have the priority over this configuration
          // successRedirect: `${STORE_CORS}/`,
          successRedirect: "http://localhost:8000/",
          authPath: "/store/auth/google",
          authCallbackPath: "/store/auth/google/cb",
          // expiresIn: 24 * 60 * 60 * 1000,
          // verifyCallback: (container, req, accessToken, refreshToken, profile, strict) => {
          //    // implement your custom verify callback here if you need it
          // },
        },
      },
    ],
  },
  // Algolia search
  {
    resolve: `medusa-plugin-algolia`,
    options: {
      applicationId: process.env.ALGOLIA_APP_ID,
      adminApiKey: process.env.ALGOLIA_ADMIN_API_KEY,
      settings: {
        settings: {
          products: {
            indexSettings: {
              searchableAttributes: ["title", "description"],
              attributesToRetrieve: [
                "id",
                "title",
                "description",
                "handle",
                "thumbnail",
                "variants",
                "variant_sku",
                "options",
                "collection_title",
                "collection_handle",
                "images",
              ],
            },
            transformer: (product) => ({
              id: product.id,
              // other attributes...
            }),
          },
        },
      },
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL,
    },
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
