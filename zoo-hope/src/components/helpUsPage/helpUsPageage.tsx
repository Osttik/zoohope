import { Link } from "react-router-dom"
import "../../styles/helpUsPage/helpUsPage.scss"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { apiGetAllHelpOptions } from "../../api/helpOptions";
import { IHelpOption } from "../../define";
import { links } from "../../data/helpUsPage";
import { Translate } from "../translation";

interface IHelpOptionsArr extends Array<IHelpOption> { }

export const HelpUsPage = () => {
  const { t, i18n } = useTranslation();
  const [helpOptions, setHelpOptions] = useState<IHelpOptionsArr>()


  // For testing

  // const test: IHelpOptionsArr = [
  //   {
  //     name: {
  //       ua: 'Способи допомоги тваринкам',
  //       en: 'Ways to help animals',
  //     },
  //     description: {
  //       ua: 'У світі існує безліч способів, якими ми можемо допомогти нашим пухнастим друзям. Одним з найефективніших методів є прихисток бездомних тварин. Відкриття та підтримка притулків для тварин дозволяє забезпечити їм тимчасовий чи постійний притулок, харчування та медичний догляд. Багато з цих тварин шукають лише любов і турботу, яку ми можемо надати. Іншим способом є спонсорство тварин у притулках або на фермах, де їх утримують. Це допомагає забезпечити фінансову підтримку для їхнього утримання та лікування. Крім цього, поширення усвідомлення про важливість захисту тварин може стимулювати людей приймати відповідальні рішення стосовно їхнього ставлення до тварин та їхнього середовища.',
  //       en: 'There are many ways in the world that we can help our furry friends. One of the most effective methods is a shelter for homeless animals. Opening and supporting shelters for animals allows you to provide them with temporary or permanent shelter, food and medical care. Many of these animals are just looking for the love and care that we can provide. Another way is to sponsor animals in shelters or farms where they are kept. This helps provide financial support for their maintenance and treatment. In addition, spreading awareness about the importance of animal protection can encourage people to make responsible decisions about their treatment of animals and their environment.'
  //     },
  //     _id: "35e5rdsf45s63f"
  //   }
  // ]


  //

  const helpOptionsArray = [
    {
      name: {
        ua: "Їжа для тварин",
        en: "Food for animals",
      },
      description: {
        ua: "<h4 className='help-us-option__title'>Яку їжу можна надати для годування тварин:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>корм для собак (сухий, вологий);</li><li className='help-us-option__item'>крупи для приготування каші;</li><li className='help-us-option__item'>м'ясне (голови , шиї, корпуси, бульйонний набір, ШКТ, лапи) та інші м’ясні субпродукти;</li></ul>",
        en: "<h4 className='help-us-option__title'>What kinds of food you can donate:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>dog food(wet, dry);</li><li className='help-us-option__item'>cereals to cook mush;</li><li className='help-us-option__item'>meat (heads , necks, bodies, bouillon kit, GT's, paws) and other kinds of meat offal;</li></ul>",
      },
    },
    {
      name: {
        ua: "Ліки та медичні засоби",
        en: "Medicine and medical preparations",
      },
      description: {
        ua: "<h4 className='help-us-option__title'>Які ліки та медичні засоби нам потрібні:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>засоби від бліх,кліщів, глистів (Адвокат, Сімпаріка, Адвантікс, Біхелдон, тощо);</li><li className='help-us-option__item'>антибіотики (цефтріаксон, мелоксивет);</li><li className='help-us-option__item'>вакцини для собак (Вангард, Дурамун, сироватка Догпротект, Кетпротект)</li></ul>",
        en: "<h4 className='help-us-option__title'>What kinds medicine and medical preparations we need:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>remedy from pincels;</li><li className='help-us-option__item'>antibiotics</li><li className='help-us-option__item'>vaccines for dogs</li></ul>",
      },
    },
    {
      name: {
        ua: "Побутові потреби",
        en: "Household needs",
      },
      description: {
        ua: "<h4 className='help-us-option__title'>Наші побутові потреби:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>будки для собак;</li><li className='help-us-option__item'>миски, каструлі  великої ємкості для собак</li><li className='help-us-option__item'>відра  10 - 30 літрів для зберігання та транспортування іжі;</li><li className='help-us-option__item'>солома для вольєрів;</li></ul>",
        en: "<h4 className='help-us-option__title'>What household needs do we need:</h4><ul className='help-us-option__list'><li className='help-us-option__item'>kennels for dogs;</li><li className='help-us-option__item'>bowls, big pans for dogs</li><li className='help-us-option__item'>buckets 10-30 liters for keeping and transfering food</li><li className='help-us-option__item'>straw for enclosures</li></ul>",
      },
    },
  ];

  const getAllHelpOptions = async () => {
    const res: IHelpOptionsArr = await apiGetAllHelpOptions()
    setHelpOptions(res)
  }

  useEffect(() => {
    getAllHelpOptions()
    // setHelpOptions(test) // For testing
  }, [])

  if (!helpOptions) {
    return <>{t('loading')}</>
  }
  return (
    <div className="helpUsPage">
      <section className="hero">
        <h1>{t("helpUs")}</h1>
        <h2>{t("helpUsDescription")}</h2>
        <div className="links">
          <Link to={links.treatment}>{t("therapy")}</Link>
          <Link to={links.sterilisation}>{t("sterilization")}</Link>
        </div>
      </section>
      {helpOptions.length ? (
        <section className="helpOptions">
          {helpOptions.map((e, key) => {
            return (
              <div className="helpOption" key={key}>
                <h1
                  dangerouslySetInnerHTML={
                    Translate(e.name) as string & { __html: TrustedHTML }
                  }
                ></h1>
                <div
                  dangerouslySetInnerHTML={
                    Translate(e.name) as string & { __html: TrustedHTML }
                  }
                ></div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="noHelpOptions">{t("helpNotNeeded")}</section>
      )}

    </div>
  );
}
