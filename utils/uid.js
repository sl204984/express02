function createId(len) {
  const id = (~~((1 + Math.random()) * (16 ** len))).toString(16);
  return id.substring(1, id.length);
}

module.exports = createId;