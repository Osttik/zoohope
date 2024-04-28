/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react"
import "../../styles/index.scss"
import { PetCard } from "./petCard/petCard"
import { FilterSelect } from "./filterSelect/filterSelect";
import { useSearchParams } from "react-router-dom";
import { PaginationNav } from "./paginationNav/paginatioNav";
import { pageSize, options } from "../../data/petList";
import { getAllPets } from '../../api/pets';
import { useTranslation } from "react-i18next";
import "../../i18n/i18n";
import { IPet } from "../../define";
import PetContext from "../../PetsContext";

interface Ifilters {
  type: string;
  sex: string;
  minAge: string;
  maxAge: string;
  page: string;
}

export const PetList = () => {
  const { pets_data } = useContext(PetContext);
  const { t } = useTranslation();
  const [totalLength, setTotalLength] = useState<number>() // Total length of array of all pets
  const [pageCount, setPageCount] = useState<number>() // Number of pages
  const [getPets, setPets] = useState<IPet[]>() // Array of pets
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
    maxAgeFiltered.unshift({ label: t('no_matter'), value: "" });
    return maxAgeFiltered;
  }

  const getFilteredPets = async () => {
    try {
      let allPets = pets_data;

      let startIndex = (Number(searchParams.get("page")) - 1) * pageSize;
      let endIndex = startIndex + pageSize;

      if (searchParams.get("type")) {
        allPets = allPets.filter((el) => el.type.toLowerCase() === searchParams.get("type"));
      }
      if (searchParams.get("sex")) {
        allPets = allPets.filter((el) => el.sex.toLowerCase() === searchParams.get("sex"));
      }
      if (searchParams.get("maxAge")) {
        allPets = allPets.filter((el) => Number(el.age) <= Number(searchParams.get("maxAge")));
      }
      if (searchParams.get("minAge")) {
        allPets = allPets.filter((el) => Number(el.age) >= Number(searchParams.get("minAge")));
      }

      let pageApplied = allPets.reverse().slice(startIndex, endIndex);

      setTotalLength(allPets.length);
      setPageCount(Math.ceil(allPets.length / pageSize));
      setPets(pageApplied);
    } catch {
      setPets([]);
      console.error("Fetch error");
    }

  }
  // ---

  // Hooks
  // useEffect(() => {
  //   sessionStorage.setItem('queryParams', window.location.search)
  // }, [Object.fromEntries(searchParams.entries())])

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
  }, [pets_data]);

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
  }, [searchParams, pets_data]);
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
    // Сбросить значения фильтров до начальных
    setFilters({
      type: "",
      sex: "",
      minAge: "",
      maxAge: "",
      page: "",
    });
  
    // Очистить параметры поиска
    searchParams.delete("type");
    searchParams.delete("sex");
    searchParams.delete("minAge");
    searchParams.delete("maxAge");
    searchParams.set("page", "1");
    setsearchParams(searchParams);
  
    // Показать всех животных
    getFilteredPets();
    
    // Закрыть фильтры (если они были открыты)
    setFiltersStatus(false);
  }
  // ---

  if (!getPets) {
    return <>{t('loading')}</>
  }
  return (
    <section className="petListSection">
      <div className="hero">
        <div className="text">
          <h1 className="title">{t('adopt_pet')}</h1>
          <h2 className="subtitle">{t('list_h2_title')}</h2>
        </div>
        {/* <img src={heroImg} alt="Hero Img" className="heroImg" /> */}
      </div>

      <div>
        <div className="filters">
          <button onClick={() => { toggleFilters() }}>{t('sort')}</button>
          <div className={`filtersDropdown ${areFiltersOpen ? "open" : "closed"}`}>

            <div className="row">
              <span>{t('type')}</span>
              <FilterSelect filter={{ get: filters, set: setFilters, type: "type" }} options={options.type} />
            </div>

            <div className="row">
              <span>{t('sex')}</span>
              <FilterSelect filter={{ get: filters, set: setFilters, type: "sex" }} options={options.sex} />
            </div>

            <div className="row age">
              <span>{t('age')}</span>
              <div>
                <span className="label">{t('list_from')}</span>
                <FilterSelect filter={{ get: filters, set: setFilters, type: "minAge" }} options={options.minAge} />
              </div>

              <div>
                <span className="label">{t('list_to')}</span>
                <FilterSelect filter={{ get: filters, set: setFilters, type: "maxAge" }} options={maxAgeCalc()} />
              </div>
            </div>

            <div className="row buttons">
              <button className="apply" onClick={() => { apply() }}>{t('apply')}</button>
              <button className="reset" onClick={() => { reset() }}>{t('reset')}</button>
            </div>

          </div>
        </div>

        <div className="petList petListSection">
          {getPets.length ?
            getPets.map(el => {
              return (
                <PetCard key={el._id} animalInfo={el} />
              )
            }) :
            <div className="notFound">
              <p className="notFoundTitle">{t('nothing_found')}</p>
              <p className="notFoundDescription">{totalLength ? t('change_filters') : t('mb_no_pets')}</p>
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
