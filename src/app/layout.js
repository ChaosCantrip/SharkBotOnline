
import "@styles/master.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
            {children}
            </body>
        </html>
    )
}
