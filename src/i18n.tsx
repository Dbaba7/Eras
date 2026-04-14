import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'ha' | 'yo' | 'ig' | 'fu';
export type UserRole = 'patient' | 'responder' | null;

export const translations = {
  en: {
    greeting: "Hello",
    systemActive: "System Active",
    tapEmergency: "Tap for Emergency",
    bloodType: "Blood Type",
    allergies: "Allergies",
    emergencyContacts: "Emergency Contacts",
    hospitalsNearby: "Hospitals Nearby",
    firstAid: "First Aid Guides",
    searching: "Searching for Responders...",
    cancelAlert: "Cancel Alert",
    responderEnRoute: "Responder En Route",
    resolveEmergency: "Resolve Emergency",
    medicalId: "Medical ID",
    iNeedHelp: "I Need Help",
    iCanHelp: "I Can Provide Help",
    onDuty: "On Duty",
    offDuty: "Off Duty"
  },
  ha: {
    greeting: "Sannu",
    systemActive: "Tsarin Yana Aiki",
    tapEmergency: "Danna Domin Gaggawa",
    bloodType: "Rukunin Jini",
    allergies: "Rashin Jituwar Jiki",
    emergencyContacts: "Lambobin Gaggawa",
    hospitalsNearby: "Asibitoci na Kusa",
    firstAid: "Taimakon Farko",
    searching: "Ana neman Masu Taimako...",
    cancelAlert: "Soke Kiran Gaggawa",
    responderEnRoute: "Mai Taimako Yana Hanya",
    resolveEmergency: "Gaggawa Ya Kare",
    medicalId: "Katin Lafiya",
    iNeedHelp: "Ina Neman Taimako",
    iCanHelp: "Zan Iya Bada Taimako",
    onDuty: "Ina Aiki",
    offDuty: "Bana Aiki"
  },
  yo: {
    greeting: "Báwo ni",
    systemActive: "Eto Nṣiṣẹ",
    tapEmergency: "Tẹ Fun Pajawiri",
    bloodType: "Ẹjẹ",
    allergies: "Nkan Imularun",
    emergencyContacts: "Awon Olubasọrọ Pajawiri",
    hospitalsNearby: "Awọn Ile-iwosan Itosi",
    firstAid: "Iranlọwọ Akọkọ",
    searching: "N wa Awọn Oludahun...",
    cancelAlert: "Fagilee Itaniji",
    responderEnRoute: "Oludahun Wa Ni Ọna",
    resolveEmergency: "Pajawiri Ti Yanju",
    medicalId: "ID Iṣoogun",
    iNeedHelp: "Mo Nilo Iranlowo",
    iCanHelp: "Mo Le Pese Iranlowo",
    onDuty: "Nṣiṣẹ",
    offDuty: "Ko Ṣiṣẹ"
  },
  ig: {
    greeting: "Nnọọ",
    systemActive: "Usoro Na-arụ Ọrụ",
    tapEmergency: "Pịa Maka Mberede",
    bloodType: "Ụdị Ọbara",
    allergies: "Ihe Ahụ Gị Jụrụ",
    emergencyContacts: "Ndị Kpọkuo Mberede",
    hospitalsNearby: "Họspịtal Dị Nso",
    firstAid: "Enyemaka Mbụ",
    searching: "N'achọ Ndị Zaghachi...",
    cancelAlert: "Kagbuo Oku Mberede",
    responderEnRoute: "Onye Zaghachi Nọ N'ụzọ",
    resolveEmergency: "Mberede Emechiela",
    medicalId: "ID Ahụike",
    iNeedHelp: "Achọrọ M Enyemaka",
    iCanHelp: "Enwere M Ike Inye Enyemaka",
    onDuty: "N'ọrụ",
    offDuty: "Ekwụsịla Ọrụ"
  },
  "fu": {
    greeting: "No waɗi",
    systemActive: "Huuɓnude Yuɓɓo",
    tapEmergency: "Meemo Ngam Tappale",
    bloodType: "Iiyam",
    allergies: "Allaare",
    emergencyContacts: "Lambaji Tappale",
    hospitalsNearby: "Opitaal ɓadi",
    firstAid: "Ballal Artungal",
    searching: "Yiyndaade wallooɓe...",
    cancelAlert: "Darnu Daande",
    responderEnRoute: "Wallooɓe e Laawol",
    resolveEmergency: "Tappale Timmi",
    medicalId: "Kaayit Ndiyam",
    iNeedHelp: "Mi ɗon haaji wallo",
    iCanHelp: "Mi waawi wallude",
    onDuty: "E gollal",
    offDuty: "Walaa e gollal"
  }
};

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  userName: string;
  setUserName: (name: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const [userName, setUserName] = useState('Daniel');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const t = (key: keyof typeof translations.en) => {
    return translations[lang]?.[key] || translations['en'][key];
  };

  return (
    <AppContext.Provider value={{ lang, setLang, t, userName, setUserName, userRole, setUserRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
