interface IfilterState {
  filter: {
    get: any,
    set: any,
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
    value={props.filter.get[props.filter.type]}
    >

    {props.options.map(el => {
      return(
        <option key={el.value} label={el.label} value={el.value}></option>
      )
    })}
    
    </select>
  )
}