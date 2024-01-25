import { Button, Navbar, NavbarLink, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from "react-icons/fa"

const Header = () => {
  return (
    <>
      <Navbar className='border-b-2'>
        {/* Navbar brand */}
        <Link to='/' className='self-center whitespace-nowrap font-semibold text-sm sm:text-xl dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                    rounded-md text-white'>
                Adnan's
            </span>
            Blog
        </Link>
        {/* input field for search */}
        <form>
            <TextInput 
                type='text'
                placeholder='search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        {/* search icon in small devices */}
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            {/* dark and light mode */}
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon/>
            </Button>
            {/* sign in button */}
            <Link to='/sign-in'>
                <Button gradientDuoTone='purpleToBlue'>
                    Sign In
                </Button>
            </Link>
            <Navbar.Collapse>
                <Navbar.Link>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  )
}

export default Header
