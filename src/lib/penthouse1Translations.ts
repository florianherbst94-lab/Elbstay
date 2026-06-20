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
    heroSubtitle: "Penthouse 1",
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
        title: "Anfahrt zum Innenhof",
        description: "Biegen Sie in die Einfahrt Berliner Straße ein. Diese erkennen Sie mit dem Wandgemälde auf der linken Seite.",
      },
      {
        title: "Parkplatz finden",
        description: "Biegen Sie rechts ab und suchen Sie sich den Parkplatz mit der Stellnummer WE 10 im Innenhof.",
      },
      {
        title: "Stellplatz Schild",
        description: "Suchen Sie das Schild mit der Aufschrift P WE 10 an der Umzäunung.",
      },
      {
        title: "Eingang finden",
        description: "Auf der rechten Seite das große Objekt, dort finden Sie den Eingang mit den Briefkästen.",
      },
      {
        title: "Briefkasten lokalisieren",
        description: "Gehen Sie zu dem Briefkasten neben dem Eingang, finden Sie den Kasten mit dem Schild WE 10. Dafür nutzen Sie den Code 825.",
      },
      {
        title: "Fahrstuhl & Etage",
        description: "Fahren Sie mit dem Fahrstuhl in den fünften Stock. Gehen Sie aus der Tür raus, den Gang entlang rechts. Am Ende des Flurs befindet sich der Eingang zur Wohnung.",
      },
      {
        title: "Aufgang zur Dachterrasse",
        description: "Nutzen Sie die Wendeltreppe, um zur Dachterrasse zu gelangen. Sie öffnen das Schloss mit dem Wohnungsschlüssel. Bitte respektieren Sie die Privatsphäre der Anwohner.",
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
      "Hallo Magdalena, ich bin gerade im Penthouse 1 angekommen und habe eine Frage:",

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
    heroSubtitle: "Penthouse 1",
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
        title: "Drive to the Courtyard",
        description: "Turn into the Berliner Straße driveway. You will recognize it by the mural on the left side.",
      },
      {
        title: "Find Your Parking Spot",
        description: "Turn right and find parking spot WE 10 in the courtyard.",
      },
      {
        title: "Parking Sign",
        description: "Look for the sign reading 'P WE 10' on the fence.",
      },
      {
        title: "Find the Entrance",
        description: "The large building on the right is the entrance. You will find the mailboxes there.",
      },
      {
        title: "Locate the Mailbox",
        description: "Go to the mailbox next to the entrance and find the box labelled 'WE 10'. Use code 825.",
      },
      {
        title: "Elevator & Floor",
        description: "Take the elevator to the 5th floor. Exit the door, go down the hallway to the right. The entrance is at the end.",
      },
      {
        title: "Roof Terrace Access",
        description: "Use the spiral staircase to access the roof terrace. Open the lock with your apartment key. Please respect the privacy of neighbors.",
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
      "Hello Magdalena, I have just arrived at Penthouse 1 and have a question:",

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
