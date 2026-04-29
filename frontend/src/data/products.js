import perfume_presale from "../assets/images/perfume_presale.jpg";
import shoes_presale from "../assets/images/shoes_presale.jpg";
import bag_presale from "../assets/images/bag_presale.jpg";

import watches_best from "../assets/images/watches_best.jpg";
import bowtie_best from "../assets/images/bowtie_best.jpg";
import overal_best from "../assets/images/overal_best.jpg";

import shoes from "../assets/images/shoes.jpg";
import bag2 from "../assets/images/bag.jpg";
import scarf from "../assets/images/scarf.jpg";

export const products = [
    {
        id: 1,
        nazev: "Parfém",
        slug: "parfem",
        cena: 3290,
        obrazek: perfume_presale,
        tag: "presale",
        kategorie_id: 1,
        popis: "Elegantní parfém s dlouhotrvající vůní.",
        volume: [30, 50, 100]
    },
    {
        id: 2,
        nazev: "Kožená kabelka",
        slug: "kozena-kabelka",
        cena: 6490,
        obrazek: bag_presale,
        tag: "presale",
        kategorie_id: 2,
        popis: "Stylová kožená kabelka pro každodenní nošení."
    },
    {
        id: 3,
        nazev: "Luxusní boty",
        slug: "luxusni-boty",
        cena: 8990,
        obrazek: shoes_presale,
        tag: "presale",
        kategorie_id: 3,
        popis: "Luxusní boty z kvalitních materiálů.",
        sizes: [40, 41, 42, 43, 44]
    },
    {
        id: 4,
        nazev: "Hodinky",
        slug: "hodinky",
        cena: 4290,
        obrazek: watches_best,
        tag: "bestseller",
        kategorie_id: 4,
        popis: "Elegantní hodinky pro každou příležitost."
    },
    {
        id: 5,
        nazev: "Khaki overal",
        slug: "khaki-overal",
        cena: 2490,
        obrazek: overal_best,
        tag: "bestseller",
        kategorie_id: 5,
        popis: "Moderní overal v khaki barvě.",
        sizes: [38, 40, 42, 44, 50]
    },
    {
        id: 6,
        nazev: "Navi motýlek",
        slug: "navi-motylek",
        cena: 890,
        obrazek: bowtie_best,
        tag: "bestseller",
        kategorie_id: 5,
        popis: "Stylový motýlek pro formální příležitosti."
    },
    {
        id: 7,
        nazev: "Kožená kabelka premium",
        slug: "kozena-kabelka-premium",
        cena: 7490,
        obrazek: bag_presale,
        kategorie_id: 2,
        popis: "Prémiová kabelka z pravé kůže."
    },
    {
        id: 8,
        nazev: "Elegantní kabelka",
        slug: "elegantni-kabelka",
        cena: 5290,
        obrazek: bag2,
        kategorie_id: 2,
        popis: "Elegantní doplněk pro každou ženu."
    },
    {
        id: 20,
        nazev: "Pánské boty",
        slug: "panske-boty",
        cena: 2990,
        obrazek: shoes,
        kategorie_id: 3,
        popis: "Pohodlné boty pro každodenní nošení.",
        sizes: [40, 41, 42, 43]
    },
    {
        id: 30,
        nazev: "Luxusní šála",
        slug: "luxusni-sala",
        cena: 1290,
        obrazek: scarf,
        kategorie_id: 6,
        popis: "Jemná a elegantní šála."
    }
];