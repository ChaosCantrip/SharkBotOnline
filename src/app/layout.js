
import "@styles/master.css";
import Header from "@components/Header";
import Footer from "@components/Footer";

export const metadata = {
    title: {
        template: "%s | SharkBot Online",
        default: "SharkBot Online"
    }
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
