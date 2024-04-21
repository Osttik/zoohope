let pageSize = 12;

//Options for selects in filter dropdown
  const type = [
    {label: "Тип",i18Key: "type", value: ""},
    {label: "Кіт",i18Key: "cat", value: "cat"},
    {label: "Пес",i18Key: "dog", value: "dog"},
  ]
  const sex = [
    {label: "Стать",i18Key: "sex", value: ""},
    {label: "Дівчинка",i18Key: "female", value: "female"},
    {label: "Хлопчик",i18Key: "male", value: "male"},
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
    {label: "11", value: "11"},
    {label: "12", value: "12"},
    {label: "13", value: "13"},
    {label: "14", value: "14"},
    {label: "15", value: "15"},
    {label: "16", value: "16"},
    {label: "17", value: "17"},
    {label: "18", value: "18"},
    {label: "19", value: "19"},
    {label: "20", value: "20"},
  ]
  // Max age options are calulated in "../components/petList/petList.tsx" using current min age options value.

const options = {type, sex, minAge}
// ---

export { pageSize, options }