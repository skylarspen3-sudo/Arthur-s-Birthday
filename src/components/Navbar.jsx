import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);

  return (
    <nav className="navbar">
 
      <ul className={`nav-links ${open ? 'show' : ''}`}>
        {[
          ['Home','/'],
          ['Memories','/memories'],
          ['Looking Forward','/looking-forward'],
          ['Lovelist','/lovelist'],
          ['Snake','/snake']
        ].map(([label, path]) => (
          <li key={path}>
            <NavLink onClick={() => setOpen(false)} to={path}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
