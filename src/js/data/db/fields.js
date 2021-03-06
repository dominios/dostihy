import {
    TYPE_DISTANCE, TYPE_DOPING, TYPE_FINANCE, TYPE_FORTUNE, TYPE_HORSE, TYPE_PARKING, TYPE_STABLES, TYPE_START,
    TYPE_TRAINER,
    TYPE_TRANSPORT,
    TYPE_VET
} from "../../utils/constants";

export const fields = [
    {
        "id": "1",
        "type": TYPE_START,
        "text": {
            "name": "Štart",
            "description": "Každý hráč pri prejdení štartom obdrží 4.000,-"
        }
    },
    {
        "id": "2",
        "type": TYPE_HORSE,
        "text": {
            "name": "Fantome",
            "description": ""
        },
        "horse": {
            "group": 1,
            "initialPrice": 1200,
            "standardFee": 40,
            "racingFees": [200, 600, 1800, 3200, 5000],
            "racingCost": 1000
        }
    },
    {
        "id": "3",
        "type": TYPE_FINANCE,
        "text": {
            "name": "Financie",
            "description": ""
        }
    },
    {
        "id": "4",
        "type": TYPE_HORSE,
        "text": {
            "name": "Gavora",
            "description": ""
        },
        "horse": {
            "group": 1,
            "initialPrice": 1200,
            "standardFee": 40,
            "racingFees": [200, 600, 1800, 3200, 5000],
            "racingCost": 1000
        }
    },
    {
        "id": "5",
        "type": TYPE_VET,
        "text": {
            "name": "Veterinár",
            "description": ""
        },
        "fee": 500
    },
    {
        "id": "6",
        "type": TYPE_TRAINER,
        "text": {
            "name": "1. Tréner",
            "description": ""
        }
    },
    {
        "id": "7",
        "type": TYPE_HORSE,
        "text": {
            "name": "Lady Ann",
            "description": ""
        },
        "horse": {
            "group": 2,
            "initialPrice": 2000,
            "standardFee": 120,
            "racingFees": [600, 1800, 5400, 8000, 11000],
            "racingCost": 1000
        }
    },
    {
        "id": "8",
        "type": TYPE_FORTUNE,
        "text": {
            "name": "Náhoda",
            "description": ""
        }
    },
    {
        "id": "9",
        "type": TYPE_HORSE,
        "text": {
            "name": "Pasek",
            "description": ""
        },
        "horse": {
            "group": 2,
            "initialPrice": 2000,
            "standardFee": 120,
            "racingFees": [600, 1800, 5400, 8000, 11000],
            "racingCost": 1000
        }
    },
    {
        "id": "10",
        "type": TYPE_HORSE,
        "text": {
            "name": "Koran",
            "description": ""
        },
        "horse": {
            "group": 2,
            "initialPrice": 2400,
            "standardFee": 160,
            "racingFees": [800, 2000, 6000, 9000, 12000],
            "racingCost": 1000
        }
    },
    {
        "id": "11",
        "type": TYPE_DISTANCE,
        "text": {
            "name": "Dištanc",
            "description": ""
        }
    },
    {
        "id": "12",
        "type": TYPE_HORSE,
        "text": {
            "name": "Neklan",
            "description": ""
        },
        "horse": {
            "group": 3,
            "initialPrice": 2800,
            "standardFee": 200,
            "racingFees": [1000, 3000, 9000, 12500, 15000],
            "racingCost": 2000
        }
    },
    {
        "id": "13",
        "type": TYPE_TRANSPORT,
        "text": {
            "name": "Preprava",
            "description": ""
        }
    },
    {
        "id": "14",
        "type": TYPE_HORSE,
        "text": {
            "name": "Portlancl",
            "description": ""
        },
        "horse": {
            "group": 3,
            "initialPrice": 2800,
            "standardFee": 200,
            "racingFees": [1000, 3000, 9000, 12500, 15000],
            "racingCost": 2000
        }
    },
    {
        "id": "15",
        "type": TYPE_HORSE,
        "text": {
            "name": "Japan",
            "description": ""
        },
        "horse": {
            "group": 3,
            "initialPrice": 2800,
            "standardFee": 240,
            "racingFees": [1200, 3600, 10000, 14000, 18000],
            "racingCost": 2000
        }
    },
    {
        "id": "16",
        "type": TYPE_TRAINER,
        "text": {
            "name": "2. Tréner",
            "description": ""
        }
    },
    {
        "id": "17",
        "type": TYPE_HORSE,
        "text": {
            "name": "Kostrava",
            "description": ""
        },
        "horse": {
            "group": 4,
            "initialPrice": 3600,
            "standardFee": 280,
            "racingFees": [1400, 4000, 11000, 15000, 19000],
            "racingCost": 2000
        }
    },
    {
        "id": "18",
        "type": TYPE_FINANCE,
        "text": {
            "name": "Financie",
            "description": ""
        }
    },
    {
        "id": "19",
        "type": TYPE_HORSE,
        "text": {
            "name": "Lukava",
            "description": ""
        },
        "horse": {
            "group": 4,
            "initialPrice": 3600,
            "standardFee": 280,
            "racingFees": [1400, 4000, 11000, 15000, 19000],
            "racingCost": 2000
        }
    },
    {
        "id": "20",
        "type": TYPE_HORSE,
        "text": {
            "name": "Melák",
            "description": ""
        },
        "horse": {
            "group": 4,
            "initialPrice": 4000,
            "standardFee": 320,
            "racingFees": [1600, 4400, 12000, 16000, 20000],
            "racingCost": 2000
        }
    },
    {
        "id": "21",
        "type": TYPE_PARKING,
        "text": {
            "name": "Parkovisko",
            "description": ""
        }
    },
    {
        "id": "22",
        "type": TYPE_HORSE,
        "text": {
            "name": "Grifel",
            "description": ""
        },
        "horse": {
            "group": 5,
            "initialPrice": 4400,
            "standardFee": 280,
            "racingFees": [1800, 5000, 14000, 17000, 21000],
            "racingCost": 3000
        }
    },
    {
        "id": "23",
        "type": TYPE_FORTUNE,
        "text": {
            "name": "Náhoda",
            "description": ""
        }
    },
    {
        "id": "24",
        "type": TYPE_HORSE,
        "text": {
            "name": "Mohyla",
            "description": ""
        },
        "horse": {
            "group": 5,
            "initialPrice": 4400,
            "standardFee": 280,
            "racingFees": [1800, 5000, 14000, 17000, 21000],
            "racingCost": 3000
        }
    },
    {
        "id": "25",
        "type": TYPE_HORSE,
        "text": {
            "name": "Metál",
            "description": ""
        },
        "horse": {
            "group": 5,
            "initialPrice": 4800,
            "standardFee": 400,
            "racingFees": [2000, 6000, 15000, 18000, 22000],
            "racingCost": 3000
        }
    },
    {
        "id": "26",
        "type": TYPE_TRAINER,
        "text": {
            "name": "3. Tréner",
            "description": ""
        }
    },
    {
        "id": "27",
        "type": TYPE_HORSE,
        "text": {
            "name": "Tara",
            "description": ""
        },
        "horse": {
            "group": 6,
            "initialPrice": 5200,
            "standardFee": 440,
            "racingFees": [2200, 6600, 16000, 19500, 23000],
            "racingCost": 3000
        }
    },
    {
        "id": "28",
        "type": TYPE_HORSE,
        "text": {
            "name": "Furioso",
            "description": ""
        },
        "horse": {
            "group": 6,
            "initialPrice": 5200,
            "standardFee": 440,
            "racingFees": [2200, 6600, 16000, 19500, 23000],
            "racingCost": 3000
        }
    },
    {
        "id": "29",
        "type": TYPE_STABLES,
        "text": {
            "name": "Stáje",
            "description": ""
        }
    },
    {
        "id": "30",
        "type": TYPE_HORSE,
        "text": {
            "name": "Genius",
            "description": ""
        },
        "horse": {
            "group": 6,
            "initialPrice": 5600,
            "standardFee": 480,
            "racingFees": [2400, 7200, 17000, 20500, 24000],
            "racingCost": 3000
        }
    },
    {
        "id": "31",
        "type": TYPE_DOPING,
        "text": {
            "name": "Doping",
            "description": ""
        }
    },
    {
        "id": "32",
        "type": TYPE_HORSE,
        "text": {
            "name": "Shagga",
            "description": ""
        },
        "horse": {
            "group": 7,
            "initialPrice": 6000,
            "standardFee": 500,
            "racingFees": [2600, 7800, 18000, 22000, 25500],
            "racingCost": 4000
        }
    },
    {
        "id": "33",
        "type": TYPE_HORSE,
        "text": {
            "name": "Dahoman",
            "description": ""
        },
        "horse": {
            "group": 7,
            "initialPrice": 6000,
            "standardFee": 500,
            "racingFees": [2600, 7800, 18000, 22000, 25500],
            "racingCost": 4000
        }
    },
    {
        "id": "34",
        "type": TYPE_FINANCE,
        "text": {
            "name": "Financie",
            "description": ""
        }
    },
    {
        "id": "35",
        "type": TYPE_HORSE,
        "text": {
            "name": "Gira",
            "description": ""
        },
        "horse": {
            "group": 7,
            "initialPrice": 6400,
            "standardFee": 540,
            "racingFees": [3000, 9000, 20000, 24000, 28000],
            "racingCost": 4000
        }
    },
    {
        "id": "36",
        "type": TYPE_TRAINER,
        "text": {
            "name": "4. Tréner",
            "description": ""
        }
    },
    {
        "id": "37",
        "type": TYPE_FORTUNE,
        "text": {
            "name": "Náhoda",
            "description": ""
        }
    },
    {
        "id": "38",
        "type": TYPE_HORSE,
        "text": {
            "name": "Narcius",
            "description": ""
        },
        "horse": {
            "group": 8,
            "initialPrice": 7000,
            "standardFee": 700,
            "racingFees": [3500, 10000, 22000, 26000, 30000],
            "racingCost": 4000
        }
    },
    {
        "id": "39",
        "type": TYPE_VET,
        "text": {
            "name": "Veterinár",
            "description": ""
        },
        "fee": 1000
    },
    {
        "id": "40",
        "type": TYPE_HORSE,
        "text": {
            "name": "Napoli",
            "description": ""
        },
        "horse": {
            "group": 8,
            "initialPrice": 8000,
            "standardFee": 1000,
            "racingFees": [4000, 12000, 28000, 34000, 40000],
            "racingCost": 4000
        }
    }
]
