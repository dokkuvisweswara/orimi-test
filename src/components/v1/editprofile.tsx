'use client'
import React, { useState } from 'react';
import {profileUpdate} from '@/services/actions/user.actions'
import { getAccessTokenObj } from '@/services/helpers/init.helper';

export function EditProfile(props: any) {
    const { subscriberInfo } = props;
    const [name, setName] = useState(subscriberInfo.subscribername);
    const handleSubmit = (e:any) => {
        e.preventDefault();
    
        const payload = {
            subscribername: name, // Use the updated name from the state
            profileid: subscriberInfo.profileid
        };
    
        profileUpdate(payload,getAccessTokenObj())
            .then(() => {
                // Handle successful update
            })
            .catch((error) => {
                // Handle errors
            });
    };
    
    return (
        <div className="flex items-center justify-center p-12">
            <div className=" ">
            <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#ffffff]">
                            {props?.lang?.Full_Name}
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            value={name}
                            className="w-full rounded-md border border-[#e0e0e0] bg-primaryColor py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-rose-400 focus:shadow-sm"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#ffffff]">
                        {props?.lang?.Phone_Number}
                        </label>
                        <input type="text" name="phone" id="phone" placeholder="Enter your phone number"
                            className="w-full rounded-md border border-[#e0e0e0] bg-primaryColor py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-rose-400 focus:shadow-sm" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block text-base font-medium text-[#ffffff]">
                             {props?.lang?.Email_Address}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-primaryColor py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-rose-400 focus:shadow-sm"
                            value={subscriberInfo.email} // Pre-fill email
                        />
                    </div>
                    {/* <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 ">
                            <div className="mb-5">
                                <label htmlFor="date" className=" text-base font-medium text-[#ffffff]">
                                    DOB
                                </label>
                                <input type="date" name="date" id="date"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>
                        </div>
                    </div> */}
                    <div>
                        <button
                         type="submit"    
                        className="hover:shadow-form w-full rounded-md bg-selectedBGPrimaryColor py-3 px-8 text-center text-base font-semibold text-primaryColor outline-none">
                            {props?.lang?.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
