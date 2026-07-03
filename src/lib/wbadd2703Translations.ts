export type Lang = "de" | "en";

export const t = {
  de: {
    // Header nav
    navCheckin: "Check-in",
    navInfo: "Info",
    navContact: "Kontakt",

    // Hero
    welcome: "Willkommen in Dresden",
    heroTitle: "Ihr Check-in zum",
    heroSubtitle: "Boutique-Apartment",
    heroDesc:
      "Hier finden Sie alle Informationen für einen unkomplizierten Check-in sowie wichtige Details zu Ihrem Aufenthalt.",

    // Address card
    address: "Adresse",
    openMaps: "In Google Maps öffnen",

    // Quick nav cards
    checkinLabel: "Check-in",
    checkinSub: "Anweisungen ansehen",
    infoLabel: "Info",
    infoSub: "WiFi, Parken & mehr",

    // Check-in instructions section
    checkinTitle: "Check-in Anweisungen",
    checkinDesc: "Folgen Sie diesen Schritten, um Ihren Schlüssel zu erhalten.",
    arrivalFrom: "Anreise ab",

    // Step titles and descriptions
    steps: [
      {
        title: "Hauseingang",
        description: "Suche den Hauseingang auf der Leipziger Straße 138.",
      },
      {
        title: "Briefkasten ElbStay",
        description: "Dort befindet sich der Briefkasten mit dem Namen ElbStay. Gebe in den Zahlencode dreimal die 0 ein (000).",
      },
      {
        title: "Schlüsselkasten",
        description: "In dem Briefkasten befindet sich ein Schlüsselkasten mit dem Zahlencode 3784. Dort erhältst du den Schlüssel und Zugang zur Wohnung.",
      },
      {
        title: "Treppenhaus",
        description: "Gehe die Treppe nach oben, die erste Tür links ist der Zugang zur Wohnung.",
      },
      {
        title: "Wohnungstür",
        description: "Der Zugang zur Wohnung. Wir wünschen dir einen wundervollen Aufenthalt.",
      },
    ],

    // Info section
    infoTitle: "Wichtige Informationen",
    infoDesc: "Alles Wissenswerte für Ihren Aufenthalt.",

    // Info cards
    wifi: "Highspeed WLAN",
    wifiNetwork: "Netzwerk",
    wifiPassword: "Passwort",
    wifiCopy: "Passwort kopieren",
    parking: "Parkplatz",
    parkingDesc:
      "Reservierter Stellplatz WE10 im Innenhof. Einfahrt über die Berliner Straße (beim großen Wandgemälde).",
    houseRules: "Hausregeln",
    houseRulesList: [
      "Ruhezeiten: 22:00 – 07:00 Uhr.",
      "Keine Parties erlaubt.",
      "Nichtraucher-Apartment.",
    ],
    times: "Check-out & Zeiten",

    // Host section
    hostDesc:
      "Haben Sie Fragen oder benötigen Sie Unterstützung? Ich bin gerne für Sie da, um Ihren Aufenthalt perfekt zu machen.",
    callHost: "Magdalena anrufen",
    whatsapp: "WhatsApp Nachricht",
    hostRole: "Feel Good Manager & Gäste-Host",
    whatsappMessage:
      "Hallo Magdalena, ich bin gerade im Boutique-Apartment angekommen und habe eine Frage:",

    // Checkout
    checkoutTitle: "Check-out Checkliste",
    checkoutDesc: "Was vor der Abreise zu tun ist.",
    checkoutList: [
      "Alle Fenster schließen.",
      "Heizung auf Stern (*) stellen.",
      "Müll in den Tonnen im Außenbereich entsorgen.",
      "Geschirrspüler starten (falls benutzt).",
      "Schlüssel an die Garderobe im Flur hängen. NICHT im Apartment einschließen oder in die Außenbox legen.",
    ],
  },

  en: {
    // Header nav
    navCheckin: "Check-in",
    navInfo: "Info",
    navContact: "Contact",

    // Hero
    welcome: "Welcome to Dresden",
    heroTitle: "Your Check-in for",
    heroSubtitle: "Boutique-Apartment",
    heroDesc:
      "Here you will find all the information you need for a smooth check-in as well as important details about your stay.",

    // Address card
    address: "Address",
    openMaps: "Open in Google Maps",

    // Quick nav cards
    checkinLabel: "Check-in",
    checkinSub: "View instructions",
    infoLabel: "Info",
    infoSub: "WiFi, Parking & more",

    // Check-in instructions section
    checkinTitle: "Check-in Instructions",
    checkinDesc: "Follow these steps to collect your key.",
    arrivalFrom: "Arrival from",

    // Step titles and descriptions
    steps: [
      {
        title: "Building Entrance",
        description: "Find the building entrance at Leipziger Straße 138.",
      },
      {
        title: "ElbStay Mailbox",
        description: "There you will find the mailbox labeled ElbStay. Enter the number 0 three times (000) for the code.",
      },
      {
        title: "Key Box",
        description: "Inside the mailbox is a key box with the code 3784. There you will get the key and access to the apartment.",
      },
      {
        title: "Staircase",
        description: "Go up the stairs, the first door on the left is the entrance to the apartment.",
      },
      {
        title: "Apartment Door",
        description: "The entrance to the apartment. We wish you a wonderful stay.",
      },
    ],

    // Info section
    infoTitle: "Important Information",
    infoDesc: "Everything you need to know about your stay.",

    // Info cards
    wifi: "High-Speed WiFi",
    wifiNetwork: "Network",
    wifiPassword: "Password",
    wifiCopy: "Copy Password",
    parking: "Parking",
    parkingDesc:
      "Reserved parking spot WE10 in the courtyard. Enter via Berliner Straße (look for the large mural).",
    houseRules: "House Rules",
    houseRulesList: [
      "Quiet hours: 10:00 PM – 7:00 AM.",
      "No parties allowed.",
      "Non-smoking apartment.",
    ],
    times: "Check-out & Times",

    // Host section
    hostDesc:
      "Do you have any questions or need support? I am happy to help make your stay perfect.",
    callHost: "Call Magdalena",
    whatsapp: "WhatsApp Message",
    hostRole: "Feel Good Manager & Guest Host",
    whatsappMessage:
      "Hello Magdalena, I have just arrived at Boutique-Apartment and have a question:",

    // Checkout
    checkoutTitle: "Check-out Checklist",
    checkoutDesc: "What to do before you leave.",
    checkoutList: [
      "Close all windows.",
      "Set the thermostat to the star (*) setting.",
      "Dispose of trash in the bins outside.",
      "Start the dishwasher (if used).",
      "Hang the key on the coat rack in the hallway. Do NOT lock it inside or leave it in the outdoor box.",
    ],
  },
} as const;
