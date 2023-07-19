/* eslint-disable @next/next/no-img-element */

// Importing the dependencies
import { useState } from "react";
import { ethers } from "ethers";
import { identiconTemplate } from "@/helpers";
import Link from "next/link";

// Define the Product component which takes in the id of the product and some functions to display notifications
const ProductDetails = ({product, quantity, setQuantity, purchase} : any) => {
    const [isModalVisible, setModalVisible] = useState(false);

    // Increase quantity of product to purchase
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    } 

    // Decrease quantity of product to purchase
    const decreaseQuantity = () => {
        setQuantity(quantity - 1);
    }

    // Convert Big price to readable price
    const readablePrice = Number(ethers.utils.formatEther(product.price.toString()));
  // Return the JSX for the product component
  return (
    <div className={"flex flex-row w-full justify-between"}>
        <button
          type="button"
          onClick={() => setModalVisible(true)}
          className="absolute bottom-0 bg-black h-[4rem] rounded-b-lg flex items-center w-full justify-center opacity-0 group-hover:opacity-100 transition"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalCenter"
        >
          <svg className="cursor-pointer  w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                </g>
            </svg>
        </button>

        {/* Modal */}
        {isModalVisible && (
          <div
            className="fixed z-40 overflow-y-auto top-0 w-full h-full left-0"
            id="modal"
          >
            <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
            </span>
            <div
                className="w-full lg:h-[45rem] lg:w-[80%] inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
            >
                <div className="p-2">
                    <div onClick={() => setModalVisible(false)} className="w-full flex justify-center lg:justify-end">
                        <svg className="w-10 h-10 cursor-pointer text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col">
                            <img src={product.image[0]} className="object-cover w-[20rem] lg:w-[40rem] h-[25rem] lg:h-[20rem]"/>
                            <div className="flex">
                                <img src={product.image[1]} className="object-cover w-[10rem] lg:w-[20rem] h-[15rem] lg:h-[20rem]"/>
                                <img src={product.image[2]} className="object-cover w-[10rem] lg:w-[20rem] h-[15rem] lg:h-[20rem]"/>
                            </div>
                        </div>
                        <div className="m-4 lg:ml-10 pt-10 font-serif text-center">
                            <p className="mb-4 flex items-center justify-center">  
                                <Link
                                    href={`https://explorer.celo.org/alfajores/address/${product.owner}`}
                                >
                                    {identiconTemplate(product.owner)}
                                </Link>
                            </p>
                            <p className="text-4xl">{product.name}</p>
                            <p className="mt-4 italic">{product.description}</p>
                            <div className="flex gap-4 justify-center items-center mt-6">
                                <div className="rounded-full bg-black text-white px-4 py-1">Sold: {product.sold}</div>
                                <div className="rounded-full bg-black text-white px-4 py-1">Available: {product.available}</div>
                            </div>
                            <p className="text-9xl mt-10 flex justify-center items-center">{readablePrice}<span className="text-4xl">cUSD</span></p>
                            <div className="flex justify-around items-center w-full mt-5">
                                <button onClick={decreaseQuantity} disabled={quantity == 1}>
                                    <svg className="w-6 h-6 cursor-pointer text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <div className="bg-black text-white rounded-full w-[13rem] h-[3rem] flex justify-center items-center text-4xl"><span className="text-sm">{readablePrice}cUSD x {quantity}</span>={readablePrice*quantity} <span className="text-[12px]">cUSD</span></div>
                                <button onClick={increaseQuantity} disabled={quantity == product.available}>
                                    <svg className="w-6 h-6 cursor-pointer text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-10">
                                {product.available > 0 ? 
                                <button onClick={purchase} className="relative w-full lg:w-[30rem] px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
                                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Purchase</span>
                                </button> :                                 
                                    <p className="w-full lg:w-[30rem] px-5 py-3 overflow-hidden font-medium text-white bg-red-300 border border-gray-100 rounded-lg shadow-inner ">Out of stock</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default ProductDetails;
