import Inst from "@/assets/instagram.svg";
import Fb from "@/assets/facebook.svg";
import Ws from "@/assets/whatsup.svg";
import logo from "@/assets/logo.png";

export const Footer = () => {
	return (
		<footer className="footer" id="footer">
			<div className="container">
				<div className="footer__wrapper">
					<img className="footer__logo" src={logo} alt="logo" />
					<div className="footer__wrap">
						<div>
							<h2 className="footer__title" >Address</h2>
							<a href="https://maps.app.goo.gl/azMYyCBvhG8EMtrNA" className="footer__link" target="_blank">
								Svobody str. 35 Kyiv <br /> Ukraine
							</a>
						</div>
						<div>
							<h2 className="footer__title">Contact us</h2>
							<ul className="footer__list">
								<li>
									<a href="https://www.instagram.com/" target="_blank">
										<img src={Inst} alt="inst" />
									</a>
								</li>
								<li>
									<a href="https://www.facebook.com/" target="_blank">
										<img src={Fb} alt="facebook" />
									</a>
								</li>
								<li>
									<a href="https://www.whatsapp.com/" target="_blank">
										<img src={Ws} alt="tt" />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};