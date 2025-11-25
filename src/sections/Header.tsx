import {useState} from 'react';
import logo from "@/assets/logo.png"
import profileImg from "@/assets/profile.svg";
import MobileMenu from '../components/MobileMenu.tsx';

export default function Header() {
	const [isLogin] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const toggleMobileMenu = () => {
		document.querySelector(".arrow")?.classList.toggle("arrow--right");
		setIsMobileMenuOpen(!isMobileMenuOpen);
	}
	const openModal = () => {
		document.querySelector(".arrow")?.classList.remove("arrow--right");
		setIsMobileMenuOpen(false);
		setIsModalOpen(true);
		document.body.classList.toggle("no-scroll")
	}
	
	return (
		<>
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
						{!isLogin && <button type="button" className="auth__btn">Sign up</button>}
						<img
							className="auth__img"
							src={profileImg}
							alt="Profile button"
						/>
					</div>
					<button className="header__menu-btn" onClick={toggleMobileMenu}>
						Menu <div className="arrow"></div>
					</button>
				</div>
			</header>
			
			 <MobileMenu avatar={profileImg} isOpen={isMobileMenuOpen} openModal={openModal} />
			
			{isModalOpen && <div className="overlay">
				<div className="modal">
					<button className="close-btn" onClick={() => setIsModalOpen(false)} aria-label="Закрыть">
						✕
					</button>
					<h2 className="modal__title">Sign up</h2>
					<form className="modal__form">
						<label className="modal__label" htmlFor="username">
							Username
							<input
								type="text"
								className="modal__input"
								placeholder="Username"
								name="username"
								id="username"
							/>
						</label>
						<label className="modal__label" htmlFor="email">
							E-Mail
							<input
								type="email"
								className="modal__input"
								placeholder="E-Mail"
								name="email"
								id="email"
							/>
						</label>
						<label className="modal__label" htmlFor="password">
							Password
							<input
								type="password"
								className="modal__input"
								placeholder="Password"
								name="password"
								id="password"
							/>
						</label>
						<button type="submit" className="modal__btn">Sign up</button>
					</form>
					<p className="modal__text">
						Already have an account?
						<a href="#">Log In</a>
					</p>
				</div>
			</div>}
		</>
	)
}