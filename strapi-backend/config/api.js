module.exports = ({ env }) => ({
  apiPath: "/api",
  autoReload: {
    enabled: env.bool("STRAPI_AUTO_RELOAD", true),
  },
});
