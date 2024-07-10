type Event = {
  methods: { method: string; args: any[] }[];
  message: string;
};

export const MessageHandler: { [key: string]: Event } = {
  "電気けして": {
    methods: [
      { method: "StandLightActive", args: [false] },
      { method: "LivingRoomLightActive", args: [false] },
    ],
    message: "けしたよ",
  },
  "リラックスモード": {
    methods: [
      { method: "StandLightActive", args: [true] },
      { method: "LivingRoomLightActive", args: [false] },
    ],
    message: "リラックスしてね",
  },
  "スタンドけして": {
    methods: [
      { method: "StandLightActive", args: [false] },
    ],
    message: "けしたよ",
  },
  "リビングけして": {
    methods: [
      { method: "LivingRoomLightActive", args: [false] },
    ],
    message: "けしたよ",
  },
  "リビングつけて": {
    methods: [
      { method: "LivingRoomLightActive", args: [true] },
    ],
    message: "つけたよ",
  },
  "ドライつけて": {
    methods: [
      {
        method: "AirConditionerActive",
        args: [{ active: true, temperature: 25, mode: "dry", speed: "medium" }],
      },
    ],
    message: "つけたよ",
  },
  "冷房つけて": {
    methods: [
      {
        method: "AirConditionerActive",
        args: [{ active: true, temperature: 25, mode: "cool", speed: "auto" }],
      },
    ],
    message: "つけたよ",
  },
  "エアコンけして": {
    methods: [
      {
        method: "AirConditionerActive",
        args: [{ active: false, temperature: 25, mode: "cool", speed: "auto" }],
      },
    ],
    message: "消したよ",
  },
};
