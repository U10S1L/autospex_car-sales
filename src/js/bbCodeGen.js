const ranks = {
  low: "[color=#FF0000][b]low[/b][/color]",
  fair: "[color=#FFFF00][b]fair[/b][/color]",
  excellent: "[color=#00FF00][b]excellent[/b][/color]"
};

export const generateBBCode = appState => {
  const {
    carName,
    carColor,
    carMiles,
    carDSPrice,
    carAutoSpexPrice,
    carLeftImg,
    carRightImg,
    condition,
    security,
    insurance,
    oocLock,
    oocAlarm,
    oocImmob,
    oocInsurance,
    oocEngine,
    oocBattery,
    sellerName,
    sellerNumber
  } = appState;

  let bbCode = `
[code][hr][/hr]










[center][size=170][b]${carName}[/b][/size][/center]


[center][size=115]${carColor} ${carName} in ${
    ranks[condition]
  } condition with ${ranks[security]} security and ${
    ranks[insurance]
  } insurance! Sitting at ${carMiles} miles!

Our Price: $${carAutoSpexPrice}
Brand New: $[url=https://forum.ls-rp.io/viewtopic.php?f=63&t=687989]${carDSPrice}[/url][/size][/center]
[center][img]${carLeftImg}[/img][img]${carRightImg}[/img]
(( ${oocLock}/${oocAlarm}/${oocImmob}/${oocInsurance} - ${oocEngine}/${oocBattery}))
Contact ${sellerName} - ${sellerNumber}[/center] 


[hr][/hr]
`;
  return bbCode;
};
