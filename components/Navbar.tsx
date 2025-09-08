{/* Desktop Menu + Social Icons in one flex row */}
<div className="hidden md:flex items-center space-x-6 mt-4 md:mt-0">
  {/* Navigation Items */}
  {navLinks.map((item) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`relative font-medium transition-colors duration-300 group
          ${isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"}`}
      >
        {item.label}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-500 
          transition-all duration-300 
          ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
        ></span>
      </Link>
    );
  })}

  {/* Social Icons */}
  <div className="flex items-center space-x-4 ml-8">
    <a href="https://www.youtube.com/@propmatics" target="_blank" rel="noopener noreferrer">
      <FaYoutube className="text-red-600 hover:scale-110 transition-transform" size={22} />
    </a>
    <a href="https://www.instagram.com/propmatics/" target="_blank" rel="noopener noreferrer">
      <FaInstagram className="text-pink-500 hover:scale-110 transition-transform" size={22} />
    </a>
    <a href="https://www.facebook.com/profile.php?id=100063560241775" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="text-blue-600 hover:scale-110 transition-transform" size={22} />
    </a>
    <a href="https://www.linkedin.com/in/proptyme-property-management-services-50a612184/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="text-blue-700 hover:scale-110 transition-transform" size={22} />
    </a>
    {/* Wishlink */}
    <a href="https://www.wishlink.com/propmatics" target="_blank" rel="noopener noreferrer">
      <img src="wishlink-favicon.png" className="w-6 h-6 hover:scale-110 transition-transform" />
    </a>
  </div>
</div>
