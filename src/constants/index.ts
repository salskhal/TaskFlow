import logo from "@/assets/logo.svg"

export const navigation = [
    {
        id: 1,
        name: "Home",
        url: "#home"
    },
    {
        id: 2,
        name: "Features",
        url: "#features"
    },
    {
        id: 1,
        name: "About Us",
        url: "#about"
    }
]


export const siteConfig = {
    global: {
        name: "TaskFlow",
        logo: logo,
        title: "TaskFlow",
        description: "Manage yor workplace and task efficiently",
    }
}

export const features = [

]



// <div className="fixed top-0 left-0 w-full bg-white z-50 ">
    //   <nav className="flex items-center justify-between bg-white px-3 py-3 max-w-[1280px] mx-auto ">
    //     <div>
    //       <img src={Logo} alt="Logo" />
    //     </div>

    //     <div className="flex items-center space-x-8">
    //       {navigation.map((item) => (
    //         <a
    //           href={item.url}
    //           key={item.name}
    //           className={`text-2xl lg:text-base lg:font-semibold lg:leading-5 `}
    //         >
    //           {item.name}
    //         </a>
    //       ))}
    //     </div>

    //     <div>
    //       <Link to="/auth">
    //         <Button className="bg-white text-black border-2 border-black hover:text-white font-semibold">
    //           Log In
    //         </Button>
    //       </Link>
    //     </div>
    //   </nav>
    // </div>