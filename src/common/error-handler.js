
export default (err) => {
  if(typeof alert !== 'undefined') alert(err.stack || err)
}