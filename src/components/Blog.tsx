import React, { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShare,
  FaComment,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "Tìm hiểu về chi phí học nghề nail có đắt hay không?",
      description:
        "Những cách chăm sóc bàn tay đẹp cực kì dễ làm ngay tại nhà ...",
      image:
        "https://blog.kellypangnail.com/assets/2022/03/woman-doing-manicure-client-close-up_23-2148697076-290x160.jpeg",
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
      title: "Mẫu nail hoạt hình trẻ trung",
      description: "Những mẫu nail hoạt hình trẻ trung, siêu đáng yêu ...",
      image:
        "https://blog.kellypangnail.com/assets/2023/07/t7-23-1-kp-1200x800-1-1024x683.jpg",
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
      title: "Những mẫu móng mẫu nail đẹp đơn giản, hiện đại",
      description:
        "Những mẫu móng mẫu nail đẹp đơn giản, hiện đại được KellyPang thiết kế ...",
      image:
        "	https://blog.kellypangnail.com/assets/2023/05/045-kp-1200x800-1-1024x683.jpg",
      category: "Trends",
      author: {
        name: "Olivia Taylor",
        bio: "Fashion enthusiast and nail color expert",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      },
      date: "June 5, 2023",
      tags: ["fall", "nail polish", "colors"],
    },
    {
      id: 4,
      title: "Những mẫu nail đẹp tráng gương vàng gold sang trọng - P1",
      description:
        "BST những mẫu nail đẹp tráng gương vàng gold từ Kelly Pang - phần",
      image:
        "https://blog.kellypangnail.com/assets/2023/02/IMG_1043-kp-1200x800-1-290x160.jpg",
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
      title: "Những mẫu nail đẹp tráng gương vàng gold sang trọng - P2",
      description:
        "Tiếp nối phần 1, Kelly Pang xin gửi đến các bạn BST những mẫu nail đẹp với hiệu ứng tráng ....",
      image:
        "https://blog.kellypangnail.com/assets/2023/03/IMG_0585-kp-1200x800-1-290x160.jpg",
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
      title: "Nail Noel đẹp mắt",
      description:
        "Nail Noel siêu cute từ KellyPang với gam màu trắng, đỏ và xanh làm chủ đạo, cùng hoạ tiết đậm chất giáng sinh xinh xắn",
      image:
        "	https://blog.kellypangnail.com/assets/2022/12/nail-noel-2022-1-290x160.jpeg",
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
      title: "Mẫu nail Tết đẹp sang",
      description: "BST mẫu nail tết 2023 đẹp sang",
      image:
        "https://blog.kellypangnail.com/assets/2022/05/KP1C100147DB-2048x1638-1-290x160.jpeg",
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

  const categories = ["All", "Nail Art", "Nail Care", "Trends"];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || post.category === selectedCategory)
  );

  const BlogPost = ({ post }) => (
    <div
      onClick={() => navigate(`/blog/${post.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full"
    >
      {/* Image section */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      {/* Description section */}
      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.description}</p>
      </div>

      {/* Information section */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-gray-500">{post.author.bio}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <MdAccessTime className="mr-1" />
            {post.date}
          </div>
          <div className="flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-600"
              aria-label="Share post"
            >
              <FaShare />
            </button>
            <button
              className="text-green-500 hover:text-green-600"
              aria-label="Comment on post"
            >
              <FaComment />
            </button>
          </div>
        </div>
        <div className="mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search blog posts"
              className="w-full pl-10 pr-4 py-2 border border-[#F0A0AD] rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-[#F0A0AD] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12 bg-pink-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#F0A0AD] mb-4">
            Ready for a nail makeover?
          </h2>
          <p className="text-[#F0A0AD] mb-6">
            Book an appointment today and get 15% off your first visit!
          </p>
          <button className="bg-[#F0A0AD] text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
