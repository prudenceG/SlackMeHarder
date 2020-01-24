const onlySpacesForbidden = value => {
  const nonWithespace = /\S+/
  if (!nonWithespace.test(value))
    return Promise.reject()

  return Promise.resolve()
}
module.exports = { onlySpacesForbidden }