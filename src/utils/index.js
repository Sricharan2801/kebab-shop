import Baklava from "../assets/Images/Baklava.webp"
import ZestyKebabs_ChickenKebab from "../assets/Images/ZestyKebabs_ChickenKebab.webp"
import ZestyKebabs_ChickenParma from "../assets/Images/ZestyKebabs_ChickenParma.webp"
import ZestyKebabs_RegularHSP from "../assets/Images/ZestyKebabs_RegularHSP.webp"
import ZestyKebabs_Salad from "../assets/Images/ZestyKebabs_Salad.webp"
import kebabs from "../assets/categoryImages/kebab.webp"
import kebabCombo from "../assets/categoryImages/kebabCombo.webp"
import kebabPlate from "../assets/categoryImages/kebabPlate.webp"
import HSP from "../assets/categoryImages/HSP.webp"
import burgers from "../assets/categoryImages/burgers.webp"
import meatBox from "../assets/categoryImages/meatBox.webp"
import meatAndSalad from "../assets/categoryImages/meatAndSalad.webp"
import schnitzel from "../assets/categoryImages/schnitzel.webp"
import salads from "../assets/categoryImages/salads.webp"
import milkshakes from "../assets/categoryImages/milkshakes.webp"
import deserts from "../assets/categoryImages/deserts.webp"
import biryani from "../assets/categoryImages/biryani.webp"


import { FaEnvelope, FaPhone } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"

export const navItems = [
  { id: 1, name: "Home", path: "#" },
  { id: 2, name: "About Us", path: "#aboutUs" },
  { id: 3, name: "Menu", path: "#menu" },
  { id: 4, name: "Contact", path: "#contact" },
  { id: 5, name: "Profile", path: "#profile" }
];


export const aboutPageImages = [
  {
    id: 1,
    url: Baklava,
    alt: "aboutPageImage1"
  },
  {
    id: 2,
    url: ZestyKebabs_ChickenKebab,
    alt: "aboutPageImage2"
  },
  {
    id: 3,
    url: ZestyKebabs_ChickenParma,
    alt: "aboutPageImage3"
  },
  {
    id: 4,
    url: ZestyKebabs_Salad,
    alt: "aboutPageImage4"
  },
  {
    id: 5,
    url: ZestyKebabs_RegularHSP,
    alt: "aboutPageImage5"
  }
]

export const menuCategories = [
  { id: 1, name: "Kebabs", url: kebabs },
  { id: 2, name: "Kebab Combo", url: kebabCombo },
  { id: 3, name: "Kebab Plate", url: kebabPlate },
  { id: 4, name: "HSP", url: HSP },
  { id: 5, name: "Burgers", url: burgers },
  { id: 6, name: "Meat Box", url: meatBox },
  { id: 7, name: "Meat & Salad", url: meatAndSalad },
  { id: 8, name: "Schnitzel's", url: schnitzel },
  { id: 9, name: "Salads", url: salads },
  { id: 10, name: "Milk shakes", url: milkshakes },
  { id: 11, name: "Deserts", url: deserts },
  { id: 12, name: "Biryani", url: biryani },
]

export const allMenuItems = [
  {
    id: 1,
    categoryName: "Kebabs",
    items: [
      { id: 101, name: "Jr Kebab", price: 10, url: kebabs },
      { id: 102, name: "Chicken Kebab", price: 12, url: kebabs },
      { id: 103, name: "Lamb Kebab", price: 13, url: kebabs },
      { id: 104, name: "Mix Kebab", price: 15, url: kebabs },
      { id: 105, name: "Falafel Kebab", price: 10, url: kebabs },
      { id: 106, name: "Extra Meat Kebab", price: 5, url: kebabs },
    ],
  },
  {
    id: 2,
    categoryName: "Kebab Combo",
    items: [
      { id: 201, name: "Combo 1", price: 10, url: kebabCombo },
      { id: 202, name: "Combo 2", price: 12, url: kebabCombo },
      { id: 203, name: "Combo 3", price: 13, url: kebabCombo },
    ],
  },
  {
    id: 3,
    categoryName: "Kebab Plate",
    items: [
      { id: 301, name: "Regular", price: 10, url: kebabPlate },
      { id: 302, name: "Large", price: 12, url: kebabPlate },
    ],
  },
  {
    id: 4,
    categoryName: "HSP",
    items: [
      { id: 401, name: "Small", price: 10, url: HSP },
      { id: 402, name: "Regular", price: 12, url: HSP },
      { id: 403, name: "Large", price: 13, url: HSP },
    ],
  },
  {
    id: 5,
    categoryName: "Burgers",
    items: [
      { id: 501, name: "Chicken", price: 10, url: burgers },
      { id: 502, name: "Veggie", price: 12, url: burgers },
    ]
  },
  {
    id: 6,
    categoryName: "Meat Box",
    items: [
      { id: 601, name: "Regular", price: 10, url: meatBox },
      { id: 602, name: "Large", price: 12, url: meatBox },
    ]
  },
  {
    id: 7,
    categoryName: "Meat & Salad",
    items: [
      { id: 701, name: "Small", price: 10, url: meatAndSalad },
      { id: 702, name: "Regular", price: 12, url: meatAndSalad },
      { id: 703, name: "Large", price: 13, url: meatAndSalad },
    ]
  },
  {
    id: 8,
    categoryName: "Schnitzel's",
    items: [
      { id: 801, name: "Chicken Schnitzel", price: 10, url: schnitzel },
      { id: 802, name: "Chicken Parma", price: 12, url: schnitzel },
    ]
  },
  {
    id: 9,
    categoryName: "Salads",
    items: [
      { id: 901, name: "Garden Salad", price: 10, url: salads },
      { id: 902, name: "Greek Salad", price: 12, url: salads },
    ]
  },
  {
    id: 10,
    categoryName: "Milk shakes",
    items: [
      { id: 1001, name: "Chocolate", price: 10, url: milkshakes },
      { id: 1002, name: "Vanilla", price: 12, url: milkshakes },
      { id: 1003, name: "Strawberry", price: 13, url: milkshakes },
      { id: 1004, name: "Banana", price: 15, url: milkshakes },
      { id: 1005, name: "Caramel", price: 10, url: milkshakes },
      { id: 1006, name: "Blue Heaven", price: 12, url: milkshakes },
    ]
  },
  {
    id: 11,
    categoryName: "Deserts",
    items: [
      { id: 1101, name: "Baklava", price: 10, url: deserts },
      { id: 1102, name: "Turkish Delight", price: 12, url: deserts },
      { id: 1103, name: "Greek & Jam Donuts", price: 13, url: deserts },
    ]
  },
  {
    id: 12,
    categoryName: "Biryani",
    items: [
      { id: 1201, name: "Chicken Biryani", price: 10, url: biryani },
      { id: 1202, name: "Lamb Biryani", price: 12, url: biryani },
    ]
  }
];



export const contactDetails = [
  { id: 1, name: "Address", value: "Ballarat Central VIC, Australia" },
  { id: 2, name: "Phone", value: "0466832714" },
  { id: 3, name: "Email", value: "zestykebabs@gmail.com" },
  { id: 4, name: "Facebook", value: "https://www.facebook.com/people/Zestykebabs/61564518779884/" },
  { id: 5, name: "Instagram", value: "https://www.instagram.com/zesty_kebabs_/" },
]

export const footerItems = [
  { id: 1, name: "Email", value: "zestykebabs@gmail.com", icon: FaEnvelope },
  { id: 2, name: "Phone", value: "0466832714", icon: FaPhone },
  { id: 3, name: "Address", value: "Ballarat Central VIC, Australia", icon: FaLocationDot },
]