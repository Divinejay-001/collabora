import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex bg-gradient-to-tr from-primary/25 to-tertiary/5'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
     <div className="flex items-center space-x-1">
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center shadow-md">
    <p className="text-white font-outfit font-bold text-xl sm:text-2xl">C</p>
  </div>
  <h2 className="font-outfit font-bold text-xl sm:text-2xl text-slate-800 tracking-tight">
    Colla<span className="text-black/60">bora</span>
  </h2>
</div>


        
        {children}
      </div>

      <div className="hidden md:flex w-[50vw] h-screen items-center justify-center relative overflow-hidden">
  <img
    src="https://i.pinimg.com/736x/3f/1c/48/3f1c4887ed1b00452c7cac8052565791.jpg"
    alt="Teamwork"
    className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
  />

  {/* Optional overlay for brand tint */}
  <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-tertiary/40 mix-blend-multiply" />

  {/* Optional brand or quote */}
  <div className="relative z-10 text-center px-6">
    <h2 className="text-white text-2xl font-outfit font-semibold drop-shadow-lg">
      Collaborate. Assign. Deliver.
    </h2>
    <p className="text-white/80 text-sm mt-2">Manage work the smarter way.</p>
  </div>
</div>

    </div>
  )
}

export default AuthLayout