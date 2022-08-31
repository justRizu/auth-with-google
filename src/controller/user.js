module.exports = {
  test: async (req, res) => {
    res.send(`<a href="auth/google">LOGIN PAKE GOOGLE</a>`);
  },
  loginGoogle: async (req, res) => {
    res.send("hallo");
  },
};
