interface Ifilters {
  type: string;
  sex: string;
  minAge: string;
  maxAge: string;
  page: string;
}

interface IfilterState {
  filter: {
    get: Ifilters,
    set: Function,
    type: string
  };
  options: {
    label: string,
    value: any
  }[]
}

export const FilterSelect = (props: IfilterState) => {
  return (
    <select
    onChange={(e) => {
      props.filter.set({...props.filter.get, [props.filter.type]: e.target.value})
    }}
    value={(props.filter.get as any)[props.filter.type]}
    >

    {props.options.map(el => {
      return(
        <option key={el.value} label={el.label} value={el.value}></option>
      )
    })}
    
    </select>
  )
}