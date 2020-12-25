
export const checkMobile = (mobile) => {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/
  return reg.test(mobile)
}
