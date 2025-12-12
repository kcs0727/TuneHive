import React, { useEffect, useState } from 'react'
import { UserData } from '../context/usercontext'
import { PaymentData } from '../context/paymentcontext';
import toast from 'react-hot-toast';

export default function Premium() {

    const { user } = UserData();
    const { payit } = PaymentData();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingPlan, setPendingPlan] = useState(null);
    const sampleCardNumber = "4718 6091 0820 4366";

    const handlePayment = async (plan) => {
        if (plan === "Free") payit(plan);
        else {
            setConfirmOpen(true);
            setPendingPlan(plan);
        }
    }

    const onConfirmProceed = async () => {
        await navigator.clipboard.writeText(sampleCardNumber);
        toast.success("Card number copied!");

        setConfirmOpen(false);
        await payit(pendingPlan);
        setPendingPlan(null);
    };
    
    const onCancel = () => {
        setConfirmOpen(false);
        setPendingPlan(null);
    };


    return (
        <div>
            <div className="text-center mt-2 md:my-4 max-w-[85vw] md:max-w-[70vw] mx-auto p-2 rounded-lg border-3 border-gray-900 bg-gray-800">
                <h2 className="text-lg md:text-xl font-bold">
                    Current Plan: <span className="text-[#38bdf8]">{user.plan}</span>
                </h2>
                {user.planExpiry && (
                    <p className="text-sm md:text-base text-gray-400">
                        Expires on: {new Date(user.planExpiry).toLocaleDateString()}
                    </p>
                )}
            </div>


            <div className="flex flex-wrap items-center justify-center gap-6 py-5">

                <div className="p-6 bg-gray-900 rounded-lg text-white w-80 shadow-lg">
                    <h3 className="text-xl font-bold">Free Plan</h3>
                    <div className="my-2">
                        <span className="text-4xl font-bold">₹0</span>
                        <span className="text-gray-300">/month</span>
                    </div>
                    <p className="text-gray-300 mb-6">Ideal for casual listeners starting out.</p>

                    <ul className="space-y-1.5 mb-6 text-sm">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Access to all public songs and albums</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Basic audio quality (128 kbps)</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Limited skips (5 per day)</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">No offline listening</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Standard streaming speed</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">No mobile app support</span>
                        </li>
                    </ul>

                    <button className="w-full py-2 px-4 bg-blue-500 rounded hover:bg-blue-600 transition-colors text-sm cursor-pointer" onClick={() => handlePayment("Free")}>
                        Get Started
                    </button>
                </div>

                <div className="p-6 bg-gray-900 rounded-lg text-white w-80 shadow-lg relative">
                    <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                    <h3 className="text-xl font-bold">Monthly Plan</h3>
                    <div className="my-2">
                        <span className="text-4xl font-bold">₹149</span>
                        <span className="text-gray-300">/month</span>
                    </div>
                    <p className="text-gray-300 mb-6">Ideal for ad-free experience.</p>

                    <ul className="space-y-1.5 mb-6 text-sm">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Ad-free uninterrupted streaming</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">High-quality audio (320 kbps)</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Download songs for offline playback</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Create and share custom playlists</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Early access to new albums</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Priority email support</span>
                        </li>
                    </ul>

                    <button className="w-full py-2 px-4 bg-blue-500 rounded hover:bg-blue-600 transition-colors text-sm cursor-pointer" onClick={() => handlePayment("Monthly")}>
                        Get Started
                    </button>
                </div>

                <div className="p-6 bg-gray-900 rounded-lg text-white w-80 shadow-lg">
                    <h3 className="text-xl font-bold">Yearly Plan</h3>
                    <div className="my-2">
                        <span className="text-4xl font-bold">₹1,499</span>
                        <span className="text-gray-300">/month</span>
                    </div>
                    <p className="text-gray-300 mb-6">Ideal for dedicated music lovers.</p>

                    <ul className="space-y-1.5 mb-6 text-sm">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Everything in Monthly Plan, plus:</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">2 months free (save 15%)</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Access to limited-edition albums</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">AI music recommendations</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Sync across multiple devices</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-400">Dedicated premium support channel</span>
                        </li>
                    </ul>

                    <button className="w-full py-2 px-4 bg-blue-500 rounded hover:bg-blue-600 transition-colors text-sm cursor-pointer" onClick={() => handlePayment("Yearly")}>
                        Get Started
                    </button>
                </div>

            </div>


            {confirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="max-w-lg w-full bg-white text-black text-sm rounded-lg p-3 md:p-6 shadow-lg border-2 border-blue-400" role="dialog" aria-modal="true">

                        <div className="bg-gray-50 rounded p-3 mb-4 flex flex-col gap-1">
                            <p className='font-medium text-center'>This payment does not involve real money.</p>
                            <hr className='text-gray-400 mb-1'/>
                            <p >You can use your <span className="font-medium">own card details</span> or use below <span className="font-medium">virtual card details</span></p>
                            <div>1. <span className="font-medium">Card number:</span> {sampleCardNumber}</div>
                            <div>2. Any random Future Expire date, 3 digit CVV, 4 digit OTP</div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={onConfirmProceed} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                                Copy & Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}