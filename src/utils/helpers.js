import moment from 'moment'

export const getDate = datetime => {
  return moment(datetime).format('LLLL')
}

export const getTime = datetime => {
  const dateArray = new Date(datetime).toString().split(" ")
  return dateArray.slice(4, 5).toString().split(":").slice(0,2).join(":")
}


export const sortIntoWeek = (entries) => {
  

}
