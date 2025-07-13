import { useBottomNavigation } from './utils';

export default function BottomNavigationBar() {
  const { navItems, getIconClass } = useBottomNavigation();

  return (
    <footer className="w-full bg-white flex justify-center items-center border-t border-gray-200">
      <ul className="h-15 flex items-center gap-15">
        {navItems.map(({ icon: Icon, path, onClick }) => (
          <li key={path}>
            <button onClick={onClick}>
              <Icon className={getIconClass(path)} />
            </button>
          </li>
        ))}
      </ul>
    </footer>
  );
}
