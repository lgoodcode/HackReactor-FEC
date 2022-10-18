import { useRef } from 'react'
import { IconSearch } from '@tabler/icons'
import '@/styles/productOverview/productOverview.css'

export default function SearchBar() {
  const searchRef = useRef()

  return (
    <nav className="navbar container">
      <div className="logo">[Insert Logo Here]</div>
      <input ref={searchRef} type="text" placeholder="test"></input>
      <div className="search-icon">
        <IconSearch />
      </div>
    </nav>
  )
}
