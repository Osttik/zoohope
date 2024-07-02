import img_1 from "../images/homePage/img_3.jpg"
import img_2 from "../images/homePage/img_2.png"
import img_3 from "../images/homePage/img_1.png"

interface Idata {
  title: {
    en: string,
    ua: string
  },
  description: {
    ua: string[],
    en: string[],
  },
  img: string
}

const data: Idata[] = [
  {
    title: {
      en: "Who are we?",
      ua: "Хто ми?"
    },
    description: {
      en: [
        "We are a charitable organization located in the city of Varash, situated in the Rivne region. Our organization embarked on its mission in 2016, but even before that time, we were unofficially aiding animals. Our passion for helping animals has grown over the years, and we realized that something more needed to be done to give them a chance at a happy life.", 
        "Currently, we work with great dedication, providing temporary shelter, vaccination, sterilization, and treatment to our furry friends. We monitor each animal with the hope of finding them loving families and a new home."
      ],
      ua: [
        "Ми — благодійна організація у місті Вараш, що знаходиться у рівненській області. Наша організація почала свою місію у 2016 році, але навіть до того часу ми допомагали тваринам неофіційно. Наша пристрасть до допомоги тваринам виросла з роками, і ми зрозуміли, що потрібно створити щось більше, щоб дати їм шанс на щасливе життя.",
        "Зараз ми працюємо з великою відданістю, надаючи тимчасовий притулок, вакцинацію, стерилізацію та лікування нашим пухнастим друзям. Ми стежимо за кожною тваринкою з надією знайти для них люблячі сім'ї та новий дім."
      ]
    },
    img: img_1
  },
  {
    title: {
      en: "Our story",
      ua: "Наша історія"
    },
    description: {
      en: [
        "Our story began in the heart of Varash, when a group of enthusiasts united to give homeless animals hope for the future. In those days, we worked with hope and minimal resources, but with great heart. Over time, our mission grew, and we realized the need for an official structure to provide more opportunities for those we help.",
        "In 2016, we established our organization to ensure safe conditions for animals and to make our actions more structured and effective. Since then, we have continued our work with the same passion."
      ],
      ua: [
        "Наша історія почалася у серці Вараша, коли група ентузіастів об'єдналися, щоб дати безпритульним тваринам надію на майбутнє. У ті дні ми працювали з надією та мінімальними ресурсами, але з великим серцем. З часом наша місія зростала, і ми зрозуміли, що потребуємо офіційної структури, щоб дати тим, кого ми допомагаємо, більше можливостей.", 
        "У 2016 році ми створили нашу організацію з метою забезпечити безпечні умови для тварин та зробити наші дії більш структурованими та ефективними. З того часу ми продовжуємо свою роботу з тією ж самою страстю."
      ]
    },
    img: img_2
  },
  {
    title: {
      en: "Why are we doing this?",
      ua: "Навіщо ми це робимо?"
    },
    description: {
      en: [
        "We believe that every animal deserves respect, protection from cruelty, and a loving home. Our mission is to ensure the safety and protection of stray animals, as well as their treatment, vaccination, sterilization, and placement into new homes.", 
        "We are committed to each animal. Our actions are aimed at changing the lives of animals and promoting a compassionate and responsible attitude towards animals in society. We strive to create a world where every animal has the chance for a happy and safe life, and where kindness and responsibility are the norm.",
      ],
      ua: [
        "Ми віримо, що кожна тварина заслуговує на повагу, захист від жорстокості та гідний дім. Наша місія полягає в забезпеченні безпеки та захисту безпритульних тварин, а також у їхньому лікуванні, вакцинації, стерилізації та прилаштуванні до нових домівок.",
        "Ми віддані кожній тваринці. Наші дії спрямовані на зміну життя тварин, а також на формування доброзичливого та відповідального ставлення до тварин у суспільстві. Ми прагнемо створити світ, де кожна тварина має шанс на щасливе та безпечне життя, а доброта та відповідальність є нормою."
      ]
    },
    img: img_3
  },
]

export { data }