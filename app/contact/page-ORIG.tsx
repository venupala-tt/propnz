export default function ContactPage() {
  return (
    <section className="px-4 py-10 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <form className="grid gap-4 max-w-md mx-auto">
        <input type="text" placeholder="Name" className="border p-2 rounded" />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <textarea placeholder="Message" className="border p-2 rounded" rows={4}></textarea>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">Send</button>
      </form>
    </section>
  )
}