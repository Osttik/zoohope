// Should be used with try catch
const getAllPets = async () => {
  const res = await fetch(`http://localhost:5000/getAllPets`)
  const json = await res.json()
  return(json)
}

export {getAllPets}