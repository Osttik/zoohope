import { useEffect, useState } from "react"
import "../../styles/index.scss"
import { PetCard } from "./petCard/petCard"
import { FilterSelect } from "./filterSelect/filterSelect";
import { useSearchParams } from "react-router-dom";
import { PaginationNav } from "./paginationNav/paginatioNav";

interface IPets {
  image: string,
  name: string,
  age: string,
  sex: string
  type: string,
  _id: string,
}

interface Ifilters {
  type: string;
  sex: string;
  minAge: string;
  maxAge: string;
  page: string;
}

export const PetList = () => {
  const [totalLength, setTotalLength] = useState<number>()
  const [pageCount, setPageCount] = useState<number>()
  const [getPets, setPets] = useState<IPets[]>()
  const [areFiltersOpen, setFiltersStatus] = useState<boolean>(false)
  const [filterParams, setFilterParams] = useSearchParams()
  const [filters, setFilters] = useState<Ifilters>({
    type: "",
    sex: "",
    minAge: "",
    maxAge: "",
    page: ""
  })

  const heroImg = "https://placekitten.com/2500/1000" 

// Values for selects in filter
  const typeOptions = [
    {label: "Тип", value: ""},
    {label: "Кіт", value: "cat"},
    {label: "Пес", value: "dog"},
  ]
  const sexOptions = [
    {label: "Стать", value: ""},
    {label: "Жіноча", value: "female"},
    {label: "Чоловіча", value: "male"},
  ]
  const minAgeOptions = [
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
  const maxAgeOptions = () => {
    const maxAgeFiltered = minAgeOptions.filter(el => Number(el.value) >= Number(filters.minAge) && el.value !== "")
    maxAgeFiltered.unshift({label: "Неважливо", value: ""})
    return maxAgeFiltered
  }
//------------------------------------

// Base functions
  const getPetsFromDB = async () => {
    const res = await fetch(`http://localhost:5000/getFilteredPets?type=${filterParams.get("type") || ""}&sex=${filterParams.get("sex") || ""}&minAge=${filterParams.get("minAge") || ""}&maxAge=${filterParams.get("maxAge") || ""}&page=${filterParams.get("page") || "1"}`)
    const json = await res.json()
    setPets(json.array)
    setPageCount(json.pages)
    setTotalLength(json.length)
  }

  useEffect(() => {
    getPetsFromDB()

    if (filterParams.size) {
    let updatedFilters = filters
     Object.keys(filters).forEach(el => {
      if (filterParams.get(el)) {
        updatedFilters = {...updatedFilters, [el]: filterParams.get(el)}
      }
     });
     setFilters(updatedFilters)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Check for illegal page
    if (filterParams.get("page") && pageCount !== undefined) {
      if (Number(filterParams.get("page")) > (pageCount || 0)) {
        filterParams.set("page", pageCount + "" || "1")
        setFilterParams(filterParams)
       }
       if (Number(filterParams.get("page")) <= 0) {
        filterParams.set("page", "1")
        setFilterParams(filterParams)
       }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount])
//------------------------------------

  useEffect(() => {
    getPetsFromDB()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterParams])

  const toggleFilters = () => {
    setFiltersStatus(!areFiltersOpen)
  }

  const apply = () => {
    Object.entries(filters).forEach(el => {
      filterParams.set(el[0], el[1])
    });
    filterParams.set("page", "1")
    
    setFilterParams(filterParams)
  }

  const reset = () => {
    Object.keys(filters).forEach(el => {
      filterParams.delete(el)
      setFilterParams(filterParams)
    })

    
    filterParams.set("page", "1")
    setFilters({
      type: "",
      sex: "",
      minAge: "",
      maxAge: "",
      page: "",
    })
  }
//------------------------------------

  if (!getPets) {
    return <>Завантаження</>
  }

  return(
    <section className="petListSection">
      <div className="hero">
        <div className="text">
          <h1 className="title">Взяти Тварину</h1>
          <h2 className="subtitle">Тут ви знайдете чудових тваринок, які шукають новий дім. Оберіть свого майбутнього друга та подаруйте йому щасливе життя!</h2>
        </div>
        <img src={heroImg} alt="Hero Img" className="heroImg" />
      </div>

      <div>
        <div className="filters">
          <button onClick={() => {toggleFilters()}}>Сортувати</button>
          <div className={`filtersDropdown ${areFiltersOpen ? "open" : "closed"}`}>

            <div className="row">
              <span>Тип</span>
              <FilterSelect filter={{get: filters, set: setFilters, type: "type"}} options={typeOptions}/>
            </div>

            <div className="row">
              <span>Стать</span>
              <FilterSelect filter={{get: filters, set: setFilters, type: "sex"}} options={sexOptions}/>
            </div>

            <div className="row age">
              <span>Вік</span>
              <div>
                <span className="label">Від:</span>
                <FilterSelect filter={{get: filters, set: setFilters, type: "minAge"}} options={minAgeOptions}/>
              </div>

              <div>
                <span className="label">До:</span>
                <FilterSelect filter={{get: filters, set: setFilters, type: "maxAge"}} options={maxAgeOptions()}/>
              </div>
            </div>
            
            <div className="row buttons">
              <button className="apply" onClick={() => {apply()}}>Застосувати</button>
              <button className="reset" onClick={() => {reset()}}>Скинути</button>
            </div>

          </div>
        </div>

        <div className="petList">
          {getPets.length ?
            getPets.map(el => {
              console.log(el)
              return(
                <PetCard key={el._id} animalInfo={el}/>
              )
            }) :
            <div className="notFound">
              <p className="notFoundTitle">Нічого не знайдено</p>
              {totalLength ? <p className="notFoundDescription">Спробуйте змітини фільтри.</p> : <p className="notFoundDescription">Скоріш за все, зараз немає тварин.</p>}
            </div>
            
          }
        </div>
      </div>
      <div className="nav">

      <PaginationNav searchParam={filterParams} setSearchParams={setFilterParams} length={pageCount || 0} allPets={getPets}/>
        
      </div>
    </section>
  )
}