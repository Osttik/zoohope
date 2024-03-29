import { useState } from "react";
import { Nav } from "react-bootstrap";

interface IProps {
  element: {
    name: string,
    i18Key: string,
    url?: string,
    Ielements?: {
      name: string,
      url: string,
    }[]
  }
  states: {
    [key: string]: boolean
  },
  handleOpen: Function
}



export const Optionss = (props: IProps) => {
  return (
    <div className="option">
      <button className={props.states[props.element.i18Key] ? "down optionBtn" : "optionBtn"} onClick={() => { props.handleOpen(props.element.i18Key) }}>{props.element.name}</button>
      <div className={props.states[props.element.i18Key] ? "" : "closed"}>
        {props.element.Ielements?.map((e) => {
          return (
            <>
              <Nav.Link href={e.url} className="optionDropdown">
                {(e.name)}
              </Nav.Link>
            </>
          )
        })}
      </div>
    </div>
  )
}