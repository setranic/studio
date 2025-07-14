import Link from 'next/link';

const WhatsAppIcon = () => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="h-8 w-8 text-white"
        preserveAspectRatio="xMidYMid meet"
        fill="currentColor"
    >
        <path d="M16.003 4.482c-6.397 0-11.583 5.187-11.583 11.583 0 2.83.993 5.49 2.806 7.54l-1.63 5.942 6.11-1.603a11.53 11.53 0 005.295 1.34h.002c6.397 0 11.585-5.187 11.585-11.584S22.4 4.482 16.003 4.482zm0 21.362h-.002a9.715 9.715 0 01-4.99-1.424l-.356-.212-3.702.97 1.002-3.593-.232-.364a9.72 9.72 0 01-1.52-5.132c0-5.385 4.368-9.752 9.752-9.752s9.752 4.367 9.752 9.752-4.368 9.752-9.752 9.752zm5.24-6.525c-.282-.142-1.66-0.82-1.916-.914s-.442-.142-.628.142c-.186.282-.725.914-.89 1.1s-.33.186-.613.044c-1.62-0.58-2.76-1.55-3.882-3.322-.243-.396-.06-.59.123-.77.164-.16.33-.283.496-.47.165-.187.22-.33.33-.56.11-.22.056-.426-.028-.568s-.628-1.512-.86-2.07c-.22-.53-.442-.458-.613-.458-.17 0-.376-.014-.58-.014s-.54.07-.824.354c-.282.282-1.094 1.065-1.094 2.592s1.122 3.012 1.264 3.228c.142.214 2.19 3.475 5.3 4.71.74.292 1.32.466 1.77.596.7.197 1.34.167 1.84-.085.57-.282 1.66-.678 1.894-1.34.234-.66.234-1.225.165-1.34-.07-.12-.282-.186-.565-.328z" />
    </svg>
);

export default function WhatsAppButton() {
    // Reemplaza este número por tu número de teléfono real, incluyendo el código de país (sin el '+', espacios o guiones).
    const phoneNumber = "50575301222"; 
    const whatsappLink = `https://wa.me/${phoneNumber}`;

    return (
        <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-all duration-300 transform hover:scale-110"
            aria-label="Contact us on WhatsApp"
        >
            <WhatsAppIcon />
        </Link>
    );
}
