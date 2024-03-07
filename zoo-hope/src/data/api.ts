// Should be used with try catch
const apiGetAllPets = async () => {
  const res = await fetch(`http://localhost:5000/get-all-pets`)
  const json = await res.json()
  return (json)
}

export { apiGetAllPets }