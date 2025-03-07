function Header() {

    return(
        <>
            <header className="bg-white">
                <nav className="flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                        <img className="h-24 w-auto" src="https://logoeps.com/wp-content/uploads/2025/02/DeepSeek_logo_icon.png" alt=""/>
                    </a>
                </div>
                </nav>
            </header>
        </>
    )
}

export default Header;