function createId(len) {
  if (len > 5) {
    let id = '';
    const times = ~~(len / 5) + 1;
    for (let i = 0; i < times; i++) {
      let tempid = (~~((1 + Math.random()) * (36 ** 5))).toString(36);
      id += tempid.substring(1, tempid.length);
    }
    return id.substring(0, len);
  } else {
    const id = (~~((1 + Math.random()) * (36 ** len))).toString(36);
    return id.substring(1, id.length);
  }
}

module.exports = createId;