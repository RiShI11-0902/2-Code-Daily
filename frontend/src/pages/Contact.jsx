import React from "react";
import Navbar from "./Navbar";

const ContactSection = () => {
    return (
        <>

            <Navbar />
            <section className=" min-h-screen bg-stone-950 text-white px-6 py-20">
                <div className="max-w-4xl mt-5 mx-auto bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-xl space-y-6">
                    <h2 className="text-3xl font-bold border-b border-white/20 pb-4 mb-4">📩 Contact Us</h2>

                    <p className="text-gray-200 text-lg">
                        We’d love to hear from you! Whether you have questions, feedback, or run into an issue — we're here to help.
                    </p>

                    <div className="space-y-4 text-base text-gray-300">
                        <div>
                            <span className="font-semibold text-white">📧 Email:</span>{" "}
                            <a
                                href="mailto:contact2codedaily@gmail.com"
                                className="text-[#A5B4FC] hover:underline"
                            >
                                contact2codedaily@gmail.com
                            </a>
                        </div>
                        <div>
                            <span className="font-semibold text-white">📍 Operational Address:</span>
                            <p className="text-[#A5B4FC] hover:underline">
                                Opp. Gadikhana Ground, Dhoble Gali, Model Mill Sq. Nagpur, Maharashtra, 440032
                            </p>
                        </div>
                        <div>
                            <span className="font-semibold text-white">🌐 Platform:</span>{" "}
                            Fully remote – Serving coders globally 🌍
                        </div>

                        <div>
                            <span className="font-semibold text-white">🧠 Extension Support:</span>{" "}
                            Facing issues or suggestions with our Chrome Extension? We’re all ears!
                        </div>

                        <div>
                            <span className="font-semibold text-white">⏰ Support Hours:</span>{" "}
                            Mon–Fri, 10:00 AM – 6:00 PM (IST)
                        </div>

                        <div>
                            <span className="font-semibold text-white">📌 Response Time:</span>{" "}
                            Typically within 24–48 business hours
                        </div>
                    </div>

                    <p className="mt-6 text-gray-300 italic">
                        Let’s build something amazing together — your feedback shapes 2CodeDaily’s future!
                    </p>
                </div>
            </section>
        </>

    );
};

export default ContactSection;
