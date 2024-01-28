import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FooterCom = () => {
  return (
    <>
      <Footer container className='border border-t-8 border-teal-700'>
        <div>
            <div>
                {/* link div */}
                <div>
                    <Link to='/' className='self-center whitespace-nowrap font-semibold text-sm sm:text-xl dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                                rounded-md text-white'>
                            Adnan's
                        </span>
                        Blog
                    </Link>
                </div>
                <div></div>
            </div>
        </div>
      </Footer>
    </>
  )
}

export default FooterCom
