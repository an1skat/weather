import { useAuth } from "@/context/AuthContext";
import Modal from "../components/Modal.tsx";
import { useState } from "react";
import logo from "@/assets/logo.png";
import profileImg from "@/assets/profile.svg";
import MobileMenu from "../components/MobileMenu.tsx";

export default function Header() {
	const { isLogin, user, logout } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const toggleMobileMenu = () => {
		document.querySelector(".arrow")?.classList.toggle("arrow--right");
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};
	
	const openModal = () => {
		document.querySelector(".arrow")?.classList.remove("arrow--right");
		setIsMobileMenuOpen(false);
		setIsModalOpen(true);
		document.body.classList.add("no-scroll");
	};
	
	const closeModal = () => {
		setIsModalOpen(false);
		document.body.classList.remove("no-scroll");
	};
	
	return (
		<>
			<header className="header">
				<div className="container">
					<div className="header__container">
						<img className="header__logo" src={logo} alt="logo" />
						
						<nav className="nav">
							<ul className="nav-list">
								<li className="nav-list__item">Who we are</li>
								<li className="nav-list__item">Contacts</li>
								<li className="nav-list__item">Menu</li>
							</ul>
						</nav>
					</div>
					
					<div className="auth__container">
						{!isLogin ? (
							<button className="auth__btn" onClick={openModal}>
								Sign up
							</button>
						) : (
							<>
								<span>{user?.name}</span>
								<button className="auth__btn" onClick={logout}>Logout</button>
							</>
						)}
						<img className="auth__img" src={profileImg} alt="Profile" />
					</div>
					
					<button className="header__menu-btn" onClick={toggleMobileMenu}>
						Menu <div className="arrow"></div>
					</button>
				</div>
			</header>
			
			<MobileMenu avatar={profileImg} isOpen={isMobileMenuOpen} openModal={openModal} />
			
			<Modal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}
