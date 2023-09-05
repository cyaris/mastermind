module.exports = (opts = { class: "mastermind" }) => {
  return {
    postcssPlugin: "add-scoped-class",
    Rule(rule) {
      rule.selectors = rule.selectors.map(selector => `.${opts.class} ${selector}`)
    },
  }
}

module.exports.postcss = true
