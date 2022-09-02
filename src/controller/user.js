module.exports = {
  test: async (req, res) => {
    res.send(
      `<a href="auth/google">LOGIN PAKE GOOGLE</a>` +
        `<a href="auth/facebook">Pake FB</a>`
    );
  },
  loginGoogle: async (req, res) => {
    res.send("hallo");
  },
};
