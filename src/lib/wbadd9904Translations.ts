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
    heroSubtitle: "Boutique-Apartment nahe der Elbe",
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
        title: "Zugang zum Gelände",
        description: "Dies ist der Zugang Richtung Marienallee 2A.",
      },
      {
        title: "Weg über den Parkplatz",
        description: "Bitte biegen Sie an der Kreuzung links ab und folgen Sie der Treppe.",
      },
      {
        title: "Briefkasten & Eingang",
        description: "Den Weg weiter verfolgen und rechts um die Ecke gehen. An der Stirnseite finden Sie den Briefkasten mit dem Schild ElbStay.",
      },
      {
        title: "Schlüsselkasten im Briefkasten",
        description: "Öffnen Sie den Briefkasten mit dem Zahlencode 786. Darin befindet sich der Schlüssel. Verschließen Sie den Briefkasten wieder und verstellen Sie den Zahlencode.",
      },
      {
        title: "Zur Wohnungstür",
        description: "Gehen Sie in die Wohnungstür hinein. Geradezu befindet sich ein Fahrstuhl, dieser führt bis in den 2. Stock. Alternativ können Sie auch direkt die Treppen nutzen. Gehen Sie bis in den 3. Stock, auf der rechten Seite mit der braunen Tür befindet sich der Eingang zur Ferienwohnung.",
      }
    ],

    // Info section
    infoTitle: "Wichtige Informationen",
    infoDesc: "Alles Wissenswerte für Ihren Aufenthalt.",

    // Info cards
    wifi: "Highspeed WLAN",
    wifiNetwork: "Netzwerk",
    wifiPassword: "Passwort",
    wifiCopy: "Passwort kopieren",
    parking: "Parken",
    parkingDesc:
      "Kostenlose Parkplätze finden Sie in der unmittelbaren Umgebung des Apartments.",
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
    heroSubtitle: "Boutique Apartment near the Elbe",
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
        title: "Access to the Property",
        description: "This is the access towards Marienallee 2A.",
      },
      {
        title: "Path across the Parking Lot",
        description: "Please turn left at the intersection and follow the stairs.",
      },
      {
        title: "Mailbox & Entrance",
        description: "Follow the path and go right around the corner. At the front you will find the mailbox with the ElbStay sign.",
      },
      {
        title: "Key Box inside the Mailbox",
        description: "Open the mailbox with the code 786. The key is inside. Close the mailbox again and scramble the code.",
      },
      {
        title: "To the Apartment Door",
        description: "Enter the apartment door. Straight ahead is an elevator, which goes to the 2nd floor. Alternatively, you can also use the stairs directly. Go up to the 3rd floor, on the right side with the brown door is the entrance to the apartment.",
      }
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
      "Free parking is available in the immediate vicinity of the apartment.",
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
