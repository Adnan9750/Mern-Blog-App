import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsGithub, BsInstagram, BsLinkedin} from 'react-icons/bs'

const FooterCom = () => {
  return (
    <>
      <Footer container className='border border-t-8 border-teal-700'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                {/* link div */}
                <div className='mt-5'>
                    <Link to='/' className='self-center whitespace-nowrap font-semibold text-sm sm:text-xl dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                                rounded-md text-white'>
                            Adnan's
                        </span>
                        Blog
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                             href='https://github.com/Adnan9750'
                             target='_blank'>
                                My Project
                            </Footer.Link>
                            <Footer.Link
                             href='/about'
                             target='_blank'>
                                Adnan's Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow Us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                             href='https://github.com/Adnan9750'
                             target='_blank'>
                                Github
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Adnan's Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link href='#'>
                                Terms &amp; Condition
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className='w-full sm:flex  sm:justify-between'>
                <Footer.Copyright by="Adnan's Blog" year={new Date().getFullYear()} />
                <div className='flex gap-5 mt-4 sm:mt-0 sm:justify-center'>
                    <Footer.Icon href='#' icon={BsFacebook}/>
                    <Footer.Icon href='#' icon={BsInstagram}/>
                    <Footer.Icon href='https://github.com/Adnan9750' icon={BsGithub}/>
                    <Footer.Icon href='#' icon={BsLinkedin}/>
                </div>
            </div>
        </div>
      </Footer>
    </>
  )
}

export default FooterCom
