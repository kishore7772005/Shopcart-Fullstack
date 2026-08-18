// assets/Asset.js
import imgBase from "./DealsImages/Basecamp.png";
import imgHome from "./DealsImages/Homepod.png";
import imgMini from "./DealsImages/Mini.png";

export const products = [
  {
    id: 1,
    title: "HomePod mini",
    price: 239.0,       // number, no "$"
    img: imgHome,
    desc: "Table with air purifier, stained veneer/black",
  },
  {
    id: 2,
    title: "Instax Mini 9",
    price: 99.0,
    img: imgMini,
    desc: "Selfie mode and selfie mirror, Macro mode",
  },
  {
    id: 3,
    title: "Base Camp Duffel M",
    price: 159.0,
    img: imgBase,
    desc: "Durable travel duffel, multi-pocket",
  },
];

export default { products };


import pp1 from "./PopularImages/Pp1.png";
import pp2 from "./PopularImages/Pp2.png";
import pp3 from "./PopularImages/Pp3.png"

export const popularProducts = [
	{
		title: 'Gaming Headphone',
		price: '$239.00',
		img: pp1,
		desc: 'Table with air purifier, stained veneer/black',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Base Camp Duffel M',
		price: '$159.00',
		img: imgBase,
		desc: 'Table with air purifier, stained veneer/black',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Tomford Watch',
		price: '$39.00',
		img: pp3,
		desc: 'Table with air purifier, stained veneer/black',
		ratingCount: 121,
		btnText: 'Add to Cart'
	}
];

// Best products for "Today's Best Deals" section
import bp1 from "./BestProduct/P1.png";
import bp2 from "./BestProduct/P2.png";
import bp3 from "./BestProduct/P3.png";
import bp4 from "./BestProduct/P4.png";
import bp5 from "./BestProduct/P5.png";
import bp6 from "./BestProduct/P6.png";
import bp7 from "./BestProduct/P7.png";
import bp8 from "./BestProduct/P8.png";

export const bestProducts = [
	{
		title: 'Laptop sleeve MacBook',
		price: '59.00',
		img: bp1,
		desc: 'Organic Cotton, fairtrade certified',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'AirPods Max',
		price: '559.00',
		img: bp2,
		desc: 'A perfect balance of high-fidelity audio',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Flower Laptop Sleeve',
		price: '39.00',
		img: bp3,
		desc: '15 in. x 10 in. -Flap top closure',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Supreme Water Bottle',
		price: '19.00',
		img: bp4,
		desc: 'Table with air purifier, stained veneer/black',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Laptop sleeve MacBook',
		price: '59.00',
		img: bp5,
		desc: 'Organic Cotton, fairtrade certified',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Macbook pro 13"',
		price: '1099.00',
		img: bp6,
		desc: '256, 8 core GPU, 8 GB',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'HomePod mini',
		price: '59.00',
		img: bp7,
		desc: '5 Colors Available',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Ipad Mini',
		price: '539.00',
		img: bp8,
		desc: 'Table with air purifier, stained veneer/black',
		ratingCount: 121,
		btnText: 'Add to Cart'
	}
];

// Selling products (Most Selling Products)
import s1 from "./SellingImages/S1.png";
import s2 from "./SellingImages/S2.png";
import s3 from "./SellingImages/S3.png";

export const sellingProducts = [
	{
		title: 'Instax Mini 11',
		price: '$89.00',
		img: s1,
		desc: 'Selfie mode and selfie mirror, Macro mode',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'Hand Watch',
		price: '$59.00',
		img: s2,
		desc: 'Citizen 650M, W-69g',
		ratingCount: 121,
		btnText: 'Add to Cart'
	},
	{
		title: 'adidas Sneakers',
		price: '$159.00',
		img: s3,
		desc: 'x Sean Wotherspoon Superstar sneakers',
		ratingCount: 121,
		btnText: 'Add to Cart'
	}
];

// Trending products / hero cards
import t1 from "./Trending/T1.png";
import t2 from "./Trending/T2.png";

export const trendingProducts = [
	{
		title: 'Furniture Village',
		subtitle: 'Delivery with in 24 hours',
		img: t1,
		btnText: 'Shop Now'
	},
	{
		title: 'Fashion World',
		subtitle: 'Delivery with in 24 hours',
		img: t2,
		btnText: 'Shop Now'
	}
];

// Best selling store images/data
import bs1 from "./BestSellingImages/BS1.png";
import bs2 from "./BestSellingImages/BS2.png";
import bs3 from "./BestSellingImages/BS3.png";
import bs4 from "./BestSellingImages/BS4.png";

export const bestSelling = [
	{
		title: 'Staples',
		subtitle: 'Bag • Perfume',
		img: bs1,
		note: 'Delivery with in 24 hours',
		badge: 'Staples'
	},
	{
		title: 'Now Delivery',
		subtitle: 'Bag • Perfume',
		img: bs2,
		note: 'Delivery with in 24 hours',
		badge: 'Now'
	},
	{
		title: 'Bevmo',
		subtitle: 'Bag • Perfume',
		img: bs3,
		note: 'Delivery with in 24 hours',
		badge: 'Bevmo'
	}
	,
  {
    title: 'Quicklly',
    subtitle: 'Bag • Perfume',
    img: bs4,
    note: 'Delivery with in 24 hours',
    badge: 'Q'
  }
];

// Services
import svc1 from "./ServiceImages/Service1.png";
import svc2 from "./ServiceImages/Service2.png";
import svc3 from "./ServiceImages/Service3.png";

export const services = [
  {
    title: 'Frequently Asked Questions',
    subtitle: 'Updates on safe Shopping in our Stores',
    img: svc1
  },
  {
    title: 'Online Payment Process',
    subtitle: 'Updates on safe Shopping in our Stores',
    img: svc2
  },
  {
    title: 'Home Delivery Options',
    subtitle: 'Updates on safe Shopping in our Stores',
    img: svc3
  }
];