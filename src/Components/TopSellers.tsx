import axios from "axios"
import { useEffect, useState } from "react"

function TopSellers() {

  interface Author {
    name: string,
    isFollowing: boolean,
    image: string
  }
  const [authors, setAuthors] = useState<Author[]>([])
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(`https://randomuser.me/api/?results=5`)

        const authorData: Author[] = response.data.results.map((users: any) => ({
          name: `${users.name.first} ${users.name.last}`,
          isFollowing: false,
          image: users.picture.medium
        }))
        setAuthors(authorData)

      } catch (error) {
        console.log(`Failed to fetch Data ${error}`);
      }
    }
    fetchAuthorData()
  }, [])

  const handleFollowClick = (index: number) => {
    setAuthors(prevAuthor => prevAuthor.map((author, i) => i === index ? { ...author, isFollowing: !author.isFollowing } : author))
  }
  return (
    <div className="bg-white py-6 px-4 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-3xl text-center mb-6 font-bold text-amber-950">Top Sellers</h2>

      <ul className="flex flex-wrap justify-center gap-6">
        {authors.map((author, index) => (
          <li
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-300 w-[160px] min-h-[240px] justify-between"
          >
            <div className="flex flex-col items-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-amber-100"
              />
              <p className="text-amber-950 font-medium text-sm text-center">{author.name}</p>
            </div>
            <button
              onClick={() => handleFollowClick(index)}
              className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold transition
                ${author.isFollowing
                  ? 'bg-red-50 text-amber--950 hover:bg-amber-800 hover:text-white'
                  : 'bg-amber-950 text-white hover:bg-amber-800'
                }`}
            >
              {author.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default TopSellers