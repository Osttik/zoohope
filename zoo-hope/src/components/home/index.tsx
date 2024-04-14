import Donate from "../donate";
import dog from "../../images/homePage/dog.png";
import "../../styles/index.scss";
import { Translate } from "../translation";
import { useTranslation } from "react-i18next";
import { data } from "../../data/homePage";

export default function Home() {
	const { i18n } = useTranslation();


	return (
		<>
			<section className="hero">
				<div className="container">
					<div className="text">
						<h1>Врятуйте тварин від війни</h1>
						<h2>Тварини - живі істоти і вони також потребують підтримки</h2>
					</div>
					<div className="donate">
						<Donate />
					</div>
					<img className="dog" src={dog} alt="dog" />
				</div>
			</section>

			<section className="aboutUsSection">
				{
					data.map((el, key) => (
						<div key={key} className="container">
							<div className="img">
								<img alt="animal" src={el.img} />
								<span className="circle" style={{ backgroundColor: `rgba(${57 + key * 50}, ${184 - key * 80}, ${255 + (key * 50) * ((-1) ** key)}, 1)` }}></span>
							</div>
							<div className="text">
								<h1>{Translate(el.title)}</h1>
								{
									el.description[i18n.language as "en" | "ua"].map((text, key) => (
										<p key={key}>{text}</p>
									))
								}
							</div>
						</div>
					))
				}
			</section>

			<section className="reportSection">
				<div className="container">
					<div className="text">
						<h1>ЗВІТНІСТЬ</h1>
						<h2>Наша робота за 2023 рік:</h2>
					</div>
					<div className="report">
						<div>
							<h1>140</h1>
							<h2>тварин підібрано</h2>
						</div>
						<div>
							<h1>250</h1>
							<h2>тварин вакціновано</h2>
						</div>
						<div>
							<h1>349</h1>
							<h2>тварин вилікувано</h2>
						</div>
						<div>
							<h1>175</h1>
							<h2>тварин знайшли дім</h2>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}