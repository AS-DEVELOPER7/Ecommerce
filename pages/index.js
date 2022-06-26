import Head from "next/head";
import { client } from "../lib/client";
import { FooterBanner, HeroBanner, Product } from "../components";
const Home = ({ products, banner }) => {
  return (
  <>
      <div className="">
        {console.log(products)}
        <HeroBanner heroBanner={banner.length && banner[0]} />
        <div className="products-heading">
          <h2>Best Seller Products</h2>
          <p>speaker There are many variations passages</p>
        </div>
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <FooterBanner footerBanner={banner&&banner[0]}/>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await client.fetch(`*[_type=="product"]`);
  const banner = await client.fetch(`*[_type=="banner"]`);
  console.log(products);
  console.log(banner);
  return {
    props: {
      products,
      banner,
    },
  };
};
