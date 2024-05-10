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
        "We believe that every animal deserves love, care, and a worthy home. Our mission is to provide safety and protection to homeless animals, help them recover, and find new owners who will love them endlessly.", 
        "We do everything possible to ensure that every animal that comes to us receives the best care and attention. Our actions are aimed not only at changing the lives of animals but also at changing the world they live in, inspiring kindness and responsibility.",
      ],
      ua: [
        "Ми віримо в те, що кожна тварина заслуговує на любов, піклування та гідний дім. Наша місія полягає в тому, щоб забезпечити безпеку та захист безпритульним тваринам, допомогти їм відновитися та знайти нових власників, які будуть безмежно їх любити.",
        "Ми робимо все можливе, щоб кожна тваринка, яка потрапляє до нас, отримувала найкращий догляд та увагу. Наші дії покликані не лише змінити життя тварин, але і змінити світ, де вони живуть, спонукаючи до доброти та відповідальності."
      ]
    },
    img: img_3
  },
]

export { data }