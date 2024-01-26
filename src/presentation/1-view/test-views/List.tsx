///List.tsx
import { Link } from 'react-router-dom'

function List() {
  return (
    <ul>
    <li ><Link style={{color:'white'}} to='/users'>Ver lista de usuarios</Link></li>
   </ul>
  )
}

export default List