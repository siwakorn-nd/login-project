const Navbar = () => {
    return (
        <nav className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
            <a href="/" className="btn btn-ghost normal-case text-xl text-white">Home</a>
            </div> 
                <div className="navbar-end">
                    
                    <a href="/register" className="btn btn-ghost normal-case text-xl text-white">Register</a>
                    <a href="/login" className="btn btn-ghost normal-case text-xl text-white">Login</a>
                </div>
            
        </nav>
    )
}

export default Navbar