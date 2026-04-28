export interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  source: string;
  type: "paper" | "book" | "guideline";
  url?: string;
}

export const references: Reference[] = [
  {
    id: "hampson2020",
    authors: "Hampson E.",
    year: 2020,
    title: "A brief guide to the menstrual cycle and oral contraceptive use for researchers in behavioral endocrinology",
    source: "Hormones and Behavior, Vol. 119",
    type: "paper",
    url: "https://doi.org/10.1016/j.yhbeh.2019.104655",
  },
  {
    id: "sundstrom2014",
    authors: "Sundström-Poromaa I., Gingnell M.",
    year: 2014,
    title: "Menstrual cycle influence on cognitive function and emotion processing",
    source: "Frontiers in Neuroscience, 8:380",
    type: "paper",
    url: "https://doi.org/10.3389/fnins.2014.00380",
  },
  {
    id: "hausmann2020",
    authors: "Hausmann M., Hamson D.",
    year: 2020,
    title: "Functional cerebral asymmetries during the menstrual cycle",
    source: "Hormones and Behavior",
    type: "paper",
  },
  {
    id: "sims-roar",
    authors: "Sims, Stacy T.",
    year: 2016,
    title: "ROAR: How to Match Your Food and Fitness to Your Female Physiology",
    source: "Rodale Books",
    type: "book",
  },
  {
    id: "mosconi-xx",
    authors: "Mosconi, Lisa",
    year: 2020,
    title: "The XX Brain: The Groundbreaking Science Empowering Women to Maximize Cognitive Health",
    source: "Avery",
    type: "book",
  },
  {
    id: "mosconi-menopause",
    authors: "Mosconi, Lisa",
    year: 2024,
    title: "The Menopause Brain: New Science Empowers Women to Navigate the Pivotal Transition with Knowledge and Confidence",
    source: "Avery",
    type: "book",
  },
  {
    id: "vitti-womancode",
    authors: "Vitti, Alisa",
    year: 2014,
    title: "WomanCode: Perfect Your Cycle, Amplify Your Fertility, Supercharge Your Sex Drive, and Become a Power Source",
    source: "HarperOne",
    type: "book",
  },
  {
    id: "hill-period",
    authors: "Hill, Maisie",
    year: 2019,
    title: "Period Power: Harness Your Hormones and Get Your Cycle Working For You",
    source: "Bloomsbury Sport",
    type: "book",
  },
  {
    id: "acog-pms",
    authors: "American College of Obstetricians and Gynecologists",
    year: 2023,
    title: "Premenstrual Syndrome (PMS) Clinical Guidelines",
    source: "ACOG Practice Bulletin",
    type: "guideline",
    url: "https://www.acog.org",
  },
];
