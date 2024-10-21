import { color } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomizeNails = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [errors, setErrors] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = {
    title: "Design your own Press-On Nails",
    price: 150000,
    images: [],
    // images: [
    //   // Almond
    //   {
    //     url: "../almond-short.png",
    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../almond-short.png",
    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../almond-medium.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../almond-medium.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Gliiter Polish",
    //       color: "White",
    //     },
    //   },

    //   {
    //     url: "../almond-medium-solid-red.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-blushpink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-pink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-lightblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-forestgreen.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-grape.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-yellow.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-royalblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-red.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-forestgreen.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-lightblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-pink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-royalblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-yellow.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-grape.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-blushpink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-red.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-blushpink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-royalblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-yellow.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-grape.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-pink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-lightblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-forestgreen.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../almond-short-glitter-periwinkle.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-solid-periwinkle.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-periwinkle.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-grape.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-yellow.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-royalblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-blushpink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-pink.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-lightblue.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-forestgreen.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../almond-short-solid-red.png",

    //     attributes: {
    //       shape: "Almond",
    //       length: "Short Almond",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../almond-medium-glitter-periwinkle.png",
    //     attributes: {
    //       shape: "Almond",
    //       length: "Medium Almond",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },

    //   // RO
    //   {
    //     url: "../ro-short.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-red.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-yellow.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-grape.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-royalblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-pink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-blushpink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-lightblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-forestgreen.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../ro-short-solid-periwinkle.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../ro-short.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-periwinkle.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-royalblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Royal Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-yellow.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Yellow",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-grape.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Grape",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-blushpink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-pink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-lightblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-forestgreen.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../ro-short-glitter-red.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Short Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },

    //   {
    //     url: "../ro-medium.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-red.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-periwinkle.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-blushpink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-pink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-lightblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-solid-forestgreen.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../ro-medium.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-periwinkle.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-blushpink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-pink.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-lightblue.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-forestgreen.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../ro-medium-glitter-red.png",
    //     attributes: {
    //       shape: "Round/Oval",
    //       length: "Medium Round/Oval",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },

    //   // Squoval
    //   {
    //     url: "../squoval-short.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-red.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-blushpink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-pink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-lightblue.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-forestgreen.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-solid-periwinkle.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },
    //   {
    //     url: "../squoval-short.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-red.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-blushpink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-pink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-lightblue.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-forestgreen.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../squoval-short-glitter-periwinkle.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Short Squoval",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },

    //   {
    //     url: "../squoval-medium.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-red.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-pink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-blushpink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-lightblue.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-forestgreen.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-solid-periwinkle.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Solid Color",
    //       color: "Periwinkle",
    //     },
    //   },

    //   {
    //     url: "../squoval-medium.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "White",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-red.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Red",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-blushpink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Blush Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-pink.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Pink",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-lightblue.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Light Blue",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-forestgreen.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Forest Green",
    //     },
    //   },
    //   {
    //     url: "../squoval-medium-glitter-periwinkle.png",
    //     attributes: {
    //       shape: "Squoval",
    //       length: "Medium Squoval",
    //       type: "Glitter Polish",
    //       color: "Periwinkle",
    //     },
    //   },
    // ],
    attributes: {
      shape: ["Almond", "Round/Oval", "Squoval"],
      length: {
        Almond: ["Short Almond", "Medium Almond"],
        "Round/Oval": ["Short Round/Oval", "Medium Round/Oval"],
        Squoval: ["Short Squoval", "Medium Squoval"],
      },
      type: ["Solid Color", "Glitter Polish"],
      color: [
        "White",
        "Red",
        "Periwinkle",
        "Blush Pink",
        "Pink",
        "Light Blue",
        "Forest Green",
        "Royal Blue",
        "Yellow",
        "Grape",
      ],
    },
  };
  // Function to generate image URL
  const generateImageUrl = (shape, length, type, color) => {
    const formattedShape = shape === "Round/Oval" ? "ro" : shape.toLowerCase();
    const formattedLength = length.split(" ")[0].toLowerCase();
    
    // If color is White, omit type and color from the URL
    if (color === "White") {
      return `../${formattedShape}-${formattedLength}.png`;
    }
  
    const formattedType = type === "Solid Color" ? "solid" : "glitter";
    const formattedColor = `-${color.toLowerCase().replace(/\s+/g, "")}`;
    
    return `../${formattedShape}-${formattedLength}-${formattedType}${formattedColor}.png`;
  };

  // Populate images dynamically
  product.attributes.shape.forEach((shape) => {
    product.attributes.length[shape].forEach((length) => {
      product.attributes.type.forEach((type) => {
        product.attributes.color.forEach((color) => {
          product.images.push({
            url: generateImageUrl(shape, length, type, color),
            attributes: {
              shape,
              length,
              type,
              color,
            },
          });
        });
      });
    });
  });

  console.log(product.images);
  useEffect(() => {
    const defaultAttributes = {};
    Object.keys(product.attributes).forEach((attr) => {
      defaultAttributes[attr] =
        product.attributes[attr][0] || product.attributes.length.Almond[0]; // Default to first length for Almond
    });
    setSelectedAttributes(defaultAttributes);

    const matchingImageIndex = product.images.findIndex((image) =>
      Object.entries(defaultAttributes).every(
        ([key, value]) => image.attributes[key] === value
      )
    );
    if (matchingImageIndex !== -1) {
      setCurrentImageIndex(matchingImageIndex);
    }
  }, []);
  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAttributeChange = (attribute, value) => {
    setSelectedAttributes((prev) => {
      const updatedAttributes = {
        ...prev,
        [attribute]: value,
      };
      if (attribute === "shape") {
        const defaultLength = product.attributes.length[value][0];
        updatedAttributes["length"] = defaultLength;
      }

      const matchingImageIndex = product.images.findIndex((image) =>
        Object.entries(updatedAttributes).every(
          ([key, val]) => image.attributes[key] === val
        )
      );
      console.log(matchingImageIndex);
      if (matchingImageIndex !== -1) {
        setCurrentImageIndex(matchingImageIndex);
      }

      return updatedAttributes;
    });

    validateSelection(attribute, value);
  };

  const validateSelection = (attribute, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [attribute]: `Please select a ${attribute}`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[attribute];
        return newErrors;
      });
    }
  };

  const renderImages = () => {
    return (
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg shadow-md">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Product image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    );
  };

  const availableLengths =
    product.attributes.length[selectedAttributes.shape] || [];

  const handleAddToCart = async () => {
    if (!localStorage.getItem("userData")) {
      navigate("/login");
      return;
    }
    const customization = JSON.stringify(selectedAttributes);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const accountId = userData.accountId;
    const cartItem = {
      productId: 33,
      quantity: quantity,
      customization: customization,
      accountId: accountId,
    };
    console.log(cartItem);

    try {
      const response = await fetch(
        "https://personailize.store/api/Cart/items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Lưu đối tượng người dùng vào localStorage
        localStorage.setItem("cartId", data.cartId);
        alert("Product added to cart successfully!");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert(
        "An error occurred while adding the product to cart. Please try again."
      );
    }
  };
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-8">
      <div className="md:w-1/2 h-[600px]">{renderImages()}</div>
      <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-2xl font-semibold mb-6">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </p>
        {/* <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Quantity
          </label>
          <div className="flex items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="bg-gray-200 p-2 rounded-l-md"
              aria-label="Decrease quantity"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              className="w-16 text-center border-t border-b border-gray-300 p-2"
              min="1"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="bg-gray-200 p-2 rounded-r-md"
              aria-label="Increase quantity"
            >
              <FaPlus />
            </button>
          </div>
        </div> */}
        {Object.entries(product.attributes).map(([attribute, values]) => (
          <div key={attribute} className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {attribute === "length"
                ? availableLengths.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAttributeChange(attribute, value)}
                      className={`px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                        selectedAttributes[attribute] === value
                          ? "bg-[#F0A0AD] text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                      aria-label={`Select ${value} ${attribute}`}
                    >
                      {value}
                    </button>
                  ))
                : values.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAttributeChange(attribute, value)}
                      className={`px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                        selectedAttributes[attribute] === value
                          ? "bg-[#F0A0AD] text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                      aria-label={`Select ${value} ${attribute}`}
                    >
                      {value}
                    </button>
                  ))}
            </div>
            {errors[attribute] && (
              <p className="text-red-500 text-sm mt-1">{errors[attribute]}</p>
            )}
          </div>
        ))}
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#F0A0AD] text-white py-3 px-6 rounded-md font-medium  transition-colors duration-200"
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomizeNails;
