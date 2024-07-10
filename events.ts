type Event = {
  methods: { method: string; args: any[] }[];
  message: string;
};

export const MessageHandler: { [key: string]: Event } = {
  "電気消して": {
    methods: [
      { method: "StandLightActive", args: [false] },
      { method: "LivingRoomLightActive", args: [false] },
    ],
    message: "消したよ",
  },
  "電気つけて": {
    methods: [
      { method: "StandLightActive", args: [true] },
      { method: "LivingRoomLightActive", args: [true] },
    ],
    message: "つけたよ",
  },
  "スタンド消して": {
    methods: [
      { method: "StandLightActive", args: [false] },
    ],
    message: "消したよ",
  },
  "スタンドつけて": {
    methods: [
      { method: "StandLightActive", args: [true] },
    ],
    message: "つけたよ",
  },
  "リビング消して": {
    methods: [
      { method: "LivingRoomLightActive", args: [false] },
    ],
    message: "消したよ",
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
  "冷房消して": {
    methods: [{
      method: "AirConditionerActive",
      args: [{ active: false, temperature: 25, mode: "cool", speed: "auto" }],
    }],
    message: "消したよ",
  },
  "エアコン消して": {
    methods: [
      {
        method: "AirConditionerActive",
        args: [{ active: false, temperature: 25, mode: "cool", speed: "auto" }],
      },
    ],
    message: "消したよ",
  },
};
