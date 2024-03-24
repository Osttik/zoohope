let pageSize = 12;

//Options for selects in filter dropdown
  const type = [
    {label: "Тип", value: ""},
    {label: "Кіт", value: "cat"},
    {label: "Пес", value: "dog"},
  ]
  const sex = [
    {label: "Стать", value: ""},
    {label: "Жіноча", value: "female"},
    {label: "Чоловіча", value: "male"},
  ]
  const minAge = [
    {label: "0", value: ""},
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"},
    {label: "5", value: "5"},
    {label: "6", value: "6"},
    {label: "7", value: "7"},
    {label: "8", value: "8"},
    {label: "9", value: "9"},
    {label: "10", value: "10"},
  ]
  // Max age options are calulated in "../components/petList/petList.tsx" using current min age options value.

const options = {type, sex, minAge}
// ---

export { pageSize, options }