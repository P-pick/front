import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { createNavItems } from './utils';

export function BottomNavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentParams = new URLSearchParams(location.search);

  const navItems = createNavItems({ currentParams, navigate });
  const getIconClass = (path: string) =>
    clsx({
      'text-black': location.pathname !== path,
      'text-primary-red': location.pathname === path,
    });

  return (
    <footer className="w-full bg-white flex justify-center items-center border-t border-gray-200">
      <ul className="h-15 flex items-center gap-15">
        {navItems.map(({ id, icon: Icon, path, onClick, label }) => (
          <li key={path}>
            <button onClick={onClick} aria-label={label} id={id}>
              <Icon className={getIconClass(path)} />
            </button>
          </li>
        ))}
      </ul>
    </footer>
  );
}
