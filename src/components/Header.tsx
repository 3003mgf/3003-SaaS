import { UserButton } from "./UserButton";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";


const Header = () => {
  return ( 
  <header className="bg-white dark:bg-gray-900 sticky top-0 z-50">
    <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 max-w-7xl mx-auto">
      <Logo/>

      <div className="flex-1 flex items-center justify-end space-x-4">
        {/* LanguageSelect */}


        {/* Session && */}


        {/* DarkMode */}
        <DarkModeToggle/>

        {/* User Button */}
        <UserButton name="NG"/>

      </div>
    </nav>
  </header>
  );
}
 
export default Header;