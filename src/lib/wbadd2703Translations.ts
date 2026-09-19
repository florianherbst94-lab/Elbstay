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

    steps: [
      {
        title: "Hauseingang",
        description: "So gelangst du zur Ferienwohnung: Die Unterkunft befindet sich auf der Leipziger Straße 138, 01127 Dresden. Gehe durch das Eingangstor an der Hauptstraße.",
      },
      {
        title: "Briefkasten & Schlüsselkasten",
        description: "Auf der linken Seite im Hof findest du die Eingangstür. Die Ferienwohnung liegt im Erdgeschoss in der Mitte. Dort befindet sich der Schlüsselkasten. Gebe dort den Zahlencode 7395 ein.",
      },
      {
        title: "Schlüssel entnehmen",
        description: "Verschließe den Schlüsselkasten und verstelle den Code wieder.",
      },
      {
        title: "Treppenhaus",
        description: "Gehe das Treppenhaus nach oben, die erste Tür links ist der Zugang zur Wohnung.",
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
      "Es ist kein direkter Parkplatz für die Wohnung vorgesehen. Parkplätze sind in unmittelbarer Umgebung in den Nebenstraßen vorhanden.",
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
      "Müll in den Tonnen im Hinterhof entsorgen.",
      "Geschirrspüler starten (falls benutzt).",
      "Den Schlüssel in die Garderobe im Flur hängen.",
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

    steps: [
      {
        title: "Building Entrance",
        description: "How to get to the apartment: The accommodation is located at Leipziger Straße 138, 01127 Dresden. Go through the entrance gate on the main street.",
      },
      {
        title: "Mailbox & Key Box",
        description: "You will find the entrance door on the left side of the courtyard. The apartment is on the ground floor in the middle. The key box is located there. Enter the code 7395.",
      },
      {
        title: "Take Key",
        description: "Close the key box and scramble the code again.",
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
      "There is no dedicated parking spot for the apartment. Parking is available in the immediate vicinity on the side streets.",
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
      "Dispose of trash in the bins in the backyard.",
      "Start the dishwasher (if used).",
      "Hang the key on the coat rack in the hallway.",
    ],
  },
} as const;
