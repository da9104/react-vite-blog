import { Outlet, } from "react-router-dom";
import Header from './Header'

function Layout () {
    return (
        <>
        <header>
            <Header />
        </header>
      <main>
        {/* 2️⃣ Render the app routes via the Layout Outlet */}
        <Outlet />
      </main>
      <footer></footer>
    </>
    )
}

export default Layout