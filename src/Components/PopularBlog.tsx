export default function PopularBlog() {
    const blogs = [
        {
          title: "Top 10 Strategies to Boost Online Sales",
          author: "Rachel Green",
          image: "https://images.unsplash.com/photo-1556742400-b5e5f7c1a4b5?auto=format&fit=crop&w=400&q=80",
          summary: "Discover proven techniques that help eCommerce businesses increase their conversion rates and overall revenue.",
          date: "2025-04-01",
          comments: 48,
          likes: 192,
        },
        {
          title: "Best Platforms for Launching Your eCommerce Store",
          author: "Michael Lee",
          image: "https://images.unsplash.com/photo-1585386959984-a41552268e8e?auto=format&fit=crop&w=400&q=80",
          summary: "A breakdown of Shopify, WooCommerce, Wix, and BigCommerce to help you choose the right one for your business.",
          date: "2025-03-28",
          comments: 30,
          likes: 145,
        },
        {
          title: "The Psychology Behind Product Page Design",
          author: "Sara Kim",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80",
          summary: "Learn how colors, layout, and copywriting influence buying decisions in your online store.",
          date: "2025-03-20",
          comments: 41,
          likes: 213,
        },
        {
          title: "How to Handle Returns Without Losing Customers",
          author: "Liam Scott",
          image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d5?auto=format&fit=crop&w=400&q=80",
          summary: "Implement customer-friendly return policies that keep trust high and costs low.",
          date: "2025-03-16",
          comments: 18,
          likes: 98,
        },
        {
          title: "Mobile Commerce: Designing for the Thumb",
          author: "Natalie Singh",
          image: "https://images.unsplash.com/photo-1585238342028-4bc0dd5d6a42?auto=format&fit=crop&w=400&q=80",
          summary: "Optimizing your mobile store experience for speed, accessibility, and conversions.",
          date: "2025-04-04",
          comments: 25,
          likes: 134,
        }
      ];
      
      
  
    return (
      <div className="bg-white py-6 px-4 rounded-lg shadow-md max-w-5xl mx-auto mb-8">
        <h2 className="text-3xl text-center mb-6 font-bold text-amber-950">Popular Blogs</h2>
  
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog, index) => (
            <div key={index} className="flex gap-4 bg-amber-50 rounded-lg shadow p-4 hover:shadow-md transition">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3 className="font-semibold text-lg text-amber-950">{blog.title}</h3>
                  <p className="text-sm text-gray-700 mt-1 line-clamp-2">{blog.summary}</p>
                </div>
                <div className="text-xs text-gray-500 mt-3 flex justify-between items-center">
                  <span>By: {blog.author}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="text-xs mt-2 text-gray-600 flex gap-4">
                  <span>💬 {blog.comments} comments</span>
                  <span>❤️ {blog.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  