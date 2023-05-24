import {IMenuOption} from "components/core/autoComplete";
import {TChipColor} from "interfaces";

export const GENDER_OPTIONS: IMenuOption[] = [
  { key: "male", value: "male" },
  { key: "female", value: "female" },
  { key: "others", value: "others" },
];

export const ROLES_OPTIONS: IMenuOption[] = [
  { key: "master", value: "استاد" },
  { key: "student", value: "دانشجو" },
];

export const DOCTOR_TYPE_OPTIONS: IMenuOption[] = [
  {
    key: "international",
    value: "International",
  },
  {
    key: "local",
    value: "Local",
  },
];
export const DOCTOR_TITLE_OPTIONS: IMenuOption[] = [
  { key: "MD", value: "MD / DO" },
  { key: "PhD", value: "PhD" },
  { key: "MD/PhD", value: "MD/PhD" },
  { key: "MBBS", value: "MBBS" },
];

export const ROLES: { name: string; color: TChipColor }[] = [
  { name: "doctor", color: "primary-dark" },
  { name: "staff", color: "primary-light" },
  { name: "local-admin", color: "green-light" },
  { name: "doctor-network-admin", color: "gray-dark" },
  { name: "super-admin", color: "gray-light" },
  { name: "patient", color: "error" },
  { name: "cmo", color: "error" },
];

export const ROLE_NAMES: IMenuOption[] = [
  ...ROLES.map((item) => ({ key: item.name, value: item.name })),
];

export const LANGUAGE_FLUENCY_OPTIONS: IMenuOption[] = [
  { key: "beginner", value: "beginner" },
  { key: "intermediate", value: "intermediate" },
  { key: "advanced", value: "advanced" },
];

export const STATUS: IMenuOption[] = [
  {
    key: "active",
    value: "active",
  },
  {
    key: "pending",
    value: "pending",
  },
  {
    key: "denied",
    value: "denied",
  },
];
export const AVAILABIILITY_TYPES: IMenuOption[] = [
  { key: "scheduled", value: "Scheduled" },
  { key: "ondemand", value: "On Demand" },
];

export const TRANSACTIONS_TYPES: IMenuOption[] = [
  { key: "withdraw", value: "Withdraw" },
  { key: "deposit", value: "Deposit" },
];

export const APPOINTMENT_TYPES: IMenuOption[] = [
  { key: "local", value: "Local" },
  { key: "international", value: "International" },
];

export const NOSHOW_TYPES: IMenuOption[] = [
  { key: "doctor noshow", value: "Doctor No-Show" },
  { key: "patient noshow", value: "Patient No-Show" },
  { key: "system caused noshow", value: "Technical Error" },
];

export const REPEAT_PATTERNS: IMenuOption[] = [
  { key: "daily", value: "Daily" },
  { key: "weekly", value: "Weekly" },
  { key: "monthly", value: "Monthly" },
];

export const ROBOT_TYPES: IMenuOption[] = [
  { key: "hospital-robot", value: "Hospital" },
  { key: "clinic-robot", value: "Clinic" },
  { key: "kiosk-robot", value: "Kiosk" },
  { key: "hotel-robot", value: "Hotel" },
  { key: "home-robot", value: "Home" },
  { key: "tv-robot", value: "TV" },
  { key: "ambulance-robot", value: "ambulance" },
  { key: "virtual-hf-robot", value: "Virtual HF" },
];

export const ROBOT_LEVELS: IMenuOption[] = [
  { key: "robo-cart", value: "RoboCart" },
  { key: "robo-cam", value: "RoboCam" },
  { key: "robo-life", value: "RoboLife" },
  { key: "robo-doc", value: "RoboDoc" },
  { key: "robo-doc-plus", value: "RoboDoc+" },
];

export const LANGUAGE_OPTIONS: IMenuOption[] = [
  {
    key: "Abkhaz",
    value: "Abkhaz",
  },
  {
    key: "Afar",
    value: "Afar",
  },
  {
    key: "Afrikaans",
    value: "Afrikaans",
  },
  {
    key: "Akan",
    value: "Akan",
  },
  {
    key: "Albanian",
    value: "Albanian",
  },
  {
    key: "Amharic",
    value: "Amharic",
  },
  {
    key: "Arabic",
    value: "Arabic",
  },
  {
    key: "Aragonese",
    value: "Aragonese",
  },
  {
    key: "Armenian",
    value: "Armenian",
  },
  {
    key: "Assamese",
    value: "Assamese",
  },
  {
    key: "Avaric",
    value: "Avaric",
  },
  {
    key: "Avestan",
    value: "Avestan",
  },
  {
    key: "Aymara",
    value: "Aymara",
  },
  {
    key: "Azerbaijani",
    value: "Azerbaijani",
  },
  {
    key: "Bambara",
    value: "Bambara",
  },
  {
    key: "Bashkir",
    value: "Bashkir",
  },
  {
    key: "Basque",
    value: "Basque",
  },
  {
    key: "Belarusian",
    value: "Belarusian",
  },
  {
    key: "Bengali",
    value: "Bengali",
  },
  {
    key: "Bihari",
    value: "Bihari",
  },
  {
    key: "Bislama",
    value: "Bislama",
  },
  {
    key: "Bosnian",
    value: "Bosnian",
  },
  {
    key: "Breton",
    value: "Breton",
  },
  {
    key: "Bulgarian",
    value: "Bulgarian",
  },
  {
    key: "Burmese",
    value: "Burmese",
  },
  {
    key: "Catalan; Valencian",
    value: "Catalan; Valencian",
  },
  {
    key: "Chamorro",
    value: "Chamorro",
  },
  {
    key: "Chechen",
    value: "Chechen",
  },
  {
    key: "Chichewa; Chewa; Nyanja",
    value: "Chichewa; Chewa; Nyanja",
  },
  {
    key: "Chinese",
    value: "Chinese",
  },
  {
    key: "Chuvash",
    value: "Chuvash",
  },
  {
    key: "Cornish",
    value: "Cornish",
  },
  {
    key: "Corsican",
    value: "Corsican",
  },
  {
    key: "Cree",
    value: "Cree",
  },
  {
    key: "Croatian",
    value: "Croatian",
  },
  {
    key: "Czech",
    value: "Czech",
  },
  {
    key: "Danish",
    value: "Danish",
  },
  {
    key: "Divehi; Dhivehi; Maldivian;",
    value: "Divehi; Dhivehi; Maldivian;",
  },
  {
    key: "Dutch",
    value: "Dutch",
  },
  {
    key: "English",
    value: "English",
  },
  {
    key: "Esperanto",
    value: "Esperanto",
  },
  {
    key: "Estonian",
    value: "Estonian",
  },
  {
    key: "Ewe",
    value: "Ewe",
  },
  {
    key: "Faroese",
    value: "Faroese",
  },
  {
    key: "Fijian",
    value: "Fijian",
  },
  {
    key: "Finnish",
    value: "Finnish",
  },
  {
    key: "French",
    value: "French",
  },
  {
    key: "Fula; Fulah; Pulaar; Pular",
    value: "Fula; Fulah; Pulaar; Pular",
  },
  {
    key: "Galician",
    value: "Galician",
  },
  {
    key: "Georgian",
    value: "Georgian",
  },
  {
    key: "German",
    value: "German",
  },
  {
    key: "Greek, Modern",
    value: "Greek, Modern",
  },
  {
    key: "Guaraní",
    value: "Guaraní",
  },
  {
    key: "Gujarati",
    value: "Gujarati",
  },
  {
    key: "Haitian; Haitian Creole",
    value: "Haitian; Haitian Creole",
  },
  {
    key: "Hausa",
    value: "Hausa",
  },
  {
    key: "Herero",
    value: "Herero",
  },
  {
    key: "Hindi",
    value: "Hindi",
  },
  {
    key: "Hiri Motu",
    value: "Hiri Motu",
  },
  {
    key: "Hungarian",
    value: "Hungarian",
  },
  {
    key: "Interlingua",
    value: "Interlingua",
  },
  {
    key: "Indonesian",
    value: "Indonesian",
  },
  {
    key: "Interlingue",
    value: "Interlingue",
  },
  {
    key: "Irish",
    value: "Irish",
  },
  {
    key: "Igbo",
    value: "Igbo",
  },
  {
    key: "Inupiaq",
    value: "Inupiaq",
  },
  {
    key: "Ido",
    value: "Ido",
  },
  {
    key: "Icelandic",
    value: "Icelandic",
  },
  {
    key: "Italian",
    value: "Italian",
  },
  {
    key: "Inuktitut",
    value: "Inuktitut",
  },
  {
    key: "Japanese",
    value: "Japanese",
  },
  {
    key: "Javanese",
    value: "Javanese",
  },
  {
    key: "Kalaallisut, Greenlandic",
    value: "Kalaallisut, Greenlandic",
  },
  {
    key: "Kannada",
    value: "Kannada",
  },
  {
    key: "Kanuri",
    value: "Kanuri",
  },
  {
    key: "Kashmiri",
    value: "Kashmiri",
  },
  {
    key: "Kazakh",
    value: "Kazakh",
  },
  {
    key: "Khmer",
    value: "Khmer",
  },
  {
    key: "Kikuyu, Gikuyu",
    value: "Kikuyu, Gikuyu",
  },
  {
    key: "Kinyarwanda",
    value: "Kinyarwanda",
  },
  {
    key: "Kirghiz, Kyrgyz",
    value: "Kirghiz, Kyrgyz",
  },
  {
    key: "Komi",
    value: "Komi",
  },
  {
    key: "Kongo",
    value: "Kongo",
  },
  {
    key: "Korean",
    value: "Korean",
  },
  {
    key: "Kurdish",
    value: "Kurdish",
  },
  {
    key: "Kwanyama, Kuanyama",
    value: "Kwanyama, Kuanyama",
  },
  {
    key: "Latin",
    value: "Latin",
  },
  {
    key: "Luxembourgish, Letzeburgesch",
    value: "Luxembourgish, Letzeburgesch",
  },
  {
    key: "Luganda",
    value: "Luganda",
  },
  {
    key: "Limburgish, Limburgan, Limburger",
    value: "Limburgish, Limburgan, Limburger",
  },
  {
    key: "Lingala",
    value: "Lingala",
  },
  {
    key: "Lao",
    value: "Lao",
  },
  {
    key: "Lithuanian",
    value: "Lithuanian",
  },
  {
    key: "Luba-Katanga",
    value: "Luba-Katanga",
  },
  {
    key: "Latvian",
    value: "Latvian",
  },
  {
    key: "Manx",
    value: "Manx",
  },
  {
    key: "Macedonian",
    value: "Macedonian",
  },
  {
    key: "Malagasy",
    value: "Malagasy",
  },
  {
    key: "Malay",
    value: "Malay",
  },
  {
    key: "Malayalam",
    value: "Malayalam",
  },
  {
    key: "Maltese",
    value: "Maltese",
  },
  {
    key: "Māori",
    value: "Māori",
  },
  {
    key: "Marathi (Marāṭhī)",
    value: "Marathi (Marāṭhī)",
  },
  {
    key: "Marshallese",
    value: "Marshallese",
  },
  {
    key: "Mongolian",
    value: "Mongolian",
  },
  {
    key: "Nauru",
    value: "Nauru",
  },
  {
    key: "Navajo, Navaho",
    value: "Navajo, Navaho",
  },
  {
    key: "Norwegian Bokmål",
    value: "Norwegian Bokmål",
  },
  {
    key: "North Ndebele",
    value: "North Ndebele",
  },
  {
    key: "Nepali",
    value: "Nepali",
  },
  {
    key: "Ndonga",
    value: "Ndonga",
  },
  {
    key: "Norwegian Nynorsk",
    value: "Norwegian Nynorsk",
  },
  {
    key: "Norwegian",
    value: "Norwegian",
  },
  {
    key: "Nuosu",
    value: "Nuosu",
  },
  {
    key: "South Ndebele",
    value: "South Ndebele",
  },
  {
    key: "Occitan",
    value: "Occitan",
  },
  {
    key: "Ojibwe, Ojibwa",
    value: "Ojibwe, Ojibwa",
  },
  {
    key: "Oromo",
    value: "Oromo",
  },
  {
    key: "Oriya",
    value: "Oriya",
  },
  {
    key: "Ossetian, Ossetic",
    value: "Ossetian, Ossetic",
  },
  {
    key: "Panjabi, Punjabi",
    value: "Panjabi, Punjabi",
  },
  {
    key: "Pāli",
    value: "Pāli",
  },
  {
    key: "Persian",
    value: "Persian",
  },
  {
    key: "Polish",
    value: "Polish",
  },
  {
    key: "Pashto, Pushto",
    value: "Pashto, Pushto",
  },
  {
    key: "Portuguese",
    value: "Portuguese",
  },
  {
    key: "Quechua",
    value: "Quechua",
  },
  {
    key: "Romansh",
    value: "Romansh",
  },
  {
    key: "Kirundi",
    value: "Kirundi",
  },
  {
    key: "Romanian, Moldavian, Moldovan",
    value: "Romanian, Moldavian, Moldovan",
  },
  {
    key: "Russian",
    value: "Russian",
  },
  {
    key: "Sanskrit (Saṁskṛta)",
    value: "Sanskrit (Saṁskṛta)",
  },
  {
    key: "Sardinian",
    value: "Sardinian",
  },
  {
    key: "Sindhi",
    value: "Sindhi",
  },
  {
    key: "Northern Sami",
    value: "Northern Sami",
  },
  {
    key: "Samoan",
    value: "Samoan",
  },
  {
    key: "Sango",
    value: "Sango",
  },
  {
    key: "Serbian",
    value: "Serbian",
  },
  {
    key: "Scottish Gaelic; Gaelic",
    value: "Scottish Gaelic; Gaelic",
  },
  {
    key: "Shona",
    value: "Shona",
  },
  {
    key: "Sinhala, Sinhalese",
    value: "Sinhala, Sinhalese",
  },
  {
    key: "Slovak",
    value: "Slovak",
  },
  {
    key: "Slovene",
    value: "Slovene",
  },
  {
    key: "Somali",
    value: "Somali",
  },
  {
    key: "Southern Sotho",
    value: "Southern Sotho",
  },
  {
    key: "Spanish",
    value: "Spanish",
  },
  {
    key: "Sundanese",
    value: "Sundanese",
  },
  {
    key: "Swahili",
    value: "Swahili",
  },
  {
    key: "Swati",
    value: "Swati",
  },
  {
    key: "Swedish",
    value: "Swedish",
  },
  {
    key: "Tamil",
    value: "Tamil",
  },
  {
    key: "Telugu",
    value: "Telugu",
  },
  {
    key: "Tajik",
    value: "Tajik",
  },
  {
    key: "Thai",
    value: "Thai",
  },
  {
    key: "Tigrinya",
    value: "Tigrinya",
  },
  {
    key: "Tibetan Standard, Tibetan, Central",
    value: "Tibetan Standard, Tibetan, Central",
  },
  {
    key: "Turkmen",
    value: "Turkmen",
  },
  {
    key: "Tagalog",
    value: "Tagalog",
  },
  {
    key: "Tswana",
    value: "Tswana",
  },
  {
    key: "Tonga (Tonga Islands)",
    value: "Tonga (Tonga Islands)",
  },
  {
    key: "Turkish",
    value: "Turkish",
  },
  {
    key: "Tsonga",
    value: "Tsonga",
  },
  {
    key: "Tatar",
    value: "Tatar",
  },
  {
    key: "Twi",
    value: "Twi",
  },
  {
    key: "Tahitian",
    value: "Tahitian",
  },
  {
    key: "Uighur, Uyghur",
    value: "Uighur, Uyghur",
  },
  {
    key: "Ukrainian",
    value: "Ukrainian",
  },
  {
    key: "Urdu",
    value: "Urdu",
  },
  {
    key: "Uzbek",
    value: "Uzbek",
  },
  {
    key: "Venda",
    value: "Venda",
  },
  {
    key: "Vietnamese",
    value: "Vietnamese",
  },
  {
    key: "Volapük",
    value: "Volapük",
  },
  {
    key: "Walloon",
    value: "Walloon",
  },
  {
    key: "Welsh",
    value: "Welsh",
  },
  {
    key: "Wolof",
    value: "Wolof",
  },
  {
    key: "Western Frisian",
    value: "Western Frisian",
  },
  {
    key: "Xhosa",
    value: "Xhosa",
  },
  {
    key: "Yiddish",
    value: "Yiddish",
  },
  {
    key: "Yoruba",
    value: "Yoruba",
  },
  {
    key: "Zhuang, Chuang",
    value: "Zhuang, Chuang",
  },
];

export const FAMILY_OPTIONS: IMenuOption[] = [
  { key: "brother", value: "Brother" },
  { key: "sister", value: "Sister" },
  { key: "father", value: "Father" },
  { key: "mother", value: "Mother" },
];
