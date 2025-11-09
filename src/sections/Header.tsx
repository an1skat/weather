import {useState} from 'react';
import logo from "@/assets/logo.png"
import profileImg from "@/assets/profile.svg";

export default function Header() {
	const [isLogin, setIsLogin] = useState(false);
	let profile;
	
	return (
		<header className="header">
			<div className="container">
				<div className="header__container">
					<img
						className="header__logo"
						src={logo}
						alt="logo"
					/>
					<nav className="nav">
						<ul className="nav-list">
							<li className="nav-list__item">Who we are</li>
							<li className="nav-list__item">Contacts</li>
							<li className="nav-list__item">Menu</li>
						</ul>
					</nav>
				</div>
				<div className="auth__container">
					{isLogin && <button type="button" className="auth__btn">Sign up</button>}
					<img
						className="auth__img"
						src={profileImg}
						alt="Profile button"
					/>
				</div>
				<button className="header__menu-btn">
					Menu <div className="arrow"></div>
				</button>
			</div>
		</header>
	)
}