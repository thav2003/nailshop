import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaShare, FaComment, FaArrowLeft } from "react-icons/fa";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const blogPosts = [
    {
      id: 1,
      title: "10 Trendy Nail Art Designs for Summer",
      description:
        "Explore the hottest nail art trends for this summer season.",
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      category: "Nail Art",
      author: {
        name: "Emma Johnson",
        bio: "Nail artist with 5 years of experience",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      date: "June 15, 2023",
      tags: ["summer", "trends", "nail art"],
    },
    {
      id: 2,
      title: "The Ultimate Guide to Nail Care",
      description:
        "Learn essential tips for maintaining healthy and beautiful nails.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b",
      category: "Nail Care",
      author: {
        name: "Sophia Lee",
        bio: "Certified nail technician and beauty blogger",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
      date: "June 10, 2023",
      tags: ["nail care", "tips", "beauty"],
    },
    {
      id: 3,
      title: "5 Must-Try Nail Polish Colors for Fall",
      description:
        "Discover the perfect nail polish shades to complement your autumn wardrobe.",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc",
      category: "Trends",
      author: {
        name: "Olivia Taylor",
        bio: "Fashion enthusiast and nail color expert",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      },
      date: "June 5, 2023",
      tags: ["fall", "nail polish", "colors"],
    },
    // New blog posts
    {
      id: 4,
      title: "How to Choose the Right Nail Shape for Your Hands",
      description:
        "Find out which nail shapes are best suited for your hand type and style.",
      image: "https://images.unsplash.com/photo-1563201517-e353a57db1b3",
      category: "Nail Shapes",
      author: {
        name: "Lily Martinez",
        bio: "Professional manicurist and nail expert",
        avatar: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
      },
      date: "May 28, 2023",
      tags: ["nail shapes", "manicure", "tips"],
    },
    {
      id: 5,
      title: "Top 5 DIY Nail Art Kits You Should Try",
      description:
        "Get creative at home with these must-have DIY nail art kits.",
      image: "https://images.unsplash.com/photo-1588776815535-89cf0b8ee5ab",
      category: "Nail Art",
      author: {
        name: "Mia Carter",
        bio: "Nail artist and home decor enthusiast",
        avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
      },
      date: "May 20, 2023",
      tags: ["DIY", "nail art", "kits"],
    },
    {
      id: 6,
      title: "Nail Extensions: What You Need to Know Before Getting Them",
      description:
        "A comprehensive guide to nail extensions, from types to aftercare tips.",
      image: "https://images.unsplash.com/photo-1592998980150-755d2b97a575",
      category: "Nail Extensions",
      author: {
        name: "Ava Williams",
        bio: "Licensed nail technician with a passion for creative designs",
        avatar: "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
      },
      date: "May 15, 2023",
      tags: ["nail extensions", "guide", "tips"],
    },
    {
      id: 7,
      title: "The History of Nail Polish: From Ancient Times to Today",
      description:
        "Discover the fascinating history of nail polish, from its origins to modern trends.",
      image: "https://images.unsplash.com/photo-1551048798-8c8d1d5ed9f8",
      category: "History",
      author: {
        name: "Isabella Davis",
        bio: "Beauty historian and writer",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
      },
      date: "April 30, 2023",
      tags: ["history", "nail polish", "beauty"],
    },
  ];
  useEffect(() => {
    const foundPost = blogPosts.find((post) => post.id === parseInt(id));
    setPost(foundPost || null);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Link to="/blog" className="flex items-center text-[#F0A0AD] mb-6">
        <FaArrowLeft className="mr-2" /> Back to Blog
      </Link>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center mb-6">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <div className="prose max-w-none mb-8">
        {/* Render full blog content here */}
        {post.description}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="text-blue-500 hover:text-blue-600">
            <FaShare /> Share
          </button>
          <button className="text-green-500 hover:text-green-600">
            <FaComment /> Comment
          </button>
        </div>
        <div>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* Add comments section and related posts here */}
    </div>
  );
};

export default BlogDetail;
