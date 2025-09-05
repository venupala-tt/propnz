<Link
  key={slug}
  href={`../properties/propdetails/${slug}`}
  className="group rounded-xl bg-white shadow-md hover:shadow-xl 
  transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
>
  <img
    src={imgUrl}
    alt={title}
    className="w-full h-48 object-cover"
  />

  <div className="p-6">
    <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600">
      {title}
    </h2>
  </div>
</Link>
