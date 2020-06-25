export const getDate = datetime => {
  const dateArray = new Date(datetime).toString().split(" ")
  return dateArray
    .slice(0, 4)
    .toString()
    .replace(/,/g, " ")
}

export const getTime = datetime => {
  const dateArray = new Date(datetime).toString().split(" ")
  return dateArray.slice(4, 5).toString().split(":").slice(0,2).join(":")
}
