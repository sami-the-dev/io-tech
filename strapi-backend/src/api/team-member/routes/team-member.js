module.exports = {
  routes: [
    {
      method: "GET",
      path: "/team-members",
      handler: "team-member.find",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/team-members/:id",
      handler: "team-member.findOne",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
