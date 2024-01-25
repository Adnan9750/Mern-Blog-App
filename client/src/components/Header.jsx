import { Button, Navbar, NavbarLink, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from "react-icons/fa"

const Header = () => {
    const path = useLocation().pathname;
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
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/project'} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
