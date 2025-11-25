import {useAuth} from '@/context/AuthContext.tsx';

interface Props {
	avatar: string,
	isOpen: boolean,
	openModal: () => void;
}

export default function MobileMenu({avatar, isOpen, openModal}: Props) {
	const {isLogin, user, logout} = useAuth();
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
					{!isLogin ? (
						<button className="auth__btn" onClick={openModal}>
							Sign up
						</button>
					) : (
						<>
							<span style={{fontSize: "12px"}}>{user?.name}</span>
							<button className="auth__btn" onClick={logout}>Logout</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}