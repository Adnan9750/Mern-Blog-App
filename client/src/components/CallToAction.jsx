import { Button } from "flowbite-react"


const CallToAction = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center
        rounded-tr-3xl rounded-bl-3xl text-center gap-3">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">Want to learn more about Mern Stack?</h2>
            <p className="text-slate-500 my-2">
                Check out projects on github
            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-lg rounded-bl-none rounded-tr-none">
                <a href="https://github.com/Adnan9750" target="_blank" rel='noopener noreferrer'>
                    Check My Projects
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://www.infomazeelite.com/wp-content/uploads/2022/12/MERN-Stack-Development.png" />
        </div>
      </div>
    </>
  )
}

export default CallToAction
