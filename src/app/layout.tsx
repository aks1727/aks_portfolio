// app/layout.js
import { Montserrat_Alternates } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat-alternates',
});

export const metadata = {
  title: {
    default: 'Akshat Kumar Sinha | Portfolio',
    template: '%s | Akshat Kumar Sinha',
  },
  description: 'Personal portfolio of Akshat Kumar Sinha showcasing web development projects, full-stack experience, and software engineering skills.',
  keywords: [
    'Akshat Kumar Sinha',
    'Portfolio',
    'Full Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Next.js',
    'React',
  ],
  authors: [{ name: 'Akshat Kumar Sinha' }],
  creator: 'Akshat Kumar Sinha',
  openGraph: {
    title: 'Akshat Kumar Sinha | Portfolio',
    description: 'Explore projects, experience, and skills of Akshat Kumar Sinha.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akshat Kumar Sinha | Portfolio',
    description: 'Explore projects, experience, and skills of Akshat Kumar Sinha.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative text-white bg-transparent">
        
        {/* Fixed Background Canvas: Pins to the viewport window */}
        <div 
          aria-hidden="true"
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none -z-50"
          style={{
            background: "radial-gradient(circle at top, #085195 10%, #03386a 30%, #070002 120%)",
          }}
        />

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}