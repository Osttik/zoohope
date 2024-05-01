import { Link } from "react-router-dom"
import "../../styles/helpUsPage/helpUsPage.scss"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { apiGetAllHelpOptions } from "../../api/helpOptions";
import { IHelpOption } from "../../define";
import { links } from "../../data/helpUsPage";
import { Translate, TranslateFunc } from "../translation";
import i18n from "../../i18n/i18n";

export const HelpUsPage = () => {
  const { t } = useTranslation();
  const [helpOptions, setHelpOptions] = useState<IHelpOption[]>()


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

  const getAllHelpOptions = async () => {
    const res: IHelpOption[] = await apiGetAllHelpOptions();
    
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
                    {
                      __html: TranslateFunc(e.name, i18n)
                    }
                  }
                ></h1>
                <div
                  dangerouslySetInnerHTML={
                    {
                      __html: TranslateFunc(e.description, i18n)
                    }
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
