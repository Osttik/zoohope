/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import "../../styles/index.scss"
import { PetCard } from "./petCard/petCard"
import { FilterSelect } from "./filterSelect/filterSelect";
import { useSearchParams } from "react-router-dom";
import { PaginationNav } from "./paginationNav/paginatioNav";
import { pageSize, options } from "../../data/petList";
import { apiGetAllPets } from '../../api/pets';

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
  const [totalLength, setTotalLength] = useState<number>() // Total length of array of all pets
  const [pageCount, setPageCount] = useState<number>() // Number of pages
  const [getPets, setPets] = useState<IPets[]>() // Array of pets
  const [areFiltersOpen, setFiltersStatus] = useState<boolean>(false) // Filter dropdown status
  const [searchParams, setsearchParams] = useSearchParams() // Search params (should contain all variables from Ifilters)
  const [filters, setFilters] = useState<Ifilters>({
    type: "",
    sex: "",
    minAge: "",
    maxAge: "",
    page: ""
  }) // Filters template

  const heroImg = "https://placekitten.com/2500/1000"

  // Basic functions
  const maxAgeCalc = () => {
    const maxAgeFiltered = options.minAge.filter(el => Number(el.value) >= Number(filters.minAge) && el.value !== "");
    maxAgeFiltered.unshift({ label: "Неважливо", value: "" });
    return maxAgeFiltered;
  }

  const getFilteredPets = async () => {
    try {
      let allPets = await apiGetAllPets();
      let startIndex = (Number(searchParams.get("page")) - 1) * pageSize;
      let endIndex = startIndex + pageSize;

      if (searchParams.get("type")) {
        allPets = allPets.filter((el: IPets) => el.type.toLowerCase() === searchParams.get("type"));
      }
      if (searchParams.get("sex")) {
        allPets = allPets.filter((el: IPets) => el.sex.toLowerCase() === searchParams.get("sex"));
      }
      if (searchParams.get("maxAge")) {
        allPets = allPets.filter((el: IPets) => Number(el.age) <= Number(searchParams.get("maxAge")));
      }
      if (searchParams.get("minAge")) {
        allPets = allPets.filter((el: IPets) => Number(el.age) >= Number(searchParams.get("minAge")));
      }

      let pageApplied = allPets.reverse().slice(startIndex, endIndex);

      setTotalLength(allPets.length);
      setPageCount(Math.ceil(allPets.length / pageSize));
      setPets(pageApplied);
    } catch {
      setPets([]);
      console.log("Fetch error");
    }
  }
  // ---

  // Hooks
  useEffect(() => {
    // Initializing page number if not provided
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setsearchParams(searchParams);
    }

    // Saving all search params to "Filters", so it could be displayed in filter dropdown 
    if (searchParams.size) {
      let updatedFilters = filters;
      Object.keys(filters).forEach(el => {
        if (searchParams.get(el)) {
          updatedFilters = { ...updatedFilters, [el]: searchParams.get(el) };
        }
      });

      getFilteredPets();
      setFilters(updatedFilters);
    }
  }, []);

  useEffect(() => {
    // Checking for illegal page numbers
    if (searchParams.get("page") && pageCount !== undefined) {
      if (Number(searchParams.get("page")) > (pageCount || 0)) {
        searchParams.set("page", pageCount + "" || "1");
        setsearchParams(searchParams);
      }
      if (Number(searchParams.get("page")) <= 0) {
        searchParams.set("page", "1");
        setsearchParams(searchParams);
      }
    }
  }, [pageCount]);

  useEffect(() => {
    getFilteredPets();
  }, [searchParams]);
  // ---

  // Action Functions
  const toggleFilters = () => {
    setFiltersStatus(!areFiltersOpen);
  }

  const apply = () => {
    Object.entries(filters).forEach(el => {
      searchParams.set(el[0], el[1]);
    });
    searchParams.set("page", "1");
    setsearchParams(searchParams);

    toggleFilters();
  }

  const reset = () => {
    Object.keys(filters).forEach(el => {
      searchParams.delete(el);
      setsearchParams(searchParams);

      toggleFilters();
    });

    searchParams.set("page", "1");
    setFilters({
      type: "",
      sex: "",
      minAge: "",
      maxAge: "",
      page: "",
    });
  }
  // ---

  if (!getPets) {
    return <>Завантаження</>
  }

  return (
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
          <button onClick={() => { toggleFilters() }}>Сортувати</button>
          <div className={`filtersDropdown ${areFiltersOpen ? "open" : "closed"}`}>

            <div className="row">
              <span>Тип</span>
              <FilterSelect filter={{ get: filters, set: setFilters, type: "type" }} options={options.type} />
            </div>

            <div className="row">
              <span>Стать</span>
              <FilterSelect filter={{ get: filters, set: setFilters, type: "sex" }} options={options.sex} />
            </div>

            <div className="row age">
              <span>Вік</span>
              <div>
                <span className="label">Від:</span>
                <FilterSelect filter={{ get: filters, set: setFilters, type: "minAge" }} options={options.minAge} />
              </div>

              <div>
                <span className="label">До:</span>
                <FilterSelect filter={{ get: filters, set: setFilters, type: "maxAge" }} options={maxAgeCalc()} />
              </div>
            </div>

            <div className="row buttons">
              <button className="apply" onClick={() => { apply() }}>Застосувати</button>
              <button className="reset" onClick={() => { reset() }}>Скинути</button>
            </div>

          </div>
        </div>

        <div className="petList">
          {getPets.length ?
            getPets.map(el => {
              return (
                <PetCard key={el._id} animalInfo={el} />
              )
            }) :
            <div className="notFound">
              <p className="notFoundTitle">Нічого не знайдено</p>
              <p className="notFoundDescription">{totalLength ? "Спробуйте змітини фільтри." : "Скоріш за все, зараз немає тварин."}</p>
            </div>

          }
        </div>
      </div>
      <div className="nav">

        <PaginationNav searchParam={searchParams} setSearchParams={setsearchParams} length={pageCount || 0} allPets={getPets} />

      </div>
    </section>
  )
}