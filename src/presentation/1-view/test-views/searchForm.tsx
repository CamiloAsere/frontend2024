 // Define el tipo para una sola pregunta
 
function Select({pageSize,onChange}) {
    return (
      <div>
      <select value={pageSize} onChange={onChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select></div>
    )
  }
  
  export default Select