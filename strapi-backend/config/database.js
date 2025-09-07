const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite", // Use sqlite for Strapi v5
    connection: {
      filename: path.join(
        __dirname,
        "..",
        env("DATABASE_FILENAME", ".tmp/data.db")
      ),
    },
    useNullAsDefault: true,
  },
});
