const Persons = (props) => {
 
    return (
      <li>{props.name} {props.number}
      <button onClick={props.delButton}>Delete</button>
      </li>
  
    )
  }

  export default Persons