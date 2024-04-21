import { useTranslation } from "react-i18next";
import "../../../i18n/i18n";
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
    value: string,
    i18Key?: string
  }[];
}

export const FilterSelect = (props: IfilterState) => {
  const { t } = useTranslation();
  return (
    <select
      onChange={(e) => {
        props.filter.set({ ...props.filter.get, [props.filter.type]: e.target.value })
      }}
      value={(props.filter.get as any)[props.filter.type]}
    >

      {props.options.map(el => {
        return (
          <option key={el.value} label={el.i18Key?t(el.i18Key):el.label} value={el.value}></option>
        )
      })}

    </select>
  )
}