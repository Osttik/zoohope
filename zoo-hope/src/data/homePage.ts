import img_1 from "../images/homePage/img_1.png"
import img_2 from "../images/homePage/img_2.png"
import img_3 from "../images/homePage/img_3.png"

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
        'En First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'En Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ],
      ua: [
        'Ua First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'Ua Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ]
    },
    img: img_1
  },
  {
    title: {
      en: "Our history",
      ua: "Наша історія"
    },
    description: {
      en: [
        'En First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'En Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ],
      ua: [
        'Ua First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'Ua Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ]
    },
    img: img_2
  },
  {
    title: {
      en: "Why are we doing this?w",
      ua: "Навіщо ми це робимо?"
    },
    description: {
      en: [
        'En First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'En Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ],
      ua: [
        'Ua First Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.',
        'Ua Second Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet nulla in nisl ullamcorper efficitur. Donec ultrices elit vel porttitor mattis. Sed vitae facilisis tortor. Ut sed dictum ex, vel bibendum erat. Duis finibus urna justo, ut tincidunt purus mattis vitae. Fusce auctor lorem id urna posuere bibendum. Fusce semper, orci vitae facilisis aliquam, diam turpis finibus nisi, non facilisis nulla elit eu mauris. Cras accumsan elit enim, in tincidunt mi eleifend sed. Donec in odio massa.'
      ]
    },
    img: img_3
  },
]

export { data }