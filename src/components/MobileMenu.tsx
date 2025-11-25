interface Props {
	avatar: string,
	isOpen: boolean,
	openModal: () => void;
}

export default function MobileMenu({avatar, isOpen, openModal}: Props) {
	return (
		<div className={isOpen ? "overlay" : ""}>
			<div className={`mobile-menu ${isOpen ? "open" : ""}`}>
				<ul className="mobile-menu__list">
					<li className="mobile-menu__item">Who we are</li>
					<li className="mobile-menu__item">Contacts</li>
					<li className="mobile-menu__item">Menu</li>
				</ul>
				<div className="mobile-menu__container">
					<img
						src={avatar}
						alt="Avatar"
						className="avatar"
					/>
					<button onClick={openModal} className="auth__btn">Sign up</button>
				</div>
			</div>
		</div>
	);
}