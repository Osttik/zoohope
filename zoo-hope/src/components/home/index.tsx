import Donate from "../donate";
import dog from "../../images/homePage/dog.png";
import "../../styles/index.scss";
import { Translate } from "../translation";
import { useTranslation } from "react-i18next";
import { data } from "../../data/homePage";
import { useContext, useEffect, useState } from "react";
import PetContext from "../../PetsContext";
import { IPet } from "../../define";
import { PetCard } from "../pet-list/petCard/petCard";
import { Link } from "react-router-dom";

export default function Home() {
	const { t, i18n } = useTranslation();
	const pets_data: IPet[] = useContext(PetContext);
	const [totalLength, setTotalLength] = useState<number>() // Total length of array of all pets
	const [getPets, setPets] = useState<IPet[]>()

	const getFirstPets = async () => {
		try {
			let allPets = pets_data;

			let ceiling = 9

			if (window.screen.width > 780 && window.screen.width < 1150) {
				ceiling = 6
			}
			if (window.screen.width < 780) {
				ceiling = 3
			}

			let pageApplied = allPets.reverse().slice(0, ceiling);

			setTotalLength(allPets.length);
			setPets(pageApplied);
		} catch {
			setPets([]);
			console.log("Fetch error");
		}

	}

	useEffect(() => {
		getFirstPets()
	}, [pets_data])

	if (!getPets) {
		return <></>
	}

	return (
		<div className="homePage">
			<section className="hero">
				<div className="box">
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
						<div key={key} className="box">
							<div className="img">
								<img alt="animal" src={el.img} />
								<span className="circle" style={{ backgroundColor: `rgba(${57 + key * 50}, ${184 - key * 80}, ${255 + (key * 50) * ((-1) ** key)}, 1)` }}></span>
							</div>
							<div className="text">
								<h1><Translate obj={el.title} /></h1>
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
				<div className="box">
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

			<section className="petListSection">
				<h1>Шукають дім</h1>
				<div className="petList">
					{getPets.length ?
						getPets.map(el => {
							return (
								<PetCard key={el._id} animalInfo={el} />
							)
						}) :
						<div className="notFound">
							<p className="notFoundTitle">{t('nothing_found')}</p>
							<p className="notFoundDescription">{totalLength ? t('change_filters') : t('mb_no_pets')}</p>
						</div>

					}
				</div>
				<Link to={"/petList"}>Більше Тваринок</Link>
			</section>
		</div>
	);
}