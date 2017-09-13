export default timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
