export default (param) => {
  let params = window.location.search.substr(1)
    .split("&")
    .map((pair) => {
      return pair.split("=")
    }).reduce((memo, item) => {
      memo[item[0]] = item[1]
      return memo
    }, {})

  return param ? params[param] : params
}
