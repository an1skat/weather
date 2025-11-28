import { useAuth } from "@/context/AuthContext";
import api from "@/axiosInstance";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default function Modal({ isOpen, onClose }: Props) {
	const { login } = useAuth();
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		const form = e.currentTarget;
		const formData = Object.fromEntries(new FormData(form));
		
		try {
			const res = await api.post("/auth", formData);
			const { user, accessToken } = res.data;
			
			login(user, accessToken);
			onClose();
		} catch (err) {
			console.error(err.response.data.message);
		}
	};
	
	return (
		<div className={isOpen ? "overlay" : "hidden"}>
			<div className="modal">
				<button className="close-btn" onClick={onClose} aria-label="Закрыть">
					✕
				</button>
				
				<h2 className="modal__title">Sign up</h2>
				
				<form onSubmit={handleSubmit} className="modal__form">
					<label className="modal__label">
						Username
						<input name="name" type="text" className="modal__input" placeholder="Username" />
					</label>
					
					<label className="modal__label">
						E-Mail
						<input name="email" type="email" className="modal__input" placeholder="E-Mail" />
					</label>
					
					<label className="modal__label">
						Password
						<input name="password" type="password" className="modal__input" placeholder="Password" />
					</label>
					
					<button type="submit" className="modal__btn">
						Sign up
					</button>
				</form>
			</div>
		</div>
	);
}
