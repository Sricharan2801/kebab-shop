import React from 'react'
import { contactDetails } from '../utils'
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa'

const Contact = () => {
    return (
        <section id='contact' className='w-full h-[100vh] flex lg:flex-row flex-col  pb-20 pt-10'>
            <div className='lg:w-[30%] w-[90%] h-full pb-10 flex flex-col  gap-8 '>
                <h1 className='text-4xl font-bold lg:pl-[15%] pl-[25%] text-yellow-600 lg:pt-24'>Get in touch</h1>
                <p className='lg:w-[80%] w-[100%] pl-[15%] font-normal text-balance'>
                    Craving the best kababs in town? Reach out to us for orders, menu inquiries, or any special requests. We're here to serve you!
                </p>
            </div>

            <div className='lg:w-[70%] w-[100%] h-full flex flex-wrap gap-8 lg:flex-row lg:justify-around items-center flex-col'>
                {
                    contactDetails.map((item) => (
                        <div key={item.id} className='lg:w-[40%] w-[80%] h-[8rem] rounded-lg bg-slate-100 flex items-center justify-between px-8 py-4'>
                            <div>
                                <h1 className='text-xl font-bold'>{item.name}</h1>
                                <div className="flex items-center gap-2 pt-2">
                                    {item.name === "Phone" && (
                                        <FaPhoneAlt className="text-2xl text-blue-600" />
                                    )}
                                    {item.name === "Email" && (
                                        <FaEnvelope className="text-2xl text-blue-600" />
                                    )}
                                    {item.name === "Facebook" && (
                                        <FaFacebook className="text-2xl text-blue-600" />
                                    )}
                                    {item.name === "Instagram" && (
                                        <FaInstagram className="text-2xl text-blue-600" />
                                    )}
                                    {/* For Address, just display the address value */}
                                    {item.name === "Address" ? (
                                        <p className='font-semibold text-blue-600 '>{item.value}</p>
                                    ) : (
                                        <a
                                            href={item.name === "Phone" ? `tel:${item.value}` : item.value}
                                            className='font-semibold text-blue-600 hover:underline ml-2'
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.name === "Phone" ? item.value : item.name === "Email" ? item.value : 'Visit'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Contact
