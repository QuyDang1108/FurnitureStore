import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";

const AddProduct = () => {
    const categories = [
        { id: 1, name: 'Table' },
        { id: 2, name: 'Chair' },
        { id: 3, name: 'Bed' },
        { id: 4, name: 'Light' },
        { id: 5, name: 'Kitchen' },
        { id: 6, name: 'Electric' },
    ];

    const [state, setState] = useState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: ""
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    
    const [images, setImages] = useState([])
    const [showImages, setShowImages] = useState([])
    const imageHandle = (e) => {
        const files = e.target.files
        
        if (files.length > 0) {
            setImages([...images, ...files])
            let imagesURL = []
            for (let i = 0; i < files.length; i++) {
                imagesURL.push({url: URL.createObjectURL(files[i])})
            }
            setShowImages([...showImages, ...imagesURL])
        }
    }

    const changeImage = (img, index) => {
        if (img) {
            let tempImages = images
            let tempShowImages = showImages

            tempImages[index] = img
            tempShowImages[index] = {url: URL.createObjectURL(img)}

            setImages([...tempImages])
            setShowImages([...tempShowImages])
        }
    }

    const removeImage = (i) => {
        const filterImage = images.filter((img,index) => index !== i)
        const filterImageUrl = showImages.filter((img, index) => index !== i )
        setImages(filterImage)
        setShowImages(filterImageUrl)
    }

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [allCategory, setAllCategory] = useState(categories);
    const [searchValue, setSearchValue] = useState('');

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value)

        if (value === '') {
            setAllCategory(categories)
        } else {
            setAllCategory(categories.filter(cate => cate.name.toLowerCase().indexOf(value.toLowerCase()) !== -1))
        }
    };

    return (
        <div className="px-2 lg:px-7 pt-5">
            <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
                <div className="flex justify-between items-center pb-4">
                    <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
                    <Link className="bg-green-500 hover:shadow-green-500/50 hover:shadow-lg 
                                    text-white rounded-sm px-7 py-2 my-2">
                        Add Product
                    </Link>
                </div>
                <div>
                    <form>
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="name">Product Name</label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                            bg-[#6a5fdf] border border-slate-700 rounded-md 
                                            text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={state.name}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Product Name"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="brand">Product Brand</label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={state.brand}
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    placeholder="Brand Name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
                            <div className="flex flex-col w-full gap-1 relative">
                                <label htmlFor="category">Category</label>
                                <input
                                    readOnly
                                    onClick={() => setCateShow(!cateShow)}
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                    value={category}
                                    type="text"
                                    id="category"
                                    placeholder="-- Select Category --"
                                />
                                <div className={`absolute top-[101%] bg-[#475569] w-full 
                                    transition-all ${cateShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className="w-full px-4 py-2 fixed">
                                        <input
                                            onChange={categorySearch}
                                            value={searchValue}
                                            className="px-3 py-1 w-full focus:border-indigo-700 
                                            outline-none bg-transparent border border-slate-700 
                                            rounded-md text-[#d0d2d6]"
                                            type="text"
                                            placeholder="Search"
                                        />
                                    </div>
                                    <div className="pt-14"></div>
                                    <div className="flex justify-start items-start flex-col h-[200px] 
                                    overflow-scroll">
                                        {allCategory.map((c, i) => (
                                            <span
                                            className={`px-4 py-2 hover:bg-indigo-700 
                                                hover:text-white hover:shadow-lg w-full cursor-pointer 
                                                ${category === c.name && 'bg-indigo-500'}`}
                                                key={i}
                                                onClick={() => {
                                                    console.log("Click")
                                                    setCateShow(false);
                                                    setCategory(c.name);
                                                    setSearchValue('');
                                                    setAllCategory(categories);
                                                }}
                                            >
                                                {c.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="stock">Product Stock</label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={state.stock}
                                    type="text"
                                    name="stock"
                                    id="stock"
                                    placeholder="Stock"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="price">Price</label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={state.price}
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="discount">Discount</label>
                                <input
                                    className="px-4 py-2 focus:border-indigo-700 outline-none 
                                    bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                    onChange={inputHandle}
                                    value={state.discount}
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    placeholder="% Discount"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-full gap-1 text-[#d0d2d6]">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                className="px-4 py-2 focus:border-indigo-700 outline-none 
                                bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                                onChange={inputHandle}
                                value={state.description}
                                type="number"
                                name="description"
                                id="description"
                                placeholder="Description">

                                </textarea>
                        </div>

                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 
                            sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] my-4'>

                            {
                                showImages.map((img, i) => <div key={i} className='h-[180px] relative'>
                                    <label htmlFor={i}>
                                        <img className='w-full h-full rounded-sm' src={img.url} alt="" />
                                    </label>
                                    <input onChange={(e) => changeImage(e.target.files[0], i)} type="file" id={i} hidden/>
                                    <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 
                                    hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 
                                    rounded-full'><IoMdCloseCircle /></span>
                                </div>)
                            }

                            <label className='flex justify-center items-center flex-col h-[180px] 
                            cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]' 
                                htmlFor="image">
                                
                                <span><IoMdImages /></span>

                            </label>

                            <input 
                                className='hidden'
                                onChange={imageHandle}
                                multiple type="file" name="image" id="image" />
                        </div>

                        <div className='flex'>
                            <button className='bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white 
                            rounded-md px-7 py-2 my-2'>Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
