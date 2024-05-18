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
import { ReactComponent as LinkIcon } from "../../images/homePage/arrow-up-right-from-square-solid.svg";
import { ReactComponent as DogIcon } from "../../images/homePage/pomeranian-svgrepo-com.svg";
import donateIcon from "../../images/homePage/donate-icon.png"
import { ReactComponent as PawIcon } from "../../images/homePage/noun-paw.svg";
import { Question } from "./question";
import { IHelpfulInfo } from "../../define";
import { getAllHelpfulInfo } from "../../api/helpfulInfo";
import { Link as ScrollLink, Element } from 'react-scroll';

export default function Home() {
	const { t, i18n } = useTranslation();
	const { pets_data } = useContext(PetContext);
	const [totalLength, setTotalLength] = useState<number>();
	const [getPets, setPets] = useState<IPet[]>();
	const [questions, setQuestions] = useState<IHelpfulInfo[]>([]);

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
			console.error("Fetch error");
		}

	}

	useEffect(() => {
		getAllHelpfulInfo().then(setQuestions);
	}, [])

	useEffect(() => {
		getFirstPets()
	}, [pets_data])

	if (!getPets) {
		return <></>
	}
	return (
		<div className="homePage">
			<section className="hero">
				{/* <div className="box">
					<div className="text">
						<h1>{t('homePageTitle')}</h1>
						<h2>{t('homePage_sub_title')}</h2>
					</div>
					<div className="donate">
						<Donate />
					</div>
					<img className="dog" src={dog} alt="dog" />
				</div> */}

				<div className="hero__container">
					<div className="hero__content">
						<div className="hero__text">
							<h1>{t('homePageTitle')}</h1>
							<p>{t('homePage_sub_title')}</p>
						</div>

						<img className="dog" src={dog} alt="dog" />
					</div>

					<div className="hero__donate">
						<Donate />
					</div>
				</div>
			</section>

			<section className="aboutUsSection">
				<div className="about-us__navigation">
					<h2>{t('about-us')}</h2>
					<div className="about-us__btns">
						<ScrollLink to="who_are_we?" smooth={true} duration={100}>
							<button>{t('who_we_are')}</button>
						</ScrollLink>
						<ScrollLink to="our_story" smooth={true} duration={100}>
							<button>{t('our_story')}</button>
						</ScrollLink>
						<ScrollLink to="why_are_we_doing_this?" smooth={true} duration={100}>
							<button>{t('our_mission')}</button>
						</ScrollLink>
					</div>
				</div>

				<div className="about-us__content">
					{data.map((el, key) => (
						<Element name={el.title.en.replace(/\s+/g, '_').toLowerCase()} key={key} className="box">
							<div className="img">
								<img alt="animal" src={el.img} />
								<span className="circle" style={{ backgroundColor: key === 1 ? 'rgb(255, 214, 0)' : `rgba(${57 + key * 50}, ${184 - key * 80}, ${255 + (key * 50) * ((-1) ** key)}, 1)` }}></span>
							</div>
							<div className="text">
								<h1><Translate obj={el.title} /></h1>
								{el.description[i18n.language as "en" | "ua"].map((text, key) => (
									<p key={key}>{text}</p>
								))}
							</div>
						</Element>
					))}
				</div>
			</section>

			<section className="support">
				<div className="support__container">
					<div className="support__text">
						<h1 className="support__title">{t('how_support_shelter')}</h1>
						<p className="support__caption">{t('help_us_become_better')}</p>
					</div>

					<div className="support__content">
						<div className="support__card">
							<h1 className="support__card-title">{t('adopt_pet_card')}</h1>
							<Link to={'/petList'} className="support__card-link">{t('learn_more_link')} <LinkIcon className="card-link-icon" /></Link>

							<div className="support-card__circle">
								<DogIcon className="support-card__circle-icon dog" />
							</div>
						</div>

						<div className="support__card">
							<h1 className="support__card-title">{t('make_donation_card')}</h1>
							<Link to={'https://send.monobank.ua/jar/BhQbi8BR8?fbclid=IwAR04yzp55zkm1xeE9D0UD5mYfiPAc7X8mBvWJk2VpCYU1N_uRkOgomVj04E'} className="support__card-link">{t('learn_more_link')} <LinkIcon className="card-link-icon" /></Link>

							<div className="support-card__circle">
								<img className="support-card__circle-icon donate" src={donateIcon} alt="icon" />
							</div>
						</div>

						<div className="support__card">
							<h1 className="support__card-title">{t('other_options_card')}</h1>
							<Link to={'/helpUs'} className="support__card-link">{t('learn_more_link')} <LinkIcon className="card-link-icon" /></Link>

							<div className="support-card__circle">
								<PawIcon className="support-card__circle-icon paw" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="petListSection">
				<h1>{t('looking-for-home')}</h1>
				<p className="pet-list-caption">Оберіть свого майбутнього друга та подаруйте йому щасливе життя!</p>
				<div className="petList">
					{getPets.length ?
						getPets.map((el, i) => {
							return (
								<PetCard key={i} animalInfo={el} />
							)
						}) :
						<div className="notFound">
							<p className="notFoundTitle">{t('nothing_found')}</p>
							<p className="notFoundDescription">{totalLength ? t('change_filters') : t('mb_no_pets')}</p>
						</div>

					}
				</div>
				<Link to={"/petList"}>{t('more-animals')}</Link>
			</section>

			<section className="info">
				<div className="info__container">
					<div className="info__text">
						<h1 className="info__title">{t('helpful_info')}</h1>
						<p className="info__caption">{t('helpful_info_caption')}</p>
					</div>

					<div className="info__content">
						{questions.slice(0, 3).map((question: IHelpfulInfo, index: number) => {
							let circleClass = '';

							if (index === 0) {
								circleClass = 'blue';

							} else if (index === 1) {
								circleClass = 'purple';

							} else if (index === 2) {
								circleClass = 'yellow';
							}
							return (
								<Question
									key={index}
									data={question}
									circleClass={circleClass}
								/>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
}